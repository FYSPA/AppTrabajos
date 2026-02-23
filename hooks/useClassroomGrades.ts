// hooks/useClassroomGrades.ts
import { useEffect, useState } from "react";
import { useAuth } from "../context/AuthContext";

export interface GradeItem {
  courseWorkId: string;
  title: string;
  assignedGrade?: number;
  state: string; // "TURNED_IN", "RETURNED", etc.
}

export const useClassroomGrades = (courseId: string) => {
  const { token } = useAuth();
  const [grades, setGrades] = useState<GradeItem[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchGrades = async () => {
    if (!token || !courseId) return;

    setLoading(true);
    setError(null);
    try {
      const isPlaceholder = courseId === "ODQyOTkyMzg5Mjk2" || courseId === "TU_ID_DE_CURSO_AQUI";

      if (isPlaceholder) {
        setError("Por favor, configura tu COURSE_ID real en el código.");
        setLoading(false);
        return;
      }

      // 1. Obtener TODAS las tareas de la clase
      const worksRes = await fetch(`https://classroom.googleapis.com/v1/courses/${courseId}/courseWork`, {
        headers: { Authorization: `Bearer ${token}` }
      });

      if (!worksRes.ok) {
        throw new Error("No se pudieron cargar las tareas de la clase.");
      }

      const worksData = await worksRes.json();
      const allWorks = worksData.courseWork || [];

      // 2. Filtrar solo las que contengan 'actividad' o 'practica' (insensible a mayúsculas/acentos)
      const filteredWorks = allWorks.filter((w: any) => {
        if (!w.title) return false;
        const lowerTitle = w.title.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "");
        return lowerTitle.includes("actividad") || lowerTitle.includes("practica");
      });

      if (filteredWorks.length === 0) {
        setGrades([]);
        setLoading(false);
        return;
      }

      // 3. Obtener las calificaciones de esas tareas específicas
      const allGrades: GradeItem[] = [];

      for (const work of filteredWorks) {
        const response = await fetch(
          `https://classroom.googleapis.com/v1/courses/${courseId}/courseWork/${work.id}/studentSubmissions`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
              "Content-Type": "application/json",
            },
          }
        );

        if (!response.ok) {
          console.error("Error al obtener tarea:", work.id);
          continue;
        }

        const data = await response.json();
        const submissions = data.studentSubmissions || [];

        if (submissions.length > 0) {
          const sub = submissions[0];
          allGrades.push({
            courseWorkId: sub.courseWorkId,
            title: work.title,
            assignedGrade: sub.assignedGrade,
            state: sub.state,
          });
        }
      }

      setGrades(allGrades);
    } catch (err: any) {
      setError(err.message || "Error al conectar con Google Classroom");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchGrades();
  }, [token, courseId]);

  return { grades, loading, error, refetch: fetchGrades };
};
