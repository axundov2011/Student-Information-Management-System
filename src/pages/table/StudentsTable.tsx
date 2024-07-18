// components/StudentsTable.tsx

import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../../redux/store';
import { Table, TableBody, TableCell, TableHead, TableRow, Button, Box } from '@mui/material';
import { Student } from '../../types';
import { setStudents } from '../../redux/slices/studentsSlice';

const StudentsTable: React.FC = () => {
  const students = useSelector<RootState, Student[]>((state) => state.students);
  const dispatch = useDispatch();

  useEffect(() => {
    const persistedState = localStorage.getItem('reduxState');
    if (persistedState) {
      const stateFromStorage: Partial<RootState> = JSON.parse(persistedState);
      if (stateFromStorage.students) {
        dispatch(setStudents(stateFromStorage.students));
      }
      // Dispatch other state updates if needed
    }
  }, [dispatch]);

  const handleClearData = () => {
    dispatch(setStudents([]));
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
            <TableCell>Tələbənin Adı</TableCell>
            <TableCell>Tələbənin Soyadı</TableCell>
            <TableCell>Tələbə Nömrəsi</TableCell>
            <TableCell>Sinif</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {students.map((student) => (
            <TableRow key={student.id}>
              <TableCell>{student.name}</TableCell>
              <TableCell>{student.surname}</TableCell>
              <TableCell>{student.studentNo}</TableCell>
              <TableCell>{student.class}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </Box>
  );
};

export default StudentsTable;
