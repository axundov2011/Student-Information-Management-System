// App.tsx
import React, { useEffect } from 'react';
import './App.css';
import { Provider } from 'react-redux';
import store, { RootState } from './redux/store';
import { Container, Tabs, Tab, Box } from '@mui/material';
import StudentsForm from './pages/form/StudentsForm';
import StudentsTable from './pages/table/StudentsTable';
import LessonsForm from './pages/form/LessonsForm';
import ScoresForm from './pages/form/ScoresForm';
import ScoresTable from './pages/table/ScoresTable';
import LessonsTable from './pages/table/LessonsTable';
import { setLessons } from './redux/slices/lessonsSlice';
import { setScores } from './redux/slices/scoresSlice';
import { setStudents } from './redux/slices/studentsSlice';

function TabPanel(props: any) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box p={3}>
          {children}
        </Box>
      )}
    </div>
  );
}

function a11yProps(index: any) {
  return {
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`,
  };
}

const App: React.FC = () => {
  const [value, setValue] = React.useState(0);

  const handleChange = (event: React.ChangeEvent<{}>, newValue: number) => {
    setValue(newValue);
  };

  useEffect(() => {
    const persistedState = localStorage.getItem('reduxState');
    if (persistedState) {
      const stateFromStorage: Partial<RootState> = JSON.parse(persistedState);
      if (stateFromStorage.students) {
        store.dispatch(setStudents(stateFromStorage.students));
      }
      if (stateFromStorage.lessons) {
        store.dispatch(setLessons(stateFromStorage.lessons));
      }
      if (stateFromStorage.scores) {
        store.dispatch(setScores(stateFromStorage.scores));
      }
    }
  }, []);

  return (
    <Provider store={store}>
      <Container>
        <h1>Tələbə Məlumatlarını İdarəetmə Sistemi</h1>
        <Tabs value={value} onChange={handleChange} aria-label="simple tabs example">
          <Tab label="Öğrenciler" {...a11yProps(0)} />
          <Tab label="Dersler" {...a11yProps(1)} />
          <Tab label="Notlar" {...a11yProps(2)} />
        </Tabs>
        <TabPanel value={value} index={0}>
          <StudentsForm />
          <StudentsTable />
        </TabPanel>
        <TabPanel value={value} index={1}>
          <LessonsForm />
          <LessonsTable />
        </TabPanel>
        <TabPanel value={value} index={2}>
          <ScoresForm />
          <ScoresTable />
        </TabPanel>
      </Container>
    </Provider>
  );
}

export default App;
