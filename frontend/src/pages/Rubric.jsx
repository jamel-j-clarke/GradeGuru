import { React, useEffect, useMemo, useRef, useState } from 'react';
import { Box, Typography } from '@mui/material';
import Toolbar from '@mui/material/Toolbar';
import Breadcrumbs from '@mui/material/Breadcrumbs';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import { ThemeProvider } from '@mui/material/styles';
import Nav from '../components/Nav';
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
import { useNavigate } from 'react-router-dom';
import useFetch from 'react-fetch-hook';
import '../css/common.css';
import MyDraggableList from '../components/MyDraggableList';
import { StaticTreeDataProvider } from 'react-complex-tree';

export default function Rubric({ customTheme }) {
  // kevin's original testing code
  // const [name, setName] = useState();
  const nameRef = useRef(null);
  const [idCounter, setIdCounter] = useState(0);
  // const [isDisplayed, setIsDisplayed] = useState(true);

  const createBlankRubric = (e) => {
    const reqOptions = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        course: 1,
        name: nameRef.current.value,
      }),
    };

    fetch('/api/rubrics/', reqOptions)
      .then(() => {
        setName(nameRef.current.value);
        console.log('isDisplayed', !isDisplayed);
        setIsDisplayed(!isDisplayed);
      })
      .catch((err) => {
        alert(`Here's what went wrong: ${err}`);
        e.preventDefault();
      });
  };

  // jamel's new code
  const [open, setOpen] = useState(false);

  const handleDialogClose = () => {
    setOpen(false);
  };

  const rubricHeaders = [
    {
      field: 'title',
      headerName: 'Name',
      type: 'text',
      align: 'left',
      editable: () => true,
    },
    {
      field: 'description',
      headerName: 'Description',
      type: 'text',
      align: 'left',
      editable: () => true,
    },
    {
      field: 'weight',
      headerName: 'Weight',
      type: 'percent',
      align: 'right',
      editable: () => true,
    },
    {
      field: 'points',
      headerName: 'Points',
      type: 'points',
      align: 'right',
      editable: () => true,
    },
  ];

  const treeData = useMemo(
    () => ({
      root: {
        index: 'root',
        children: [],
      },
    }),
    [],
  );

  const onNewRubricClick = () => {
    setOpen(true);
  };

  const onSaveClick = () => {
    console.log('treeData', treeData);
  };

  const dataProvider = useMemo(
    () =>
      new StaticTreeDataProvider(treeData, (item, title) => ({
        ...item,
        title,
      })),
    [treeData],
  );

  const url = 'https://localhost/api/rubrics';
  const { data, isLoading, error } = useFetch(url);
  useEffect(() => {
    // if (!isLoading && !error) {
    if (!isLoading) {
      console.log('data', data);
      treeData.root.children = ['id_0', 'id_2'];
      let localIdCounter = 0;
      treeData['id_' + localIdCounter] = {
        index: 'id_' + localIdCounter++,
        isFolder: true,
        children: ['id_1'],
        canMove: true,
        data: {
          title: 'rubric7',
          description: 'hi',
          weight: 10,
          points: 10,
        },
      };
      treeData['id_' + localIdCounter] = {
        index: 'id_' + localIdCounter++,
        isFolder: false,
        children: [],
        canMove: true,
        data: {
          title: 'rubric6',
          description: 'hi',
          weight: 10,
          points: 10,
        },
      };
      treeData['id_' + localIdCounter] = {
        index: 'id_' + localIdCounter++,
        isFolder: false,
        children: [],
        canMove: true,
        data: {
          title: 'rubric5',
          description: 'hi',
          weight: 10,
          points: 10,
        },
      };
      setIdCounter(localIdCounter);
      dataProvider.onDidChangeTreeDataEmitter.emit(['root']);
    } else {
      console.log('Loading', url, isLoading);
    }
  }, [isLoading]);

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
                Active Rubrics
              </Typography>
            </Breadcrumbs>
            <Button variant='h6' disabled>
              Spring 2024
            </Button>
          </Toolbar>
          <Toolbar className='table-toolbar gap-4'>
            <Button onClick={onNewRubricClick} variant='contained'>
              New Rubric
            </Button>
            <Button onClick={onSaveClick} variant='contained'>
              Save
            </Button>
          </Toolbar>
          <MyDraggableList
            headers={rubricHeaders}
            treeId='tree-1'
            dataProvider={dataProvider}
          />
          <Dialog
            className='dialog'
            open={open}
            onClose={handleDialogClose}
            PaperProps={{
              component: 'form',
              onSubmit: createBlankRubric,
            }}>
            <DialogTitle>New Rubric Name</DialogTitle>
            <DialogContent>
              <TextField
                autoFocus
                required
                id='new-rubric-name-textfield'
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
        </Box>
      </Box>
    </ThemeProvider>
  );

// return (
//   <main>
//     <ThemeProvider theme={customTheme}>
//       <CssBaseline />
//       <div
//         id='myModal'
//         style={{
//           style: 'flex',
//           justifyContent: 'center',
//           alignContent: 'center',
//           position: 'fixed',
//           paddingTop: '100px',
//           left: '0',
//           top: '0',
//           width: '100%',
//           height: '100%',
//           color: 'rgb(0,0,0)',
//           backgroundColor: 'rgba(0,0,0,0.4)',
//         }}>
//         <div
//           className={isDisplayed ? '' : 'hidden'}
//           style={{
//             backgroundColor: customTheme.palette.background.paper,
//             maxWidth: '40%',
//             marginLeft: '35%',
//             maxHeight: '80%',
//           }}>
//           <button style={{ marginLeft: '90%' }} onClick={() => navigate('/')}>
//             &times;
//           </button>
//           <h2 style={{ textAlign: 'center' }}>Enter New Rubric Name</h2>
//           <input type='text' ref={nameRef} id='RubName' required></input>
//           <button
//             type='submit'
//             style={{
//               backgroundColor: customTheme.palette.primary.main,
//               width: '40%',
//               marginLeft: '50%',
//             }}
//             onClick={createBlankRubric}>
//             Confirm
//           </button>
//         </div>
//       </div>
//     </ThemeProvider>
//   </main>
// );
}
