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
import { ThemeProvider } from '@mui/material/styles';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import Nav from '../components/Nav';
import '../css/common.css';
import '../css/Sections.css';

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

export default function Sections({ customTheme }) {
  const [open, setOpen] = useState(false);

  const handleDialogOpen = () => {
    setOpen(true);
  };

  const handleDialogClose = () => {
    setOpen(false);
  };

  const [credits, setCredits] = useState(false);

  const handleNewCourseCreditChange = (event) => {
    setCredits(event.target.value);
  };

  const handleClickEdit = (id) => {};

  const handleClickDelete = (id) => {};

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
              <Link underline='hover' color='inherit' href='/courses'>
                Courses
              </Link>
              <Typography
                variant='h6'
                component='div'
                sx={{ flexGrow: 1, color: 'white' }}>
                CSC 492
                {/* TODO set to fetch actual course name */}
              </Typography>
            </Breadcrumbs>
            <Button variant='h6' disabled>
              Spring 2024
            </Button>
          </Toolbar>
          <Stack direction='row' spacing={2} className='page-toolbar'>
            {/* TODO: set values of these fields to the current course */}
            <TextField
              id='new-course-prefix'
              label='Prefix'
              variant='outlined'
              defaultValue='CSC' // TODO update to fetch actual prefix
              required
            />
            <TextField
              id='new-course-number'
              label='Number'
              variant='outlined'
              defaultValue='492' // TODO update to fetch actual prefix
              required
            />
            <TextField
              autoFocus
              required
              id='new-rubric-name-textfield'
              name='name'
              label='Name'
              fullwidth='true'
              defaultValue='Senior Design Project' // TODO update to fetch actual prefix
              variant='standard'
            />
            <FormControl>
              <InputLabel id='new-course-credits-label'>Credits</InputLabel>
              <Select
                labelId='new-course-credits-label'
                label='Credits'
                id='new-course-credits'
                value={3} // TODO update to fetch actual data
                onChange={handleNewCourseCreditChange}>
                <MenuItem value={1}>1</MenuItem>
                <MenuItem value={2}>2</MenuItem>
                <MenuItem value={3}>3</MenuItem>
                <MenuItem value={4}>4</MenuItem>
                <MenuItem value={5}>5</MenuItem>
                <MenuItem value={6}>6</MenuItem>
              </Select>
            </FormControl>
          </Stack>
          <Toolbar className='table-toolbar'>
            <Button variant='contained'>New Section</Button>
          </Toolbar>
          <TableContainer component={Paper}>
            <Table
              stickyHeader
              sx={{ minWidth: 650 }}
              aria-label='simple table'>
              <TableHead>
                <TableRow>
                  <TableCell align='center'>Section</TableCell>
                  <TableCell align='center'>Instructors</TableCell>
                  <TableCell align='center'>Teaching Assistants</TableCell>
                  <TableCell align='center'>Number of Students</TableCell>
                  <TableCell align='center'>Edit</TableCell>
                  <TableCell align='center'>Remove</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {rows.map((row) => (
                  <TableRow
                    key={row.number}
                    sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                    <TableCell component='th' scope='row' align='center'>
                      {row.number}
                    </TableCell>
                    <TableCell scope='row'>
                      <Stack
                        direction='row'
                        spacing={0}
                        justifyContent='center'>
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
                      <Stack
                        direction='row'
                        spacing={0}
                        justifyContent='center'>
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
        </Box>
      </Box>
    </ThemeProvider>
  );
}
