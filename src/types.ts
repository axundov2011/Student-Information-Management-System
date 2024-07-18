// types.ts (örnek dosya adı)
export interface Lesson {
  id: number;
  name: string;
  lessonName: string;
  teacherName: string;
  teacherNo: number;
  class: string;
}

export interface Student {
  id: number;
  name: string;
  surname: string;
  studentNo: number;
  class: string;
}

export interface Score {
  id: number;
  studentId: number;
  teacherId: number;
  lessonId: number;
  dateTime: string;
  score: number;
}

export interface ScoreFormInput {
  studentId: number;
  teacherId: number;
  lessonId: number;
  class: string;
  dateTime: string;
  score: number;
}

export interface LessonFormInput {
  lessonName: string;
  teacherName: string;
  teacherNo: number;
  class: string;
}

export interface StudentFormInput {
  name: string;
  surname: string;
  studentNo: number;
  class: string;
}
