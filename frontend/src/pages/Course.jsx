import { Box, Typography } from '@mui/material';
import Toolbar from '@mui/material/Toolbar';
import Breadcrumbs from '@mui/material/Breadcrumbs';
import Button from '@mui/material/Button';
import Link from '@mui/material/Link';
import Chip from '@mui/material/Chip';
import Stack from '@mui/material/Stack';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import TextField from '@mui/material/TextField';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import FormControl from '@mui/material/FormControl';
import { ThemeProvider } from '@mui/material/styles';
import PropTypes from 'prop-types';
import { useEffect, useState } from 'react';
import { Outlet, useParams, useSearchParams } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import Nav from '../components/Nav';

import '../css/common.css';
import semesterAPI from '../api_clients/APISemesterClient';
import courseAPI from '../api_clients/APICourseClient';
import CourseSections from '../components/courses/CourseSections';
import CourseRubrics from '../components/courses/CourseRubrics';
import CourseAssignments from '../components/courses/CourseAssignments';
import CourseArchive from '../components/courses/CourseArchive';
import useFetch from 'react-fetch-hook';

export default function Course({ customTheme }) {
  const [currentToolbarSemester, setCurrentToolbarSemester] = useState([]);
  const [semester, setSemester] = useState({
    id: undefined,
    season: undefined,
    year: undefined,
    active: undefined,
  });
  const [loading, setLoading] = useState(false);
  const [value, setValue] = useState(0);
  const [currentCourse, setCurrentCourse] = useState({
    id: undefined,
    subject: undefined,
    courseNumber: undefined,
    title: undefined,
    credits: undefined,
  });
  const path = window.location.pathname.split('/');
  const semester_year = path[1];
  const semester_season = path[2];
  const currentCoursePrefix = path[3];
  const currentCourseNumber = path[4];
  const sectionId = 0;

  useEffect(() => {
    setLoading(true);
    semesterAPI
      .getActiveSemester()
      .then((activeSemester) => setCurrentToolbarSemester(activeSemester))
      .catch((e) => console.error(e))
      .finally(() => {
        setLoading(false);
      });
  }, []);

  function CustomTabPanel(props) {
    const { children, value, index, ...other } = props;
    return (
      <div
        role='tabpanel'
        hidden={value !== index}
        id={`simple-tabpanel-${index}`}
        aria-labelledby={`simple-tab-${index}`}
        {...other}>
        {value === index && <Box>{children}</Box>}
      </div>
    );
  }

  CustomTabPanel.propTypes = {
    children: PropTypes.node,
    index: PropTypes.number.isRequired,
    value: PropTypes.number.isRequired,
  };

  function a11yProps(index) {
    return {
      id: `simple-tab-${index}`,
      'aria-controls': `simple-tabpanel-${index}`,
    };
  }

  useEffect(() => {
    semesterAPI
      .getSemesterByName(semester_season, semester_year)
      .then((urlSemester) => {
        setSemester(urlSemester);
      });
  }, []);

  useEffect(() => {
    async function fetchData() {
      setLoading(true);
      courseAPI
        .getCourseByName(currentCoursePrefix, currentCourseNumber)
        .then((fetchedCourse) => {
          setCurrentCourse(fetchedCourse);
        })
        .finally(() => {
          setLoading(false);
        });
    }
    fetchData();
  }, []);

  const handleTabChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <ThemeProvider theme={customTheme}>
      <Box className='holder'>
        <Nav
          userRoles={['hi', 'System Administrator']}
          userName={'myusername'}
          userEmail={'myemail@ncsu.edu'}
        />
        <Box component='main'>
          <Toolbar id='toolbar' position='static'>
            <Breadcrumbs>
              <Link
                underline='hover'
                color='inherit'
                href={`/${semester.year}/${semester.season}`}>
                Courses
              </Link>
              <Typography
                variant='h6'
                component='div'
                sx={{ flexGrow: 1, color: 'white' }}>
                {`${currentCoursePrefix} ${currentCourseNumber} - ${currentCourse.title}`}
              </Typography>
            </Breadcrumbs>
            {currentToolbarSemester.season && currentToolbarSemester.year ? (
              <Button variant='h6' disabled>
                {`${currentToolbarSemester.season} ${currentToolbarSemester.year}`}
              </Button>
            ) : (
              'No semester active'
            )}
          </Toolbar>
          <Tabs
            value={value}
            onChange={handleTabChange}
            variant='scrollable'
            scrollButtons='auto'
            aria-label='course tabs'>
            <Tab label='Sections' {...a11yProps(0)} />
            <Tab label='Rubrics' {...a11yProps(1)} />
            <Tab label='Assignments' {...a11yProps(2)} />
            <Tab label='Archive' {...a11yProps(3)} />
          </Tabs>
          <CustomTabPanel value={value} index={0}>
            <CourseSections courseId={currentCourse.id} />
          </CustomTabPanel>
          <CustomTabPanel value={value} index={1}>
            <CourseRubrics courseId={currentCourse.id} sectionId={sectionId} />
          </CustomTabPanel>
          <CustomTabPanel value={value} index={2}>
            <CourseAssignments courseId={currentCourse.id} />
          </CustomTabPanel>
          <CustomTabPanel value={value} index={3}>
            <CourseArchive courseId={currentCourse.id} />
          </CustomTabPanel>
        </Box>
      </Box>
    </ThemeProvider>
  );
}
