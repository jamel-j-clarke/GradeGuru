import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { Box, Modal, TextField, Typography, Autocomplete } from '@mui/material';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Breadcrumbs from '@mui/material/Breadcrumbs';
import Button from '@mui/material/Button';
import { ThemeProvider } from '@mui/material/styles';
import { DataGrid } from '@mui/x-data-grid';
import Nav from '../components/Nav';
import useFetch from 'react-fetch-hook';
// import MyDraggableList from '../components/MyDraggableList';
import MyDraggableListV3 from '../components/MyDraggableListV3';
import '../css/common.css';
import { StaticTreeDataProvider } from 'react-complex-tree';
import MyDraggableList from '../components/MyDraggableList';

export default function Overview({ customTheme }) {
  const [open, setOpen] = useState(false);
  const [name, setName] = useState(false);
  const [type, setType] = useState(false);

  const { error, data, isLoading } = useFetch('/api/shib');
  const { state } = useLocation();
  const navigate = useNavigate();
  const [idCounter, setIdCounter] = useState(0);
  const [rubRows, setRubRows] = useState([]);

  // const {
  //   error: rubError,
  //   data: rubData,
  //   isLoading: rubIsLoading,
  // } = useFetch(`/api/rubrics/courses/${state.courseId}`);

  // useEffect(() => {
  //   if (!rubIsLoading) {
  //     setRubRows(
  //       rubData.map((rub) => ({
  //         id: idCounter,
  //         db_id: rub.rub_id,
  //         rub_name: rub.rub_name,
  //       })),
  //     );
  //     setIdCounter((prev) => prev + 1);
  //   }
  // }, [rubIsLoading]);

  const rubCols = [
    {
      field: 'rub_name',
      headerName: 'Name',
      headerClassName: 'view-rubrics',
      width: 100,
      editable: true,
      sortable: true,
    },
  ];

  const assignCols = [
    {
      field: 'assign_name',
      headerName: 'Name',
      headerClassName: 'view-assignments',
      width: 100,
      editable: true,
      sortable: true,
    },
    {
      field: 'assign_desc',
      headerName: 'Description',
      headerClassName: 'view-assignments',
      width: 300,
      editable: true,
      sortable: true,
    },
    {
      field: 'sec_number',
      headerName: 'Section',
      headerClassName: 'view-assignments',
      width: 100,
      editable: true,
      sortable: true,
    },
  ];

  const addRubric = () => {
    fetch(`api/rubrics/`, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        name: name,
        courseId: state.courseId,
        type: type,
      }),
    }).then((res) => {
      if (!res.ok) {
        alert('Invalid Rubric');
        res.text().then((result) => console.log(result));
      } else {
        res.json().then((resObject) => {
          console.log('resObject', resObject);
          setRubRows([
            ...rubRows,
            {
              id: idCounter,
              db_id: resObject.success,
              rub_name: name,
            },
          ]);
          setIdCounter((prev) => prev + 1);
          setName('');
          setType('');
          handleClose();
        });
      }
    });
  };

  const handleRowClick = (params) => {
    const id = state.courseId;
    navigate('/viewRubric', {
      state: { courseId: id, rubId: params.row.db_id },
    });
  };

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <ThemeProvider theme={customTheme}>
      <Modal open={open} onClose={handleClose}>
        <Box
          sx={{
            maxWidth: '40%',
            maxHeight: '10%',
            backgroundColor: customTheme.palette.background.default,
            boxShadow: 24,
            textAlign: 'center',
            display: 'flex',
            flexDirection: 'column',
            marginLeft: '30%',
            marginTop: '20%',
            position: 'absolute',
          }}>
          <Typography variant='h5'>Create Rubric</Typography>
          <Box
            sx={{
              display: 'flex',
              backgroundColor: customTheme.palette.background.default,
            }}>
            <TextField
              id='name'
              label='Name'
              variant='filled'
              onChange={(e) => setName(e.target.value)}
            />
            <Autocomplete
              disablePortal
              id='type'
              options={[{ label: 'Course' }, { label: 'Section' }]}
              defaultValue={{ label: 'Course' }}
              sx={{ width: 300 }}
              renderInput={(params) => (
                <TextField {...params} variant='filled' label='Type' />
              )}
            />
          </Box>
          <Box sx={{ backgroundColor: customTheme.palette.background.default }}>
            <Button
              variant='h6'
              sx={{
                backgroundColor: customTheme.palette.primary.main,
                maxWidth: '25%',
              }}
              onClick={addRubric}>
              Submit
            </Button>
          </Box>
        </Box>
      </Modal>

      <Box
        className='holder'
        sx={{ display: 'grid', gridTemplateColumns: '1fr 4fr' }}>
        <Nav
          userRoles={['Admin']}
          userName={!isLoading ? data['x-shib_displayname'] : 'loading'}
          userEmail={!isLoading ? data['x-shib_mail'] : 'loading'}
        />
        <Box component='main' sx={{ display: 'flex', flexDirection: 'column' }}>
          <Toolbar id='toolbar' position='static'>
            <Breadcrumbs>
              <Typography
                variant='h6'
                component='div'
                sx={{ flexGrow: 1, color: 'white' }}>
                Overview
              </Typography>
            </Breadcrumbs>
            <Button variant='h6' disabled>
              Spring 2024
            </Button>
          </Toolbar>
          <Typography sx={{ paddingRight: '50%' }}>Assignments</Typography>
          <DataGrid
            rows={[]}
            columns={assignCols}
            initialState={{
              pagination: {
                paginationModel: {
                  pageSize: 5,
                },
              },
            }}
            pageSizeOptions={[5]}
            checkboxSelection={true}
          />
          <Box sx={{ display: 'flex' }}>
            <Typography sx={{ paddingRight: '75%' }}>Rubrics</Typography>
            <Button
              variant='h6'
              sx={{ backgroundColor: customTheme.palette.primary.main }}
              onClick={handleClickOpen}>
              Add Rubric
            </Button>
          </Box>
          <DataGrid
            rows={rubRows}
            columns={rubCols}
            onRowClick={handleRowClick}
            {...data}
            initialState={{
              pagination: {
                paginationModel: {
                  pageSize: 5,
                },
              },
            }}
            pageSizeOptions={[5]}
            checkboxSelection={true}
          />
        </Box>
      </Box>
    </ThemeProvider>
  );
}
