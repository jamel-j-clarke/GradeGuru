import { Autocomplete, Box, Typography } from '@mui/material';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Breadcrumbs from '@mui/material/Breadcrumbs';
import Button from '@mui/material/Button';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import IconButton from '@mui/material/IconButton';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import Chip from '@mui/material/Chip';
import Stack from '@mui/material/Stack';
import Paper from '@mui/material/Paper';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import DialogContentText from '@mui/material/DialogContentText';
import TextField from '@mui/material/TextField';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import FormControl from '@mui/material/FormControl';

import { ThemeProvider } from '@mui/material/styles';
import { useEffect, useState } from 'react';
import Nav from '../components/Nav.jsx';
import semesterAPI from '../api_clients/APISemesterClient';
import courseAPI from '../api_clients/APICourseClient.js';
import '../css/common.css';
import '../css/Courses.css';
import createTrigger from 'react-use-trigger';
import useTrigger from 'react-use-trigger/useTrigger';
import useFetch from 'react-fetch-hook';

/**
 * what's left to be done:
 *  - edit semester
 *  - adding snackbar to display response messages
 */

const getCourseTrigger = createTrigger();
const getSemesterTrigger = createTrigger();

export default function Courses({ customTheme }) {
  const handleClickRow = (course) => {
    let path = window.location.pathname;
    if (path.includes(`${course.crs_sbj}/${course.crs_num}`) === false) {
      window.location += `/${course.crs_sbj}/${course.crs_num}`;
    } else {
      window.location.reload();
    }
  };

  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(false);
  const [currentToolbarSemester, setCurrentToolbarSemester] = useState({
    id: undefined,
    season: undefined,
    year: undefined,
    active: undefined,
  });
  const [semesters, setSemesters] = useState({});
  const [newCourseDialogState, setNewCourseDialogState] = useState({
    prefix: undefined,
    number: undefined,
    credits: undefined,
    name: undefined,
    semester: undefined,
  });
  const [editCourseDialogState, setEditCourseDialogState] = useState({
    crs_id: undefined,
    crs_sbj: undefined,
    crs_num: undefined,
    crs_title: undefined,
    num_credits: undefined,
    crs_sem_id: undefined,
  });
  const [courseToDelete, setCourseToDelete] = useState([
    {
      crs_id: undefined,
      crs_sbj: undefined,
      crs_num: undefined,
      crs_title: undefined,
      num_credits: undefined,
      crs_sem_id: undefined,
    },
  ]);
  const [newCourseDialogOpen, setNewCourseDialogOpen] = useState(false);
  const [editCourseDialogOpen, setEditCourseDialogOpen] = useState(false);
  const [deleteCourseDialogOpen, setDeleteCourseDialogOpen] = useState(false);
  const getCourseTriggerValue = useTrigger(getCourseTrigger);
  const getSemesterTriggerValue = useTrigger(getSemesterTrigger);

  useEffect(() => {
    async function fetchData() {
      setLoading(true);
      semesterAPI
        .getActiveSemester()
        .then((activeSemester) => {
          setCurrentToolbarSemester({
            id: activeSemester.id,
            season: activeSemester.season,
            year: activeSemester.year,
            active: activeSemester.active,
          });
          setNewCourseDialogState(
            (prev) => ((prev.semester = activeSemester), prev),
          );
          getCourseTrigger();
        })
        .finally(() => {
          setLoading(false);
        });
    }
    fetchData();
  }, []);

  useEffect(() => {
    setLoading(true);
    console.log(`current semesteR: ${JSON.stringify(currentToolbarSemester)}`);
    async function fetchData() {
      if (currentToolbarSemester.id !== undefined)
        courseAPI
          .getSemesterCourses(currentToolbarSemester.id)
          .then((fetchedCourses) => setCourses(fetchedCourses))
          .finally(() => {
            setLoading(false);
          });
    }
    fetchData();
  }, [
    getCourseTriggerValue,
    Object.values(currentToolbarSemester).every((p) => p),
  ]);

  const getSemesterUrl = '/api/semesters';
  const getSemesterFetch = useFetch(getSemesterUrl, {
    depends: [getSemesterTrigger],
  });

  useEffect(() => {
    if (getSemesterFetch.isLoading) return;
    if (getSemesterFetch.error) {
      console.error(`Error getting ${getSemesterUrl}`, getSemesterFetch.error);
    } else {
      let semesters = getSemesterFetch.data.map((semester) => ({
        ...semester,
        label: semester.season + ' ' + semester.year,
      }));
      console.log('semesters', semesters);
      setSemesters(semesters);
    }
  }, [getSemesterFetch.isLoading]);

  const handleEditCourseDialogOpen = (course) => {
    setEditCourseDialogState(course);
    setEditCourseDialogOpen(true);
  };

  const handleDeleteCourseDialogOpen = (course) => {
    setCourseToDelete(course);
    console.log(`course to delete: ${JSON.stringify(courseToDelete)}`);
    setDeleteCourseDialogOpen(true);
  };

  const handleDialogClose = () => {
    setNewCourseDialogOpen(false);
    setDeleteCourseDialogOpen(false);
    setEditCourseDialogOpen(false);
  };

  const createNewCourse = (e) => {
    let courseBody = {
      subject: newCourseDialogState.prefix,
      courseNumber: newCourseDialogState.number,
      title: newCourseDialogState.name,
      credits: newCourseDialogState.credits,
      semesterId: newCourseDialogState.semester.id,
    };
    courseAPI
      .createCourse(courseBody)
      .then((res) => {
        setNewCourseDialogOpen(false);
        getCourseTrigger();
      })
      .catch((err) => {
        console.error(err);
      });
  };

  const deleteCourse = (e) => {
    courseAPI
      .deleteCourse(courseToDelete.crs_id)
      .then((res) => {
        handleDialogClose();
      })
      .catch((err) => {
        console.error(err);
      });
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
              <Typography
                variant='h6'
                component='div'
                sx={{ flexGrow: 1, color: 'white' }}>
                Courses
              </Typography>
            </Breadcrumbs>
            {currentToolbarSemester ? (
              currentToolbarSemester.season && currentToolbarSemester.year ? (
                <Button variant='h6' disabled>
                  {`${currentToolbarSemester.season} ${currentToolbarSemester.year}`}
                </Button>
              ) : (
                'No semester active'
              )
            ) : (
              'Loading'
            )}
          </Toolbar>
          <Toolbar className='table-toolbar'>
            <Button
              variant='contained'
              onClick={() => setNewCourseDialogOpen(true)}>
              New Course
            </Button>
          </Toolbar>
          <TableContainer component={Paper}>
            <Table
              stickyHeader
              sx={{ minWidth: 650 }}
              aria-label='simple table'>
              <TableHead>
                <TableRow>
                  <TableCell align='center'>Prefix</TableCell>
                  <TableCell align='center'>Number</TableCell>
                  <TableCell align='center'>Title</TableCell>
                  {/* <TableCell align='center'>Instructors</TableCell>
                  <TableCell align='center'>Sections</TableCell> */}
                  <TableCell align='center'>Edit</TableCell>
                  <TableCell align='center'>Delete</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {courses &&
                  courses.map((course) => (
                    <TableRow
                      onClick={() => handleClickRow(course)}
                      key={`${course.crs_id}`}
                      sx={{
                        '&:last-child td, &:last-child th': { border: 0 },
                      }}>
                      <TableCell align='center' component='th' scope='row'>
                        {course.crs_sbj}
                      </TableCell>
                      <TableCell align='center' scope='row'>
                        {course.crs_num}
                      </TableCell>
                      <TableCell align='center' scope='row'>
                        {course.crs_title}
                      </TableCell>
                      {/* <TableCell scope='row'>
                      <Stack
                        direction='row'
                        spacing={0}
                        justifyContent='center'>
                        {course.instructors.map((instructor) => (
                          <Chip
                            key={instructor}
                            label={instructor}
                            variant='filled'
                            color='primary'
                          />
                        ))}
                      </Stack>
                    </TableCell>
                    <TableCell align='center' scope='row'>
                      {course.sections}
                    </TableCell> */}
                      <TableCell align='center'>
                        <IconButton
                          aria-label='edit'
                          color='primary'
                          onClick={(e) => {
                            e.stopPropagation();
                            handleEditCourseDialogOpen(course);
                          }}>
                          <EditIcon />
                        </IconButton>
                      </TableCell>
                      <TableCell align='center'>
                        <IconButton
                          aria-label='delete'
                          color='primary'
                          onClick={(e) => {
                            e.stopPropagation();
                            handleDeleteCourseDialogOpen(course);
                          }}>
                          <DeleteIcon />
                        </IconButton>
                      </TableCell>
                    </TableRow>
                  ))}
              </TableBody>
            </Table>
          </TableContainer>
          <Dialog
            className='dialog'
            open={newCourseDialogOpen}
            onClose={() => setNewCourseDialogOpen(false)}
            PaperProps={{
              component: 'form',
              onSubmit: (e) => {
                e.preventDefault();
                createNewCourse(e);
              },
            }}>
            <DialogTitle>New Course</DialogTitle>
            <DialogContent>
              <Stack
                direction='row'
                spacing={{ xs: 1, sm: 3 }}
                useFlexGap
                flexWrap='wrap'>
                <TextField
                  id='new-course-prefix'
                  label='Prefix'
                  variant='outlined'
                  required
                  onChange={(event) =>
                    setNewCourseDialogState(
                      (prev) => ((prev.prefix = event.target.value), prev),
                    )
                  }
                />
                <Autocomplete
                  disablePortal
                  id='combo-box-demo'
                  className='dialog-item'
                  variant='outlined'
                  required
                  options={semesters}
                  defaultValue={
                    semesters.length == 0
                      ? undefined
                      : {
                          ...currentToolbarSemester,
                          label:
                            currentToolbarSemester.season +
                            ' ' +
                            currentToolbarSemester.year,
                        }
                  }
                  onChange={(e) =>
                    setNewCourseDialogState(
                      (prev) => (
                        (prev.semester = semesters[e.target.value]), prev
                      ),
                    )
                  }
                  renderInput={(params) => (
                    <TextField {...params} label='Semester' />
                  )}
                />
                <TextField
                  id='new-course-number'
                  label='Number'
                  variant='outlined'
                  className='dialog-item'
                  required
                  onChange={(event) =>
                    setNewCourseDialogState(
                      (prev) => ((prev.number = event.target.value), prev),
                    )
                  }
                />
                <FormControl className='dialog-item'>
                  <InputLabel id='new-course-credits-label'>Credits</InputLabel>
                  <Select
                    labelId='new-course-credits-label'
                    label='Credits'
                    id='new-course-credits'
                    required
                    onChange={(event) =>
                      setNewCourseDialogState(
                        (prev) => ((prev.credits = event.target.value), prev),
                      )
                    }>
                    <MenuItem value={1}>1</MenuItem>
                    <MenuItem value={2}>2</MenuItem>
                    <MenuItem value={3}>3</MenuItem>
                    <MenuItem value={4}>4</MenuItem>
                    <MenuItem value={5}>5</MenuItem>
                    <MenuItem value={6}>6</MenuItem>
                  </Select>
                </FormControl>
              </Stack>
              <TextField
                autoFocus
                required
                id='new-rubric-name-textfield'
                name='name'
                label='Name'
                fullwidth='true'
                variant='standard'
                className='dialog-item'
                onChange={(event) =>
                  setNewCourseDialogState(
                    (prev) => ((prev.name = event.target.value), prev),
                  )
                }
              />
            </DialogContent>
            <DialogActions className='dialog-actions'>
              <Button
                onClick={() => setNewCourseDialogOpen(false)}
                variant='outlined'>
                Cancel
              </Button>
              <Button type='submit' variant='filled'>
                Save
              </Button>
            </DialogActions>
          </Dialog>
          <Dialog
            className='dialog'
            open={deleteCourseDialogOpen}
            onClose={handleDialogClose}
            PaperProps={{ component: 'form', onSubmit: (e) => deleteCourse(e) }}
            sx={{ minWidth: 275 }}>
            <DialogTitle>Delete Course</DialogTitle>
            <DialogContent>
              <Box>
                <DialogContentText id='delete-course-dialog-description'>
                  Deleting the {courseToDelete.crs_sbj} {courseToDelete.crs_num}{' '}
                  - {courseToDelete.crs_title} course means that all
                  corresponding sections will also be deleted. Are you sure that
                  you want to delete this course?
                </DialogContentText>
              </Box>
            </DialogContent>
            <DialogActions className='dialog-actions'>
              <Button onClick={() => handleDialogClose()} variant='outlined'>
                No
              </Button>
              <Button type='submit' variant='filled'>
                Yes
              </Button>
            </DialogActions>
          </Dialog>
        </Box>
      </Box>
    </ThemeProvider>
  );
}
