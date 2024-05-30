import { Navigate, Route, Routes } from 'react-router-dom';
import { Box } from '@mui/material';
import { createTheme } from '@mui/material/styles';
import Overview from './Overview.jsx';
import Rubric from './Rubric.jsx';
import SemesterList from './SemesterList.jsx';
import CourseList from './CourseList.jsx';
import Section from './Section.jsx';
import Course from './Course.jsx';
import EditRubric from './EditRubric.jsx';
import Users from './Users.jsx';
import Grading from './Grading.jsx';
import UseRubric from './UseRubric.jsx';

import CourseAssignments from '../components/courses/CourseAssignments.jsx';
import CourseRubrics from '../components/courses/CourseRubrics.jsx';
import CourseSections from '../components/courses/CourseSections.jsx';
import CourseArchive from '../components/courses/CourseArchive.jsx';

import SectionArchive from '../components/sections/SectionArchive.jsx';
import SectionAssignments from '../components/sections/SectionAssignments.jsx';
import SectionGrading from '../components/sections/SectionGrading.jsx';
import SectionInstructors from '../components/sections/SectionInstructors.jsx';
import SectionRubrics from '../components/sections/SectionRubrics.jsx';
import SectionStudents from '../components/sections/SectionStudents.jsx';
import SectionTeachingAssistants from '../components/sections/SectionTeachingAssistants.jsx';

import CourseCoordinators from '../components/users/CourseCoordinators.jsx';
import SystemAdministrators from '../components/users/SystemAdministrators.jsx';
import '../css/App.css';

export default function App() {
  const customTheme = createTheme({
    palette: {
      mode: 'light',
      primary: {
        main: '#990000',
        contrastText: '#f2f2f2',
      },
      secondary: {
        main: '#757575',
        constrastText: '#1f1f1f',
      },
      tertiary: {
        main: '#1f1f1f',
        contrastText: '#f2f2f2',
      },
      background: {
        default: '#f2f2f2',
        paper: '#cccccc',
      },
    },
  });

  return (
    <Routes>
      <Route index element={<Navigate to='/courses' />} />
      <Route
        path='/overview'
        element={<Overview customTheme={customTheme} />}
      />
      <Route path='/rubrics' element={<Rubric customTheme={customTheme} />} />
      {/* <Route path='/courses'>
        <Route index element={<CourseList customTheme={customTheme} />} />
        <Route
          path={'/courses/:course-prefix'}
          element={<Navigate to='/courses' />}
        />
        <Route path={'/courses/:course-prefix/:course-number'}>
          <Route index element={<Course customTheme={customTheme} />} />
          <Route path={'/courses/:course-prefix/:course-number/rubrics'}>
            <Route
              index
              element={<CourseRubrics customTheme={customTheme} />}
            />
            <Route
              path={':rubric-name'}
              element={<EditRubric customTheme={customTheme} />}
            />
          </Route>
          <Route
            path={'/courses/:course-prefix/:course-number/:section-number'}>
            <Route index element={<Section customTheme={customTheme} />} />
            <Route
              path={'rubrics/:rubric-name'}
              element={<EditRubric customTheme={customTheme} />}
            />
          </Route>
        </Route>
      </Route> */}
      <Route
        path='/semesters'
        element={<SemesterList customTheme={customTheme} />}
      />
      <Route index element={<SemesterList customTheme={customTheme} />} />
      <Route path='/:semesterYear' element={<Navigate to='/semesters' />} />
      <Route path='/:semesterYear/:semesterSeason'>
        <Route index element={<CourseList customTheme={customTheme} />} />
        <Route
          path={'/:semesterYear/:semesterSeason/:coursePrefix'}
          element={<Navigate to='/:semesterYear/:semesterSeason' />}
        />
        <Route
          path={'/:semesterYear/:semesterSeason/:coursePrefix/:courseNumber'}>
          <Route index element={<Course customTheme={customTheme} />} />
          <Route
            path={':rubricName'}
            element={<EditRubric customTheme={customTheme} />}
          />
        </Route>
        <Route
          path={
            '/:semesterYear/:semesterSeason/:coursePrefix/:courseNumber/:sectionNumber'
          }>
          <Route index element={<Section customTheme={customTheme} />} />
          <Route
            path={':rubricName'}
            element={<EditRubric customTheme={customTheme} />}
          />
          <Route path={'grading'}>
            <Route index element={<Grading customTheme={customTheme} />} />
            <Route
              path={':gradee'}
              element={<UseRubric customTheme={customTheme} />}
            />
          </Route>
        </Route>
      </Route>
      <Route path='/users' element={<Users customTheme={customTheme} />} />
    </Routes>
  );
}
