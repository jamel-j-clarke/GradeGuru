import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import IconButton from '@mui/material/IconButton';
import EditIcon from '@mui/icons-material/Edit';
import { ThemeProvider } from '@mui/material/styles';
import RestoreFromTrashIcon from '@mui/icons-material/RestoreFromTrash';

export default function SectionArchive({ sectionId }) {
  function createData(name) {
    return { name };
  }

  const rows = [
    createData('Interim Project Report v1'),
    createData('Oral Progress Report 2 v1'),
  ];

  return (
    <>
      <TableContainer component={Paper}>
        <Table stickyHeader sx={{ minWidth: 650 }} aria-label='simple table'>
          <TableHead>
            <TableRow>
              <TableCell align='center'>Name</TableCell>
              <TableCell align='center'>Edit</TableCell>
              <TableCell align='center'>Restore</TableCell>
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
                <TableCell align='center'>
                  <IconButton aria-label='edit' color='primary'>
                    <EditIcon />
                  </IconButton>
                </TableCell>
                <TableCell align='center'>
                  <IconButton aria-label='restore' color='primary'>
                    <RestoreFromTrashIcon />
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
