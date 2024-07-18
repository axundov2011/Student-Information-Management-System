// components/LessonsTable.tsx

import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "../../redux/store";
import {
  Box,
  Button,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
} from "@mui/material";
import { Lesson } from "../../types";
import { setLessons } from "../../redux/slices/lessonsSlice";

const LessonsTable: React.FC = () => {
  const lessons = useSelector<RootState, Lesson[]>((state) => state.lessons);
  const dispatch = useDispatch();

  useEffect(() => {
    const persistedState = localStorage.getItem("reduxState");
    if (persistedState) {
      const stateFromStorage: Partial<RootState> = JSON.parse(persistedState);
      if (stateFromStorage.lessons) {
        dispatch(setLessons(stateFromStorage.lessons));
      }
    }
  }, [dispatch]);

  const handleClearData = () => {
    dispatch(setLessons([]));
    localStorage.removeItem('reduxState');
  };
  return (
    <Box position="relative">
    <Button
       onClick={handleClearData}
       variant="contained"
       color="primary"
       style={{ position: 'absolute', top: 0, right: 0, margin: '10px' }}
     >
       Məlumatları Sil
     </Button>
     <Table>
      <TableHead>
        <TableRow>
          <TableCell>Dərsin Adı</TableCell>
          <TableCell>Müəllimənin Adı</TableCell>
          <TableCell>Müəllimənin Nömrəsi</TableCell>
          <TableCell>Sinif</TableCell>
        </TableRow>
      </TableHead>
      <TableBody>
        {lessons.map((lesson) => (
          <TableRow key={lesson.id}>
            <TableCell>{lesson.name}</TableCell>
            <TableCell>{lesson.teacherName}</TableCell>
            <TableCell>{lesson.teacherNo}</TableCell>
            <TableCell>{lesson.class}</TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
   </Box>
  );
};

export default LessonsTable;
