import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Student } from '../../types';



const initialState: Student[] = [];

const studentsSlice = createSlice({
  name: 'students',
  initialState,
  reducers: {
    setStudents: (state, action: PayloadAction<Student[]>) => {
      return action.payload; // Öğrenci listesini güncelle
    },
    addStudent: (state, action: PayloadAction<Student>) => {
      state.push(action.payload);
    },
  },
});

export const { setStudents,addStudent } = studentsSlice.actions;
export default studentsSlice.reducer;
