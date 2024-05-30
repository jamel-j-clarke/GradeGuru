import { useEffect, useState, React } from 'react';
import { Box, Typography } from '@mui/material';
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
import Paper from '@mui/material/Paper';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import DialogContentText from '@mui/material/DialogContentText';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import Snackbar from '@mui/material/Snackbar';
import Alert from '@mui/material/Alert';
import { ThemeProvider } from '@mui/material/styles';
import Nav from '../components/Nav';
import '../css/common.css';
import '../css/Semesters.css';
import semesterAPI from '../api_clients/APISemesterClient';
import { ConstructionOutlined } from '@mui/icons-material';
import createTrigger from 'react-use-trigger';
import useTrigger from 'react-use-trigger/useTrigger';

/**
 * what's left to do:
 * - fix set active semester because it toggles the active field
 *   which allows multiple semesters to be active at the same
 *   time
 */
const semesterTrigger = createTrigger();

export default function Semesters({ customTheme }) {
  const handleClickRow = (year, season) => {
    window.location = `/${year}/${season}`;
  };

  const semesterTriggerValue = useTrigger(semesterTrigger);
  const [semesters, setSemesters] = useState([]);
  const [loading, setLoading] = useState(false);
  const [currentToolbarSemester, setCurrentToolbarSemester] = useState([]);
  const [newSemesterDialogOpen, setNewSemesterDialogOpen] = useState(false);
  const [newSemesterDialogState, setNewSemesterDialogState] = useState({
    season: '',
    year: '',
    active: false,
  });
  const [setActiveSemesterDialogOpen, setTheActiveSemesterDialogOpen] =
    useState(false);
  const [updatedActiveSemester, setUpdatedActiveSemester] = useState('');
  const [newActiveSemester, setNewActiveSemester] = useState({
    id: undefined,
    season: undefined,
    year: undefined,
    active: undefined,
  });
  const [editSemesterDialogOpen, setEditSemesterDialogOpen] = useState(false);
  const [editSemesterDialogState, setEditSemesterDialogState] = useState({
    id: undefined,
    season: undefined,
    year: undefined,
    active: undefined,
  });
  const [semesterToDelete, setSemesterToDelete] = useState([]);
  const [deleteSemesterDialogOpen, setDeleteSemesterDialogOpen] =
    useState(false);
  const [openSnackbar, setOpenSnackbar] = useState(false);

  useEffect(() => {
    setLoading(true);
    semesterAPI
      .getActiveSemester()
      .then((activeSemester) => {
        setCurrentToolbarSemester(activeSemester);
        setUpdatedActiveSemester(
          `${activeSemester.season} ${activeSemester.year}`,
        );
      })
      .catch((e) => console.error(e))
      .finally(() => {
        setLoading(false);
      });
  }, []);

  useEffect(() => {
    setLoading(true);
    semesterAPI
      .getSemesters()
      .then((fetchedSemesters) => {
        setSemesters(fetchedSemesters);
      })
      .finally(() => {
        setLoading(false);
      });
  }, [semesterTriggerValue]);

  const handleNewSemesterDialogOpen = () => {
    setNewSemesterDialogOpen(true);
  };

  const handleSetActiveSemesterDialogOpen = () => {
    setTheActiveSemesterDialogOpen(true);
  };
  // see above for updatedActiveSemester
  const handleSetActiveSemesterChange = (event) => {
    setUpdatedActiveSemester(event.target.value);
    let semesterInfo = event.target.value.split(' ');
    setNewActiveSemester({
      ...newActiveSemester,
      season: semesterInfo[0],
      year: semesterInfo[1],
      active: true,
    });
  };

  const handleEditSemesterDialogOpen = (semester) => {
    setEditSemesterDialogState({
      id: semester.id,
      season: semester.season,
      year: semester.year,
      active: semester.active,
    });
    setEditSemesterDialogOpen(true);
  };

  const handleDeleteSemesterDialogOpen = (semester) => {
    setSemesterToDelete(semester);
    setDeleteSemesterDialogOpen(true);
  };

  const handleDialogClose = () => {
    setNewSemesterDialogOpen(false);
    setDeleteSemesterDialogOpen(false);
    setEditSemesterDialogOpen(false);
    setTheActiveSemesterDialogOpen(false);
    semesterTrigger();
  };

  const handleOpenSnackbar = () => {
    setOpenSnackbar(true);
  };
  const handleCloseSnackbar = (event, reason) => {
    if (reason === 'clickaway') return;
    setOpenSnackbar(false);
  };

  let addAlert;

  const createNewSemester = (event) => {
    event.preventDefault();
    let semesterBody = {
      season: newSemesterDialogState.season,
      year: newSemesterDialogState.year,
      active: false,
    };
    if (semesters.length === 0) semesterBody.active = true;
    semesterAPI
      .createSemester(semesterBody)
      .then((res) => {
        addAlert = (
          <Alert onClose={handleCloseSnackbar} severity='success'>
            The semester was successfully added.
          </Alert>
        );
        handleOpenSnackbar();
        handleDialogClose();
      })
      .catch((err) => {
        addAlert = (
          <Alert onClose={handleCloseSnackbar} severity='error'>
            Here's what went wrong: {err};
          </Alert>
        );
        console.error(err);
      });
  };

  const setActiveSemester = (event) => {
    event.preventDefault();
    // make the current semester inactive
    let oldActiveSemester = {
      id: currentToolbarSemester.id,
      season: currentToolbarSemester.season,
      year: currentToolbarSemester.year,
      active: false,
    };
    // if there's no active semester: just make one active
    if (oldActiveSemester.id == undefined) {
      semesterAPI
        .editSemester(newActiveSemester.id, newActiveSemester)
        .then((res) => {
          addAlert = (
            <Alert onClose={handleCloseSnackbar} severity='success'>
              The active semester has been successfully updated to
              {newActiveSemester.season} {newActiveSemester.year}.
            </Alert>
          );
          handleOpenSnackbar();
          handleDialogClose();
        })
        .catch((err) => {
          event.preventDefault();
          addAlert = (
            <Alert onClose={handleCloseSnackbar} severity='error'>
              {`Here's what went wrong: ${err}`}
            </Alert>
          );
          handleOpenSnackbar();
          console.log(err);
        });
    }
    // otherwise, make the switch the active semester with the intended one
    else {
      semesterAPI
        .editSemester(oldActiveSemester.id, oldActiveSemester)
        .then((res) => {
          // make the new semester active

          semesterAPI
            .editSemester(newActiveSemester.id, newActiveSemester)
            .then((res) => {
              addAlert = (
                <Alert onClose={handleCloseSnackbar} severity='success'>
                  The active semester has been successfully updated from
                  {oldActiveSemester.season} {oldActiveSemester.year} to
                  {newActiveSemester.season} {newActiveSemester.year}.
                </Alert>
              );
              handleOpenSnackbar();
              handleDialogClose();
            })
            .catch((err) => {
              addAlert = (
                <Alert onClose={handleCloseSnackbar} severity='error'>
                  {`Here's what went wrong: ${err}`}
                </Alert>
              );
              handleOpenSnackbar();
              console.log(err);
            });
        })
        .catch((err) => {
          event.preventDefault();
          addAlert = (
            <Alert onClose={handleCloseSnackbar} severity='error'>
              Here's what went wrong: {err};
            </Alert>
          );
          handleOpenSnackbar();
          console.log(err);
        });
    }
  };

  const editSemester = (e) => {
    let editedSemester = {
      season: editSemesterSeason,
      year: editSemesterYear,
      active: semesterToEdit.active,
    };
    semesterAPI
      .editSemester(semesterToEdit.id, editedSemester)
      .then((res) => {
        addAlert = (
          <Alert onClose={handleCloseSnackbar} severity='success'>
            The {semesterToEdit.season} {semesterToEdit.year} semester was
            successfully updated to {editedSemester.season}{' '}
            {editedSemester.year}.
          </Alert>
        );
        handleOpenSnackbar();
        handleDialogClose();
      })
      .catch((err) => {
        addAlert = (
          <Alert onClose={handleCloseSnackbar} severity='error'>
            Here's what went wrong: {err};
          </Alert>
        );
        handleOpenSnackbar();
        console.log(err);
      });
  };

  const deleteSemester = (e) => {
    semesterAPI
      .deleteSemester(semesterToDelete.id)
      .then((res) => {
        addAlert = (
          <Alert onClose={handleCloseSnackbar} severity='success'>
            The semester was successfully deleted.
          </Alert>
        );
        handleOpenSnackbar();
        handleDialogClose();
      })
      .catch((err) => {
        addAlert = (
          <Alert onClose={handleCloseSnackbar} severity='error'>
            Here's what went wrong: {err};
          </Alert>
        );
        handleOpenSnackbar();
        console.log(err);
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
                Semesters
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
          <Toolbar className='table-toolbar'>
            <Button
              variant='contained'
              onClick={() => handleNewSemesterDialogOpen()}>
              New Semester
            </Button>
            <Button
              variant='outlined'
              onClick={() => handleSetActiveSemesterDialogOpen()}>
              Set Active Semester
            </Button>
          </Toolbar>
          <TableContainer component={Paper}>
            <Table
              stickyHeader
              sx={{ minWidth: 650 }}
              aria-label='simple table'>
              <TableHead>
                <TableRow>
                  <TableCell align='center'>Name</TableCell>
                  <TableCell align='center'>Edit</TableCell>
                  <TableCell align='center'>Remove</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {semesters &&
                  semesters.map((semester) => (
                    <TableRow
                      key={semester.id}
                      sx={{
                        '&:last-child td, &:last-child th': { border: 0 },
                      }}
                      className={semester.active ? 'bg-red-200' : ''}>
                      <TableCell
                        component='th'
                        scope='row'
                        className='name-column'
                        onClick={() =>
                          handleClickRow(semester.year, semester.season)
                        }>
                        {`${semester.season} ${semester.year}`}
                      </TableCell>
                      <TableCell align='center'>
                        <IconButton
                          aria-label='edit'
                          color='primary'
                          onClick={() =>
                            handleEditSemesterDialogOpen(semester)
                          }>
                          <EditIcon />
                        </IconButton>
                      </TableCell>
                      <TableCell align='center'>
                        {semester.active == false && (
                          <IconButton
                            aria-label='delete'
                            color='primary'
                            onClick={() =>
                              handleDeleteSemesterDialogOpen(semester)
                            }>
                            <DeleteIcon />
                          </IconButton>
                        )}
                      </TableCell>
                    </TableRow>
                  ))}
              </TableBody>
            </Table>
          </TableContainer>
          <Dialog
            className='dialog'
            open={newSemesterDialogOpen}
            onClose={handleDialogClose}
            PaperProps={{
              component: 'form',
              onSubmit: (e) => createNewSemester(e),
            }}
            sx={{ minWidth: 275 }}>
            <DialogTitle>New Semester</DialogTitle>
            <DialogContent>
              <Box>
                <FormControl sx={{ minWidth: 125 }}>
                  <InputLabel id='new-season-select-label'>Season</InputLabel>
                  <Select
                    labelId='new-season-select-label'
                    id='new-season-select'
                    value={newSemesterDialogState.season}
                    label='Season'
                    onChange={(event) => {
                      setNewSemesterDialogState({
                        ...newSemesterDialogState,
                        season: event.target.value,
                      });
                    }}>
                    <MenuItem value={'Fall'}>Fall</MenuItem>
                    <MenuItem value={'Spring'}>Spring</MenuItem>
                    <MenuItem value={'Summer'}>Summer</MenuItem>
                  </Select>
                </FormControl>
                <FormControl sx={{ minWidth: 125 }}>
                  <InputLabel id='new-year-select-label'>Year</InputLabel>
                  <Select
                    labelId='new-year-select-label'
                    id='new-year-select'
                    value={newSemesterDialogState.year}
                    label='Year'
                    onChange={(event) => {
                      setNewSemesterDialogState({
                        ...newSemesterDialogState,
                        year: event.target.value,
                      });
                    }}>
                    <MenuItem value={2024}>2024</MenuItem>
                    <MenuItem value={2025}>2025</MenuItem>
                    <MenuItem value={2026}>2026</MenuItem>
                    <MenuItem value={2027}>2027</MenuItem>
                    <MenuItem value={2028}>2028</MenuItem>
                  </Select>
                </FormControl>
              </Box>
            </DialogContent>
            <DialogActions className='dialog-actions'>
              <Button onClick={() => handleDialogClose()} variant='outlined'>
                Cancel
              </Button>
              <Button type='submit' variant='filled'>
                Save
              </Button>
            </DialogActions>
          </Dialog>
          <Dialog
            className='dialog'
            open={setActiveSemesterDialogOpen}
            onClose={handleDialogClose}
            PaperProps={{
              component: 'form',
              onSubmit: (e) => setActiveSemester(e),
            }}
            sx={{ minWidth: 275 }}>
            <DialogTitle>Set Active Semester</DialogTitle>
            <DialogContent>
              <Box>
                <FormControl sx={{ minWidth: 125 }}>
                  <InputLabel id='set-active-semester-label'>
                    Semesters
                  </InputLabel>
                  <Select
                    labelId='set-active-semester-label'
                    label='Semesters'
                    id='set-active-semester'
                    value={updatedActiveSemester}
                    onChange={(event) => handleSetActiveSemesterChange(event)}>
                    {semesters &&
                      semesters.map((semester) => (
                        <MenuItem
                          value={`${semester.season} ${semester.year}`}
                          key={semester.id}
                          onClick={() => {
                            newActiveSemester.id = semester.id;
                          }}>
                          {`${semester.season} ${semester.year}`}
                        </MenuItem>
                      ))}
                  </Select>
                </FormControl>
              </Box>
            </DialogContent>
            <DialogActions className='dialog-actions'>
              <Button onClick={() => handleDialogClose()} variant='outlined'>
                Cancel
              </Button>
              <Button type='submit' variant='filled'>
                Save
              </Button>
            </DialogActions>
          </Dialog>
          <Dialog
            className='dialog'
            open={editSemesterDialogOpen}
            onClose={handleDialogClose}
            PaperProps={{ component: 'form', onSubmit: () => editSemester() }}
            sx={{ minWidth: 275 }}>
            <DialogTitle>Edit Semester</DialogTitle>
            <DialogContent>
              <Box>
                <FormControl sx={{ minWidth: 125 }}>
                  <InputLabel id='edit-semester-season-label'>
                    Season
                  </InputLabel>
                  <Select
                    labelId='edit-semester-season-label'
                    label='Season'
                    id='edit-semester-season'
                    value={editSemesterDialogState.season}
                    onChange={(event) => {
                      setEditSemesterDialogState({
                        ...editSemesterDialogState,
                        season: event.target.value,
                      });
                    }}>
                    <MenuItem value={'Fall'}>Fall</MenuItem>
                    <MenuItem value={'Spring'}>Spring</MenuItem>
                    <MenuItem value={'Summer'}>Summer</MenuItem>
                  </Select>
                </FormControl>
                <FormControl sx={{ minWidth: 100 }}>
                  <InputLabel id='edit-semester-year-label'>Year</InputLabel>
                  <Select
                    labelId='edit-semester-year-label'
                    label='Year'
                    id='edit-semester-year'
                    value={editSemesterDialogState.year}
                    onChange={(event) => {
                      setEditSemesterDialogState({
                        ...editSemesterDialogState,
                        year: event.target.value,
                      });
                    }}>
                    <MenuItem value={2024}>2024</MenuItem>
                    <MenuItem value={2025}>2025</MenuItem>
                    <MenuItem value={2026}>2026</MenuItem>
                    <MenuItem value={2027}>2027</MenuItem>
                    <MenuItem value={2028}>2028</MenuItem>
                  </Select>
                </FormControl>
              </Box>
            </DialogContent>
            <DialogActions className='dialog-actions'>
              <Button onClick={() => handleDialogClose()} variant='outlined'>
                Cancel
              </Button>
              <Button type='submit' variant='filled'>
                Save
              </Button>
            </DialogActions>
          </Dialog>
          <Dialog
            className='dialog'
            open={deleteSemesterDialogOpen}
            onClose={handleDialogClose}
            PaperProps={{ component: 'form', onSubmit: () => deleteSemester() }}
            sx={{ minWidth: 275 }}>
            <DialogTitle>Delete Semester</DialogTitle>
            <DialogContent>
              <Box>
                <DialogContentText id='delete-semester-dialog-description'>
                  Deleting the {semesterToDelete.season} {semesterToDelete.year}{' '}
                  semester means that all corresponding courses and sections
                  will also be deleted. Are you sure that you want to delete
                  this semester?
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
          {/*TODO implement^^^^*/}
          <Snackbar
            open={openSnackbar}
            autoHideDuration={5000}
            onClose={() => handleCloseSnackbar()}>
            {addAlert}
          </Snackbar>
        </Box>
      </Box>
    </ThemeProvider>
  );
}
