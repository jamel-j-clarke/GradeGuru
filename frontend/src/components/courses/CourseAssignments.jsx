import { useRef, useState, React } from 'react';
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

export default function CourseAssignments({ courseId }) {
  const handleClickGrade = () => {
    // TODO implement
  };

  const nameRef = useRef(null);

  const createBlankCourseAssignment = (e) => {
    let newAssignment = {
      name: nameRef,
      courseId: 1,
    };
    // TODO
  };

  const [open, setOpen] = useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleDialogClose = () => {
    setOpen(false);
  };

  function createData(name) {
    return {
      name,
    };
  }

  const rows = [createData('Interim Progress Report')];

  return (
    <>
      <Toolbar className='table-toolbar'>
        <Button onClick={handleClickOpen} variant='contained'>
          New Course Assignment
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
            {rows.length > 1 &&
              rows.map((row) => (
                <TableRow
                  key={`${row.name}`} // TODO: fix key!!!!
                  sx={{
                    '&:last-child td, &:last-child th': { border: 0 },
                  }}>
                  <TableCell align='center' component='th' scope='row'>
                    {row.name}
                  </TableCell>
                  <TableCell align='center'>
                    <IconButton aria-label='edit' color='primary'>
                      <EditIcon />
                    </IconButton>
                  </TableCell>
                  <TableCell align='center'>
                    <IconButton
                      onClick={handleClickGrade}
                      aria-label='grade'
                      color='primary'>
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
        open={open}
        onClose={handleDialogClose}
        PaperProps={{
          component: 'form',
          onSubmit: (e) => createBlankCourseAssignment(e),
        }}>
        <DialogTitle>New Course Assignment Name</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            required
            id='new-course-assignment-name-textfield'
            name='name'
            label='Name'
            fullwidth='true'
            variant='standard'
            ref={nameRef}
          />
        </DialogContent>
        <DialogActions className='dialog-actions'>
          <Button onClick={handleDialogClose} variant='outlined'>
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
