// types/classroom.ts

// Lo que devuelve la API de Google (simplificado)
export interface GoogleCourse {
  id: string;
  name: string;
  section?: string;
}

export interface GoogleCourseWork {
  id: string;
  title: string;
  state?: string;
}

export interface GoogleSubmission {
  userId: string;
  assignedGrade?: number | string; // A veces es número, a veces string
  draftGrade?: number | string;
  state?: string;
}

// Lo que devuelve nuestro Hook para usar en la UI
export interface GradeData {
  id: string;
  title: string;
  grade: string;
  courseName: string;
}
