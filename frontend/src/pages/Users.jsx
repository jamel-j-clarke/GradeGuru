import { Box, Typography } from '@mui/material';
import Toolbar from '@mui/material/Toolbar';
import Breadcrumbs from '@mui/material/Breadcrumbs';
import Button from '@mui/material/Button';
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
import PropTypes from 'prop-types';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Nav from '../components/Nav';

import '../css/common.css';
import CourseCoordinators from '../components/users/CourseCoordinators';
import SystemAdministrators from '../components/users/SystemAdministrators';

export default function Users({ customTheme }) {
  function CustomTabPanel(props) {
    const { children, value, index, ...other } = props;

    return (
      <div
        role='tabpanel'
        hidden={value !== index}
        id={`simple-tabpanel-${index}`}
        aria-labelledby={`simple-tab-${index}`}
        {...other}>
        {value === index && <Box>{children}</Box>}
      </div>
    );
  }

  CustomTabPanel.propTypes = {
    children: PropTypes.node,
    index: PropTypes.number.isRequired,
    value: PropTypes.number.isRequired,
  };

  function a11yProps(index) {
    return {
      id: `simple-tab-${index}`,
      'aria-controls': `simple-tabpanel-${index}`,
    };
  }

  const [value, setValue] = useState(0);

  const handleTabChange = (event, newValue) => {
    setValue(newValue);
  };

  const [credits, setCredits] = useState(false);

  const handleNewCourseCreditChange = (event) => {
    setCredits(event.target.value);
  };

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
                Users
              </Typography>
            </Breadcrumbs>
            <Button variant='h6' disabled>
              Spring 2024
            </Button>
          </Toolbar>
          <Tabs
            value={value}
            onChange={handleTabChange}
            variant='scrollable'
            scrollButtons='auto'
            aria-label='course tabs'>
            <Tab label='System Administrators' {...a11yProps(0)} />
            <Tab label='Course Coordinators' {...a11yProps(1)} />
          </Tabs>
          <CustomTabPanel value={value} index={0}>
            <SystemAdministrators />
          </CustomTabPanel>
          <CustomTabPanel value={value} index={1}>
            <CourseCoordinators />
          </CustomTabPanel>
        </Box>
      </Box>
    </ThemeProvider>
  );
}
