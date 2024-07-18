import React from 'react';
import { useDispatch } from 'react-redux';
import { useForm, SubmitHandler } from 'react-hook-form';
import { addStudent } from '../../redux/slices/studentsSlice';
import { TextField, Button } from '@mui/material';
import { StudentFormInput } from '../../types';



const StudentsForm: React.FC = () => {
  const dispatch = useDispatch();
  const { register, handleSubmit, reset } = useForm<StudentFormInput>();

  const onSubmit: SubmitHandler<StudentFormInput> = (data) => {
    console.log(data);
    dispatch(addStudent(data as any));
    reset();
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <TextField label="Tələbənin  Adı" {...register('name')} />
      <TextField label="Tələbənin Soyadı" {...register('surname')} />
      <TextField label="Tələbənin Nömrəsi" type="number" {...register('studentNo')} />
      <TextField label="Sinif" {...register('class')} />
      <Button type="submit">Əlavə et</Button>
    </form>
  );
};

export default StudentsForm;
