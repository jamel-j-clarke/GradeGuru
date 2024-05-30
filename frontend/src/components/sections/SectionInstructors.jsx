import { useState, React } from 'react';
import Toolbar from '@mui/material/Toolbar';
import Button from '@mui/material/Button';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import IconButton from '@mui/material/IconButton';
import DeleteIcon from '@mui/icons-material/Delete';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';

export default function SectionInstructors({ sectionId }) {
  const [open, setOpen] = useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleDialogClose = () => {
    setOpen(false);
  };

  const addInstructorsToSection = (e) => {
    // TODO implement!!!
  };

  function createData(name, email) {
    return { name, email };
  }

  const rows = [
    createData('Margaret Heil', 'heil@ncsu.edu'),
    createData('Ignacio Dominguez', 'ixdoming@ncsu.edu'),
  ];

  return (
    <>
      <Toolbar className='table-toolbar'>
        <Button onClick={handleClickOpen} variant='contained'>
          Add Instructors
        </Button>
      </Toolbar>
      <TableContainer component={Paper}>
        <Table stickyHeader sx={{ minWidth: 650 }} aria-label='simple table'>
          <TableHead>
            <TableRow>
              <TableCell align='center'>Name</TableCell>
              <TableCell align='center'>Email</TableCell>
              <TableCell align='center'>Remove</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {rows.map((row) => (
              <TableRow
                key={row.name}
                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                <TableCell component='th' scope='row' align='center'>
                  {row.name}
                </TableCell>
                <TableCell align='center'>{row.email}</TableCell>
                <TableCell align='center'>
                  <IconButton aria-label='delete' color='primary'>
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
          onSubmit: addInstructorsToSection,
        }}>
        <DialogTitle>Add Instructors</DialogTitle>
        <DialogContent>
          {/* TODO: for reference: https://mui.com/material-ui/react-select/#chip */}
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
