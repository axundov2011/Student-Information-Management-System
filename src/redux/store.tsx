// redux/store.ts

import { configureStore } from "@reduxjs/toolkit";
import studentsReducer from "./slices/studentsSlice";
import lessonsReducer from "./slices/lessonsSlice";
import scoresReducer from "./slices/scoresSlice";
import { Student } from "../types"; 
import { Lesson } from "../types"; 
import { Score } from "../types"; 

export interface RootState {
  students: Student[];
  lessons: Lesson[];
  scores: Score[];
}

const persistedState = localStorage.getItem("reduxState")
  ? JSON.parse(localStorage.getItem("reduxState")!)
  : {};

export const store = configureStore({
  reducer: {
    students: studentsReducer,
    lessons: lessonsReducer,
    scores: scoresReducer,
  },
  preloadedState: persistedState as RootState,
});

store.subscribe(() => {
  localStorage.setItem("reduxState", JSON.stringify(store.getState()));
});

export default store;
