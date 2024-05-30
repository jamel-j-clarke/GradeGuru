import { useRef, useState, useEffect, React } from 'react';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import DialogContentText from '@mui/material/DialogContentText';
import TextField from '@mui/material/TextField';
import '../../css/common.css';
import rubricAPI from '../../api_clients/APIRubricClient';
import createTrigger from 'react-use-trigger';
import useTrigger from 'react-use-trigger/useTrigger';

const rubricTrigger = createTrigger();

export default function SectionRubrics({ sectionId }) {
  const [currentSectionId, setCurrentSectionId] = useState(sectionId);
  const [newRubricName, setNewRubricName] = useState('');
  const [rubrics, setRubrics] = useState(null);
  const [loading, setLoading] = useState(false);
  const [rubricToEdit, setRubricToEdit] = useState({
    id: undefined,
    name: undefined,
  });
  const [editRubricState, setEditRubricState] = useState({
    id: undefined,
    name: undefined,
  });
  const [rubricToDelete, setRubricToDelete] = useState([
    {
      id: undefined,
      name: undefined,
    },
  ]);
  const rubricTriggerValue = useTrigger(rubricTrigger);
  const [newRubricDialogOpen, setNewRubricDialogOpen] = useState(false);
  const [editRubricDialogOpen, setEditRubricDialogOpen] = useState(false);
  const [deleteRubricDialogOpen, setDeleteRubricDialogOpen] = useState(false);

  console.log(`prop section id: ${sectionId}`);

  if (sectionId !== undefined) {
    useEffect(() => {
      console.log(
        `SectionRubrics id before: ${JSON.stringify(currentSectionId)}`,
      );
      setCurrentSectionId(sectionId.id);
      console.log(
        `SectionRubrics id after: ${JSON.stringify(currentSectionId)}`,
      );
    }, [sectionId]);

    if (currentSectionId !== -1) {
      useEffect(() => {
        console.log(`section id: ${JSON.stringify(currentSectionId)}`);
        rubricAPI
          .getSectionRubrics(currentSectionId)
          .then((sectionRubrics) => {
            console.log(`fetched rubrics: ${JSON.stringify(sectionRubrics)}`);
            setRubrics(sectionRubrics);
          })
          .catch((err) => {
            console.error(err);
          });
      }, [rubricTriggerValue]);
    }
  }

  const handleNewRubricDialogOpen = () => {
    setNewRubricDialogOpen(true);
  };

  const handleEditRubricDialogOpen = (rubric) => {
    console.log(`edit rubric param: ${JSON.stringify(rubric)}`);
    // setRubricToEdit({
    //   id: rubric.id,
    //   name: rubric.name,
    // });
    setEditRubricState({
      ...editRubricState,
      id: rubric.id,
      name: rubric.name,
    });
    setEditRubricDialogOpen(true);
    console.log(`post hERDO: ${JSON.stringify(editRubricState)}`);
  };

  const handleDeleteRubricDialogOpen = (rubric) => {
    setRubricToDelete({ id: rubric.id, name: rubric.name });
    setDeleteRubricDialogOpen(true);
  };

  const handleDialogClose = () => {
    setNewRubricDialogOpen(false);
    setEditRubricDialogOpen(false);
    setDeleteRubricDialogOpen(false);
    rubricTrigger();
  };

  const createBlankSectionRubric = (e) => {
    console.log(`new rubric state: ${JSON.stringify(newRubricName)}`);
    let rubricBody = {
      name: newRubricName,
      courseId: 0,
      type: 'section',
      sectionId: currentSectionId,
    };

    rubricAPI
      .createRubric(rubricBody)
      .then((res) => {
        console.log(`new rubric: ${res}`);
      })
      .catch((err) => {
        alert(`Here's what went wrong: ${err}`);
        e.preventDefault();
      });
  };

  const editRubric = () => {
    let updatedSectionRubric = {
      id: editRubricState.id,
      name: editRubricState.name,
      courseId: 0,
      type: 'section',
      sectionId: currentSectionId,
    };
    rubricAPI
      .editRubric(updatedSectionRubric.id, updatedSectionRubric)
      .then((res) => {
        handleDialogClose();
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const deleteRubric = (e) => {
    rubricAPI
      .deleteRubric(rubricToDelete.id)
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
        <Button onClick={() => handleNewRubricDialogOpen()} variant='contained'>
          New Section Rubric
        </Button>
      </Toolbar>
      <TableContainer component={Paper}>
        <Table stickyHeader sx={{ minWidth: 650 }} aria-label='simple-table'>
          <TableHead>
            <TableRow>
              <TableCell align='center'>Name</TableCell>
              <TableCell align='center' className='button-column'>
                Edit
              </TableCell>
              <TableCell align='center' className='button-column'>
                Delete
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {rubrics &&
              rubrics.map((rubric) => (
                <TableRow
                  key={`${rubric.id}`} // TODO: fix key!!!!
                  sx={{
                    '&:last-child td, &:last-child th': { border: 0 },
                  }}>
                  <TableCell align='center' component='th' scope='row'>
                    {rubric.name}
                  </TableCell>
                  <TableCell align='center'>
                    <IconButton
                      aria-label='edit'
                      color='primary'
                      onClick={(e) => {
                        e.preventDefault();
                        e.stopPropagation();
                        handleEditRubricDialogOpen(rubric);
                      }}>
                      <EditIcon />
                    </IconButton>
                  </TableCell>
                  <TableCell align='center'>
                    <IconButton
                      aria-label='delete'
                      color='primary'
                      onClick={(e) => {
                        e.preventDefault();
                        e.stopPropagation();
                        handleDeleteRubricDialogOpen(rubric);
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
        open={newRubricDialogOpen}
        onClose={() => handleDialogClose()}
        PaperProps={{
          component: 'form',
          onSubmit: (e) => {
            createBlankSectionRubric(e);
          },
        }}>
        <DialogTitle>New Section Rubric Name</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            required
            id='new-section-rubric-name-textfield'
            name='name'
            label='Name'
            fullwidth='true'
            variant='standard'
            onChange={(e) =>
              setNewRubricName((prev) => ((prev = e.target.value), prev))
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
        open={editRubricDialogOpen}
        onClose={() => handleDialogClose()}
        PaperProps={{
          component: 'form',
          onSubmit: () => editRubric(),
        }}>
        <DialogTitle>Edit Section Rubric</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            required
            id='edit-section-rubric-name-textfield'
            name='name'
            label='Name'
            fullwidth='true'
            variant='standard'
            value={editRubricState.name}
            onChange={(event) => {
              setEditRubricState({
                ...editRubricState,
                name: event.target.value,
              });
            }}
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
        open={deleteRubricDialogOpen}
        onClose={() => handleDialogClose()}
        PaperProps={{
          component: 'form',
          onSubmit: () => deleteRubric(),
        }}
        sx={{ minWidth: 275 }}>
        <DialogTitle>Delete Semester</DialogTitle>
        <DialogContent>
          <Box>
            <DialogContentText id='delete-rubric-dialog-description'>
              Are you sure that you want to delete the {rubricToDelete.name}{' '}
              rubric?
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
