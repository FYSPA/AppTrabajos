// hooks/useClassroomGrades.ts
import { useEffect, useState } from "react";
import {
    GoogleCourse,
    GoogleCourseWork,
    GoogleSubmission,
    GradeData,
} from "../types/classroom";

interface UseGradesResult {
  grades: GradeData[];
  loading: boolean;
  error: string | null;
  refresh: () => void;
}

export const useClassroomGrades = (token: string | null): UseGradesResult => {
  const [grades, setGrades] = useState<GradeData[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const fetchData = async () => {
    if (!token) return;

    setLoading(true);
    setError(null);

    try {
      // 1. Obtener Cursos
      const coursesRes = await fetch(
        "https://classroom.googleapis.com/v1/courses",
        {
          headers: { Authorization: `Bearer ${token}` },
        },
      );
      const coursesJson = await coursesRes.json();

      const courses: GoogleCourse[] = coursesJson.courses || [];

      if (courses.length === 0) {
        setGrades([]);
        setLoading(false);
        return;
      }

      // ⚠️ NOTA: Aquí tomo solo el PRIMER curso para el ejemplo.
      // Si quieres todos, tendrías que hacer un bucle externo.
      const firstCourse = courses[0];

      // 2. Obtener Trabajos del curso
      const cwRes = await fetch(
        `https://classroom.googleapis.com/v1/courses/${firstCourse.id}/courseWork`,
        {
          headers: { Authorization: `Bearer ${token}` },
        },
      );
      const cwJson = await cwRes.json();
      const works: GoogleCourseWork[] = cwJson.courseWork || [];

      // 3. Obtener Mis Entregas (Submissions)
      const promises = works.map(async (work) => {
        const subRes = await fetch(
          `https://classroom.googleapis.com/v1/courses/${firstCourse.id}/courseWork/${work.id}/studentSubmissions`,
          {
            headers: { Authorization: `Bearer ${token}` },
          },
        );
        const subJson = await subRes.json();

        // Buscamos la primera entrega (normalmente solo hay una por alumno)
        const mySubmission: GoogleSubmission | undefined =
          subJson.studentSubmissions?.[0];

        // Lógica para determinar el texto de la nota
        let gradeText = "Sin entregar";
        if (mySubmission) {
          if (mySubmission.assignedGrade) {
            gradeText = String(mySubmission.assignedGrade);
          } else if (mySubmission.draftGrade) {
            gradeText = `Borrador: ${mySubmission.draftGrade}`;
          } else {
            gradeText = "Entregado (Sin calificar)";
          }
        }

        return {
          id: work.id,
          title: work.title,
          grade: gradeText,
          courseName: firstCourse.name,
        } as GradeData;
      });

      const results = await Promise.all(promises);
      setGrades(results);
    } catch (err) {
      console.error(err);
      setError("Error obteniendo datos de Classroom");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (token) {
      fetchData();
    }
  }, [token]);

  return { grades, loading, error, refresh: fetchData };
};
