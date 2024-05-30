import { useRef, useState, React, useEffect, useLayoutEffect } from 'react';
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
import TextField from '@mui/material/TextField';
import '../../css/common.css';
import rubricAPI from '../../api_clients/APIRubricClient';
import { ThemeProvider } from '@mui/material';
import useFetch from 'react-fetch-hook';
import createTrigger from 'react-use-trigger';
import useTrigger from 'react-use-trigger/useTrigger';
import { useNavigate, useParams } from 'react-router-dom';

const postRubricTrigger = createTrigger();
const patchRubricTrigger = createTrigger();
const deleteRubricTrigger = createTrigger();

export default function CourseRubrics({ courseId, sectionId }) {
  const urlParams = useParams();
  const postRubricTriggerValue = useTrigger(postRubricTrigger);
  const patchRubricTriggerValue = useTrigger(patchRubricTrigger);
  const deleteRubricTriggerValue = useTrigger(deleteRubricTrigger);
  const [dialogFormState, setDialogFormState] = useState({ name: undefined });
  const [patchDialogFormState, setPatchDialogFormState] = useState({
    name: undefined,
  });
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [rubricRows, setRubricRows] = useState([]);
  const [rubricToPatch, setRubricToPatch] = useState(-1);
  const [rubricToDelete, setRubricToDelete] = useState(-1);
  const [isPatchRubricDialogOpen, setIsPatchRubricDialogOpen] = useState(false);
  const navigate = useNavigate();

  const postRubricUrl = 'https://localhost/api/rubrics';
  const postRubricFetch = useFetch(postRubricUrl, {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      name: dialogFormState.name,
      courseId: courseId,
      type: 'course',
      sectionId: sectionId,
    }),
    depends: [
      postRubricTriggerValue,
      Object.values(dialogFormState).every((p) => p),
    ],
  });

  const patchRubricUrl = `https://localhost/api/rubrics/${rubricToPatch}`;
  const patchRubricFetch = useFetch(patchRubricUrl, {
    method: 'PATCH',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      name: patchDialogFormState.name,
    }),
    depends: [
      patchRubricTriggerValue,
      Object.values(patchDialogFormState).every((p) => p),
    ],
  });

  const deleteRubricUrl = `https://localhost/api/rubrics/${rubricToDelete}`;
  const _ = useFetch(deleteRubricUrl, {
    method: 'DELETE',
    depends: [deleteRubricTriggerValue],
  });

  const getRubricUrl = 'https://localhost/api/rubrics';
  const getRubricFetch = useFetch(getRubricUrl, {
    depends: [{ _: postRubricFetch.data }],
  });

  useEffect(() => {
    if (getRubricFetch.isLoading) return;
    getRubricFetch.error
      ? console.error(`Error getting ${getRubricUrl}`, getRubricFetch.error)
      : setRubricRows(
          getRubricFetch.data.map((rubric) => ({
            name: rubric.rub_name,
            id: rubric.rub_id,
          })),
        );
  }, [getRubricFetch.isLoading]);

  useEffect(() => {
    if (postRubricFetch.error)
      console.error(`Error posting ${postRubricUrl}`, postRubricFetch.error);
  }, [postRubricFetch.error]);

  const handleDeleteClick = (event, id) => {
    event.stopPropagation();
    setRubricToDelete(id);
    deleteRubricTrigger();
    const idx = rubricRows.findIndex((rub) => rub.id === rubricToPatch);
    rubricRows.splice(idx, 1);
    setRubricToDelete(-1);
  };

  const handleEditClick = (event, id) => {
    event.stopPropagation();
    setRubricToPatch(id);
    setIsPatchRubricDialogOpen(true);
  };

  const handleClose = () => {
    setIsPatchRubricDialogOpen(false);
    setRubricToPatch(-1);
    setPatchDialogFormState({
      name: undefined,
    });
  };

  return (
    <>
      <Toolbar className='table-toolbar'>
        <Button onClick={() => setIsDialogOpen(true)} variant='contained'>
          New Course Rubric
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
            {rubricRows.map((row) => (
              <TableRow
                onClick={() => {
                  const url = `${sectionId}/${row.name}`;
                  console.log(window.location + '/' + url);
                  navigate(url, {
                    state: { rubricId: row.id },
                  });
                }}
                key={`${row.id}`}
                sx={{
                  '&:last-child td, &:last-child th': { border: 0 },
                }}>
                <TableCell align='center' component='th' scope='row'>
                  {row.name}
                </TableCell>
                <TableCell align='center'>
                  <IconButton
                    aria-label='edit'
                    color='primary'
                    onClick={(event) => handleEditClick(event, row.id)}>
                    <EditIcon />
                  </IconButton>
                </TableCell>
                <TableCell align='center'>
                  <IconButton
                    aria-label='delete'
                    color='primary'
                    onClick={(event) => handleDeleteClick(event, row.id)}>
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
        open={isDialogOpen}
        onClose={() => setIsDialogOpen(false)}
        PaperProps={{
          component: 'form',
          onSubmit: (e) => {
            e.preventDefault();
            postRubricTrigger();
            setIsDialogOpen(false);
          },
        }}>
        <DialogTitle>New Course Rubric</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            required
            id='new-course-rubric-name-textfield'
            name='name'
            label='Name'
            fullwidth='true'
            variant='standard'
            onChange={(e) =>
              setDialogFormState((prev) => ((prev.name = e.target.value), prev))
            }
          />
        </DialogContent>
        <DialogActions className='dialog-actions'>
          <Button onClick={() => setIsDialogOpen(false)} variant='outlined'>
            Cancel
          </Button>
          <Button type='submit' variant='filled'>
            Save
          </Button>
        </DialogActions>
      </Dialog>
      <Dialog
        className='editDialog'
        open={isPatchRubricDialogOpen}
        onClose={handleClose}
        PaperProps={{
          component: 'form',
          onSubmit: (e) => {
            e.preventDefault();
            patchRubricTrigger();
            const idx = rubricRows.findIndex((rub) => rub.id === rubricToPatch);
            rubricRows[idx].name = patchDialogFormState.name;
            handleClose();
          },
        }}>
        <DialogTitle>Edit Course Rubric</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            required
            id='edit-course-rubric-name-textfield'
            name='name'
            label='Name'
            fullwidth='true'
            variant='standard'
            onChange={(e) =>
              setPatchDialogFormState(
                (prev) => ((prev.name = e.target.value), prev),
              )
            }
          />
        </DialogContent>
        <DialogActions className='dialog-actions'>
          <Button onClick={handleClose} variant='outlined'>
            Cancel
          </Button>
          <Button type='submit' variant='filled'>
            Save
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
}
