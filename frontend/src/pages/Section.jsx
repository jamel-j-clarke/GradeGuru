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
import { Outlet } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import Nav from '../components/Nav';
import '../css/common.css';
import '../css/Sections.css';
import semesterAPI from '../api_clients/APISemesterClient';
import courseAPI from '../api_clients/APICourseClient';
import SectionInstructors from '../components/sections/SectionInstructors';
import SectionTeachingAssistants from '../components/sections/SectionTeachingAssistants';
import SectionStudents from '../components/sections/SectionStudents';
import SectionRubrics from '../components/sections/SectionRubrics';
import SectionAssignments from '../components/sections/SectionAssignments';
import SectionArchive from '../components/sections/SectionArchive';
import SectionGrading from '../components/sections/SectionGrading';

export default function Sections({ customTheme }) {
  const [semester, setSemester] = useState({
    id: undefined,
    season: undefined,
    year: undefined,
    active: undefined,
  });
  const [loading, setLoading] = useState(false);
  const [currentCourse, setCurrentCourse] = useState({
    id: undefined,
    subject: undefined,
    courseNumber: undefined,
    title: undefined,
    credits: undefined,
  });
  const [currentSection, setCurrentSection] = useState({
    id: undefined,
    number: undefined,
  });
  const [currentSectionId, setCurrentSectionId] = useState({
    id: undefined,
  });
  const path = window.location.pathname.split('/');
  const semester_year = path[1];
  const semester_season = path[2];
  const currentCoursePrefix = path[3];
  const currentCourseNumber = path[4];
  const sectionNumber = path[5];

  useEffect(() => {
    semesterAPI
      .getSemesterByName(semester_season, semester_year)
      .then((urlSemester) => {
        setSemester(urlSemester);
      });
  }, []);

  useEffect(() => {
    courseAPI
      .getCourseByName(currentCoursePrefix, currentCourseNumber)
      .then((fetchedCourse) => {
        setCurrentCourse({
          ...currentCourse,
          id: fetchedCourse.id,
          subject: fetchedCourse.subject,
          courseNumber: fetchedCourse.courseNumber,
          title: fetchedCourse.title,
          credits: fetchedCourse.credits,
        });
      });
  }, []);

  useEffect(() => {
    async function fetchData() {
      console.log(`2: current course: ${JSON.stringify(currentCourse)}`);
      courseAPI
        .getCourseSectionByNumber(currentCourse.id, sectionNumber)
        .then((fetchedSection) => {
          console.log(`2: fetched section: ${JSON.stringify(fetchedSection)}`);
          setCurrentSection({
            ...currentSection,
            id: fetchedSection.id,
            number: fetchedSection.number,
          });
        });
    }
    fetchData();
  }, [currentCourse]);

  useEffect(() => {
    async function fetchData() {
      console.log(`3: current section ${JSON.stringify(currentSection)}`);
      // setCounter((prev) => prev + 1);
      setCurrentSectionId({
        id: currentSection.id,
      });
    }
    fetchData();
  }, [currentSection]);

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

  const handleTabChange = (event, newValue) => {
    setValue(newValue);
  };

  const [value, setValue] = useState(0);

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
              <Link
                underline='hover'
                color='inherit'
                href={`/${semester.year}/${semester.season}/${currentCourse.subject}/${currentCourse.courseNumber}`}>
                {currentCourse.subject} {currentCourse.courseNumber}
              </Link>
              <Typography
                variant='h6'
                component='div'
                sx={{ flexGrow: 1, color: 'white' }}>
                {currentSection ? `${currentSection.number}` : 'Loading'}
              </Typography>
            </Breadcrumbs>
            <Button variant='h6' disabled>
              {semester ? `${semester.season} ${semester.year}` : 'Loading'}
            </Button>
          </Toolbar>
          <Tabs
            value={value}
            onChange={handleTabChange}
            variant='scrollable'
            scrollButtons='auto'
            aria-label='course tabs'>
            <Tab label='Instructors' {...a11yProps(0)} />
            <Tab label='Teaching Assistants' {...a11yProps(1)} />
            <Tab label='Students' {...a11yProps(2)} />
            <Tab label='Rubrics' {...a11yProps(3)} />
            <Tab label='Assignments' {...a11yProps(4)} />
            <Tab label='Archive' {...a11yProps(5)} />
            <Tab label='Grading' {...a11yProps(6)} />
          </Tabs>
          <CustomTabPanel value={value} index={0}>
            <SectionInstructors sectionId={currentSectionId} />
          </CustomTabPanel>
          <CustomTabPanel value={value} index={1}>
            <SectionTeachingAssistants sectionId={currentSectionId} />
          </CustomTabPanel>
          <CustomTabPanel value={value} index={2}>
            <SectionStudents sectionId={currentSectionId} />
          </CustomTabPanel>
          <CustomTabPanel value={value} index={3}>
            <SectionRubrics sectionId={currentSectionId} />
          </CustomTabPanel>
          <CustomTabPanel value={value} index={4}>
            <SectionAssignments sectionId={currentSectionId} />
          </CustomTabPanel>
          <CustomTabPanel value={value} index={5}>
            <SectionArchive sectionId={currentSectionId} />
          </CustomTabPanel>
          <CustomTabPanel value={value} index={6}>
            <SectionGrading sectionId={currentSectionId} />
          </CustomTabPanel>
        </Box>
      </Box>
    </ThemeProvider>
  );
}
