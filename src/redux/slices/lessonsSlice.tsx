import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Lesson } from "../../types";

const initialState: Lesson[] = [];

const lessonSlice = createSlice({
  name: 'lessons',
  initialState,
  reducers: {
    setLessons: (state, action: PayloadAction<Lesson[]>) => {
      return action.payload;
    },
    addLesson: (state, action: PayloadAction<Lesson>) => {
      state.push(action.payload);
    },
  },
});

export const {setLessons, addLesson}  = lessonSlice.actions;
export default lessonSlice.reducer;