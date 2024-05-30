import {
  Box,
  Drawer,
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Typography,
} from '@mui/material';
import DashboardIcon from '@mui/icons-material/Dashboard';
import ChecklistIcon from '@mui/icons-material/Checklist';
import ArchiveIcon from '@mui/icons-material/Archive';
import DescriptionIcon from '@mui/icons-material/Description';
import InventoryIcon from '@mui/icons-material/Inventory';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import TabIcon from '@mui/icons-material/Tab';
import PeopleIcon from '@mui/icons-material/People';
import Toolbar from '@mui/material/Toolbar';
import Divider from '@mui/material/Divider';
import Link from '@mui/material/Link';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import { useEffect, useState } from 'react';
import '../css/Nav.css';
import useFetch from 'react-fetch-hook';
import semesterAPI from '../api_clients/APISemesterClient';

export default function Nav({ userRoles, userName, userEmail }) {
  let { data, isLoading, error } = useFetch('https://localhost/api/shib');
  const [activeSemester, setActiveSemester] = useState({
    id: undefined,
    season: undefined,
    year: undefined,
    active: undefined,
  });
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    async function fetchData() {
      setLoading(true);
      semesterAPI
        .getActiveSemester()
        .then((activeSemester) => {
          setActiveSemester({
            id: activeSemester.id,
            season: activeSemester.season,
            year: activeSemester.year,
            active: activeSemester.active,
          });
        })
        .finally(() => {
          setLoading(false);
        });
    }
    fetchData();
  }, []);

  const currentUserRoles = userRoles;
  let isTA = currentUserRoles.indexOf('TA') != -1;
  let isInstructor = currentUserRoles.indexOf('Instructor') != -1;
  let isCourseCoordinator =
    currentUserRoles.indexOf('Course Coordinator') != -1;
  let isSystemAdmin = currentUserRoles.indexOf('System Administrator') != -1;
  const DrawerList = (
    <>
      <Box id='sidebar-buttons'>
        <List>
          <ListItemButton href='/overview'>
            <ListItemIcon className='icon'>
              <DashboardIcon />
            </ListItemIcon>
            <ListItemText primary='Dashboard' />
          </ListItemButton>
          {
            <ListItemButton
              href={`/${activeSemester.year}/${activeSemester.season}`}>
              <ListItemIcon className='icon'>
                <InventoryIcon />
              </ListItemIcon>
              <ListItemText primary='Courses' />
            </ListItemButton>
          }
          {isSystemAdmin && (
            <ListItemButton href='/semesters'>
              <ListItemIcon className='icon'>
                <CalendarMonthIcon />
              </ListItemIcon>
              <ListItemText primary='Semesters' />
            </ListItemButton>
          )}
          {isSystemAdmin && (
            <ListItemButton href='/users'>
              <ListItemIcon className='icon'>
                <PeopleIcon />
              </ListItemIcon>
              <ListItemText primary='Users' />
            </ListItemButton>
          )}
        </List>
      </Box>
      <div className='white-space'></div>
    </>
  );

  return (
    <>
      <Drawer
        id='sidebar'
        variant='permanent'
        anchor='left'
        PaperProps={{
          sx: { position: 'relative' },
        }}>
        <Toolbar id='sidebar-toolbar' layout='column'>
          <Link
            id='sdc-sidebar-title'
            href='https://sdc.csc.ncsu.edu/'
            element='a'
            noWrap
            component='a'>
            Senior Design Center
          </Link>
          <Box id='sidebar-user-info'>
            <Typography id='sidebar-name' noWrap component='div'>
              {isLoading || error ? 'loading' : data['x-shib_displayname']}
            </Typography>
            <Typography id='sidebar-email' noWrap component='div'>
              {isLoading || error ? '' : data['x-shib_mail']}
            </Typography>
          </Box>
        </Toolbar>
        <Divider />
        {DrawerList}
      </Drawer>
    </>
  );
}
