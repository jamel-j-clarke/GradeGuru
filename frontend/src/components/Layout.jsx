import { ThemeProvider } from '@mui/material/styles';
import Nav from '../components/Nav';
import { Box, Breadcrumbs, Button, Toolbar, Typography } from '@mui/material';
import { useState } from 'react';
import useFetchTrigger from './api/UseFetchTrigger';

export default function Layout({ title, children, customTheme }) {
  const [currentToolbarSemester, setCurrentToolbarSemester] = useState([]);

  const getActiveSemesterFetch = useFetchTrigger(
    'https://localhost/api/semesters/active',
    { onSuccess: (data) => setCurrentToolbarSemester(data) },
  );

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
                {title}
              </Typography>
            </Breadcrumbs>
            {currentToolbarSemester.season && currentToolbarSemester.year ? (
              <Button variant='h6' disabled>
                {`${currentToolbarSemester.season} ${currentToolbarSemester.year}`}
              </Button>
            ) : (
              'No semester active'
            )}
          </Toolbar>
          {children}
        </Box>
      </Box>
    </ThemeProvider>
  );
}
