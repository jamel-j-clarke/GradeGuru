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
import '../../css/common.css';

export default function CourseArchive({ courseId }) {
  const restoreRubric = (e) => {
    // TODO
  };

  function createData(name) {
    return {
      name,
    };
  }

  const rows = [createData('Oral Progress Report 3 v1')];

  return (
    <>
      <Toolbar className='table-toolbar'></Toolbar>
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
                    <IconButton aria-label='delete' color='primary'>
                      <DeleteIcon />
                    </IconButton>
                  </TableCell>
                </TableRow>
              ))}
          </TableBody>
        </Table>
      </TableContainer>
    </>
  );
}
