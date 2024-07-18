import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
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
import { setScores } from "../../redux/slices/scoresSlice";

const ScoresTable: React.FC = () => {
  const scores = useSelector((state: RootState) => state.scores);
  const students = useSelector((state: RootState) => state.students);
  const lessons = useSelector((state: RootState) => state.lessons);
  const dispatch = useDispatch();

  useEffect(() => {
    const persistedState = localStorage.getItem("reduxState");
    if (persistedState) {
      const stateFromStorage: Partial<RootState> = JSON.parse(persistedState);
      if (stateFromStorage.scores) {
        dispatch(setScores(stateFromStorage.scores));
      }
    }
  }, [dispatch]);

  const getStudentName = (id: number) => {
    const student = students.find((student) => student.id === id);
    return student ? `${student.name} ${student.surname}` : "N/A";
  };

  const getLessonName = (id: number) => {
    const lesson = lessons.find((lesson) => lesson.id === id);
    return lesson ? lesson.name : "N/A";
  };

  const getTeacherName = (teacherNo: number) => {
    const lesson = lessons.find((lesson) => lesson.teacherNo === teacherNo);
    return lesson ? lesson.teacherName : "N/A";
  };

  const getClassName = (studentId: number, lessonId: number) => {
    const student = students.find((student) => student.id === studentId);
    const lesson = lessons.find((lesson) => lesson.id === lessonId);
    return student ? student.class : lesson ? lesson.class : "N/A";
  };

  const handleClearData = () => {
    dispatch(setScores([]));
    localStorage.removeItem("reduxState");
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
            <TableCell>Tələbə</TableCell>
            <TableCell>Müəllimə</TableCell>
            <TableCell>Dərs</TableCell>
            <TableCell>Sinif</TableCell>
            <TableCell>Tarix-Saat</TableCell>
            <TableCell>Nəticə</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {scores.map((score) => (
            <TableRow key={score.id}>
              <TableCell>{getStudentName(score.studentId)}</TableCell>
              <TableCell>{getTeacherName(score.teacherId)}</TableCell>
              <TableCell>{getLessonName(score.lessonId)}</TableCell>
              <TableCell>{getClassName(score.studentId, score.lessonId)}</TableCell>
              <TableCell>{score.dateTime}</TableCell>
              <TableCell>{score.score}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </Box>
  );
};

export default ScoresTable;
