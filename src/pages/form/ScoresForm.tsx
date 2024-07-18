import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "../../redux/store";
import {
  TextField,
  Button,
  Box,
  Grid,
  Select,
  MenuItem,
  InputLabel,
  FormControl,
} from "@mui/material";
import { SelectChangeEvent } from "@mui/material/Select";
import { addScore } from "../../redux/slices/scoresSlice";
import { Score } from "../../types";

const ScoresForm: React.FC = () => {
  const dispatch = useDispatch();
  const students = useSelector((state: RootState) => state.students);
  const lessons = useSelector((state: RootState) => state.lessons);

  const [studentId, setStudentId] = useState<number | "">("");
  const [studentName, setStudentName] = useState<string>("");
  const [lessonId, setLessonId] = useState<number | "">("");
  const [teacherId, setTeacherId] = useState<number | null>(null);
  const [teacherName, setTeacherName] = useState<string>("");
  const [studentClass, setStudentClass] = useState<string>("");
  const [dateTime, setDateTime] = useState<string>("");
  const [score, setScore] = useState<number | "">("");

  const handleStudentChange = (e: SelectChangeEvent<string>) => {
    const selectedStudentName = e.target.value;
    setStudentName(selectedStudentName);

    const selectedStudent = students.find(
      (student) => `${student.name} ${student.surname}` === selectedStudentName
    );
    if (selectedStudent) {
      setStudentId(selectedStudent.id);
      setStudentClass(selectedStudent.class);
    }
  };

  const handleLessonChange = (e: SelectChangeEvent<number>) => {
    const selectedLessonId = e.target.value as number;
    setLessonId(selectedLessonId);

    const selectedLesson = lessons.find(
      (lesson) => lesson.id === selectedLessonId
    );
    if (selectedLesson) {
      setTeacherName(selectedLesson.teacherName);
      setTeacherId(selectedLesson.teacherNo);
    }
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (
      studentId !== "" &&
      lessonId !== "" &&
      teacherId !== null &&
      dateTime !== "" &&
      score !== ""
    ) {
      const newScore: Score = {
        id: Date.now(),
        studentId:
          typeof studentId === "string" ? parseInt(studentId) : studentId,
        lessonId: typeof lessonId === "string" ? parseInt(lessonId) : lessonId,
        teacherId: teacherId,
        dateTime: dateTime,
        score: typeof score === "string" ? parseInt(score) : score,
      };

      dispatch(addScore(newScore));

      setStudentId("");
      setStudentName("");
      setLessonId("");
      setTeacherId(null);
      setTeacherName("");
      setStudentClass("");
      setDateTime("");
      setScore("");
    } else {
      console.error("Xahiş olunur bütün xanaları doldurun!");
    }
  };

  return (
    <Box sx={{ mt: 2 }}>
      <form onSubmit={handleSubmit}>
        <Grid container spacing={2}>
          <Grid item xs={12} sm={6}>
            <FormControl fullWidth>
              <InputLabel>Tələbə</InputLabel>
              <Select
                value={studentName}
                onChange={handleStudentChange}
                required
              >
                {students.map((student) => (
                  <MenuItem
                    key={student.id}
                    value={`${student.name} ${student.surname}`}
                  >
                    {student.name} {student.surname}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Grid>
          <Grid item xs={12} sm={6}>
            <FormControl fullWidth>
              <InputLabel>Dərs</InputLabel>
              <Select value={lessonId} onChange={handleLessonChange} required>
                {lessons.map((lesson) => (
                  <MenuItem key={lesson.id} value={lesson.id}>
                    {lesson.name}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              label="Müəllimə"
              value={teacherName}
              onChange={(e) => setTeacherName(e.target.value)}
              required
              disabled
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              label="Sınıf"
              value={studentClass}
              onChange={(e) => setStudentClass(e.target.value)}
              required
              disabled
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              label="Tarix-Saat"
              type="datetime-local"
              value={dateTime}
              onChange={(e) => setDateTime(e.target.value)}
              required
              InputLabelProps={{
                shrink: true,
              }}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              label="Puan"
              type="number"
              value={score}
              onChange={(e) =>
                setScore(e.target.value === "" ? "" : Number(e.target.value))
              }
              required
            />
          </Grid>
          <Grid item xs={12}>
            <Button type="submit" variant="contained" color="primary">
              Nəticələndir
            </Button>
          </Grid>
        </Grid>
      </form>
    </Box>
  );
};

export default ScoresForm;
