import React from 'react';
import { useDispatch } from 'react-redux';
import { useForm, SubmitHandler } from 'react-hook-form';
import { addLesson } from '../../redux/slices/lessonsSlice';
import { Button, TextField } from '@mui/material';
import { Lesson, LessonFormInput } from '../../types';

const LessonsForm: React.FC = () => {
  const dispatch = useDispatch();
  const { register, handleSubmit, reset } = useForm<LessonFormInput>();

  const onSubmit: SubmitHandler<LessonFormInput> = (data) => {
    const newLesson: Lesson = {
      id: Date.now(), 
      name: data.lessonName,
      lessonName: data.lessonName,
      teacherName: data.teacherName,
      teacherNo: data.teacherNo !== undefined ? data.teacherNo : 0,
      class: data.class,
    };

    dispatch(addLesson(newLesson));
    reset();
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <TextField label="Dərsin Adı" {...register('lessonName', { required: true })} />
      <TextField label="Müəllimənin Adı" {...register('teacherName', { required: true })} />
      <TextField label="Müəllimənin Nömrəsi" type="number" {...register('teacherNo', { required: true })} />
      <TextField label="Sinif" {...register('class', { required: true })} />
      <Button type="submit">Əlavə et</Button>
    </form>
  );
};

export default LessonsForm;
