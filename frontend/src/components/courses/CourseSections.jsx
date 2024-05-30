import { Box, Typography } from '@mui/material';
import Toolbar from '@mui/material/Toolbar';
import Breadcrumbs from '@mui/material/Breadcrumbs';
import Button from '@mui/material/Button';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import IconButton from '@mui/material/IconButton';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
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
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import DialogContentText from '@mui/material/DialogContentText';
import { ThemeProvider } from '@mui/material/styles';
import { useNavigate, useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import '../../css/common.css';
import '../../css/Sections.css';
import courseAPI from '../../api_clients/APICourseClient';
import sectionAPI from '../../api_clients/APISectionClient';
// const path = window.location.pathname;
// const coursePrefix = path.substring(1, path.)
// console.log(coursePrefix);

function createData(number, instructors, teachingAssistants, numStudents) {
  return { number, instructors, teachingAssistants, numStudents };
}

const rows = [
  createData('01', ['heil', 'ixdoming'], ['rlgaddy'], 44),
  createData('02', ['heil', 'aallard', 'jtking'], ['seelder'], 43),
  createData('03', ['heil', 'tbdimitr'], ['azhang25'], 45),
  createData('04', ['heil', 'dbsturgi'], ['pvelaga2'], 44),
  createData('05', ['heil', 'acard'], ['mrashid4'], 39),
];

const handleClickEdit = (id) => {};

const handleClickDelete = (id) => {};

export default function CourseSections({ courseId }) {
  // console.log(`id: ${courseId}`);
  const [sections, setSections] = useState([]);
  const [open, setOpen] = useState(false);
  const [newSectionDialogOpen, setNewSectionDialogOpen] = useState(false);
  const [newSectionDialogState, setNewSectionDialogState] = useState({
    number: undefined,
  });
  const [editSectionDialogOpen, setEditSectionDialogOpen] = useState(false);
  const [editSectionDialogState, setEditSectionDialogState] = useState({
    number: undefined,
  });
  const [deleteSectionDialogOpen, setDeleteSectionDialogOpen] = useState(false);
  const [sectionToDelete, setSectionToDelete] = useState([
    {
      number: undefined,
    },
  ]);

  useEffect(() => {
    async function fetchData() {
      if (courseId !== undefined)
        sectionAPI.getCourseSections(courseId).then((fetchedSections) => {
          setSections(fetchedSections);
        });
    }
    fetchData();
  }, []);

  const handleEditSectionDialogOpen = () => {
    setOpen(true);
  };

  const handleDeleteSectionDialogOpen = (section) => {
    setSectionToDelete(section);
    console.log(`section to deletE: ${JSON.stringify(sectionToDelete)}`);
    setDeleteSectionDialogOpen(true);
  };

  const handleDialogClose = () => {
    setNewSectionDialogOpen(false);
    setEditSectionDialogOpen(false);
    setDeleteSectionDialogOpen(false);
  };

  const handleClickEdit = (id) => {};

  const handleClickDelete = (id) => {};

  const handleClickRow = (sectionNumber) => {
    window.location += `/${sectionNumber}`;
  };

  const createNewSection = (e) => {
    e.preventDefault();
    let sectionBody = {
      number: newSectionDialogState.number,
      courseId: courseId,
    };
    sectionAPI
      .createSection(sectionBody)
      .then((res) => {
        setNewSectionDialogOpen(false);
      })
      .catch((err) => {
        console.error(err);
      });
  };

  const deleteSection = (e) => {
    sectionAPI
      .deleteSection(sectionToDelete.id)
      .then((res) => {
        handleDialogClose();
      })
      .catch((err) => {
        console.error(err);
      });
  };
  return (
    <>
      <Toolbar className='table-toolbar'>
        <Button
          variant='contained'
          onClick={() => setNewSectionDialogOpen(true)}>
          New Section
        </Button>
      </Toolbar>
      <TableContainer component={Paper}>
        <Table stickyHeader sx={{ minWidth: 650 }} aria-label='simple table'>
          <TableHead>
            <TableRow>
              <TableCell align='center'>Section</TableCell>
              {/* <TableCell align='center'>Instructors</TableCell>
              <TableCell align='center'>Teaching Assistants</TableCell>
              <TableCell align='center'>Number of Students</TableCell> */}
              <TableCell align='center'>Edit</TableCell>
              <TableCell align='center'>Remove</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {sections &&
              sections.map((section) => (
                <TableRow
                  onClick={() => handleClickRow(section.number)}
                  key={section.number}
                  sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                  <TableCell component='th' scope='row' align='center'>
                    {section.number}
                  </TableCell>
                  {/* <TableCell scope='row'>
                    <Stack direction='row' spacing={0} justifyContent='center'>
                      {row.instructors.map((instructor) => (
                        <Chip
                          key={instructor}
                          label={instructor}
                          variant='filled'
                          color='primary'
                        />
                      ))}
                    </Stack>
                  </TableCell>
                  <TableCell scope='row'>
                    <Stack direction='row' spacing={0} justifyContent='center'>
                      {row.teachingAssistants.map((ta) => (
                        <Chip
                          key={ta}
                          label={ta}
                          variant='filled'
                          color='primary'
                        />
                      ))}
                    </Stack>
                  </TableCell>
                  <TableCell scope='row' align='center'>
                    {row.numStudents}
                  </TableCell> */}
                  <TableCell align='center'>
                    <IconButton aria-label='edit' color='primary'>
                      <EditIcon />
                    </IconButton>
                  </TableCell>
                  <TableCell align='center'>
                    <IconButton
                      aria-label='delete'
                      color='primary'
                      onClick={(e) => {
                        e.stopPropagation();
                        handleDeleteSectionDialogOpen(section);
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
        open={newSectionDialogOpen}
        onClose={handleDialogClose}
        PaperProps={{
          component: 'form',
          onSubmit: (e) => createNewSection(e),
        }}
        sx={{ minWidth: 275 }}>
        <DialogTitle>New Section</DialogTitle>
        <DialogContent>
          <TextField
            id='new-section-number'
            label='Number'
            variant='outlined'
            required
            onChange={(event) =>
              setNewSectionDialogState(
                (prev) => ((prev.number = event.target.value), prev),
              )
            }
          />
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
        open={deleteSectionDialogOpen}
        onClose={handleDialogClose}
        PaperProps={{ component: 'form', onSubmit: (e) => deleteSection(e) }}
        sx={{ minWidth: 275 }}>
        <DialogTitle>Delete Course</DialogTitle>
        <DialogContent>
          <Box>
            <DialogContentText id='delete-section-dialog-description'>
              Are you sure that you want to delete Section{' '}
              {sectionToDelete.number} of this course?
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
    </>
  );
}
