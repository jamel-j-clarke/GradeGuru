import React, { useEffect, useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { ThemeProvider } from '@mui/material/styles';
import { Box, Toolbar, Breadcrumbs, Typography, Button } from '@mui/material';
import Nav from '../components/Nav';
import MyDraggableListV3 from '../components/MyDraggableListV3';
import useFetch from 'react-fetch-hook';

export default function ViewRubric({ customTheme }) {
  const { state } = useLocation();
  const { error, data, isLoading } = useFetch('/api/shib');
  const {
    error: rubErr,
    data: rubData,
    isLoading: rubIsLoading,
  } = useFetch(`/api/rubrics/${state.rubId}`);
  console.log(rubData);
  return (
    <ThemeProvider theme={customTheme}>
      <Box
        className='holder'
        sx={{ display: 'grid', gridTemplateColumns: '1fr 4fr' }}>
        <Nav
          userRoles={'Admin'}
          userName={!isLoading ? data['x-shib_displayname'] : 'loading'}
          userEmail={!isLoading ? data['x-shib_mail'] : 'loading'}
        />
        <Box component='main' sx={{ display: 'flex', flexDirection: 'column' }}>
          {/* <AppBar > */}
          <Toolbar id='toolbar' position='static'>
            <Breadcrumbs>
              <Typography
                variant='h6'
                component='div'
                sx={{ flexGrow: 1, color: 'white' }}>
                {!rubIsLoading ? rubData[0].rub_name : 'loading'}
              </Typography>
            </Breadcrumbs>
            {/* <Typography variant="h6" component="span" sx={{ flexGrow: 1 }}>
                            Spring 2024
                        </Typography> */}
            <Button variant='h6' disabled>
              Spring 2024
            </Button>
          </Toolbar>
          <MyDraggableListV3></MyDraggableListV3>
        </Box>
      </Box>
    </ThemeProvider>
  );
}
