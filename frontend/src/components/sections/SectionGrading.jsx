import { useState, React } from 'react';
import IconButton from '@mui/material/IconButton';
import CalculateIcon from '@mui/icons-material/Calculate';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import '../../css/common.css';

export default function SectionGrading({ sectionId }) {
  const [open, setOpen] = useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleDialogClose = () => {
    setOpen(false);
  };

  function createData(name, status) {
    return {
      name,
      status,
    };
  }

  const rows = [
    createData('Interim Progress Report', 87),
    createData('Final Progress Report', 0),
    createData('Oral Progress Report 1', 100),
    createData('Oral Progress Report 2', 0),
  ];

  return (
    <>
      <TableContainer component={Paper}>
        <Table stickyHeader sx={{ minWidth: 650 }} aria-label='simple-table'>
          <TableHead>
            <TableRow>
              <TableCell align='center'>Name</TableCell>
              <TableCell align='center' className='button-column'>
                Grading Completion Status
              </TableCell>
              <TableCell align='center' className='button-column'>
                Grade
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
                  <TableCell align='center'>{`${row.status}%`}</TableCell>
                  <TableCell align='center'>
                    <IconButton aria-label='delete' color='primary'>
                      <CalculateIcon />
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
