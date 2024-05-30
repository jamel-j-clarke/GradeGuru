import {
  Button,
  IconButton,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Toolbar,
  Typography,
} from '@mui/material';
import {
  StaticTreeDataProvider,
  Tree,
  UncontrolledTreeEnvironment,
} from 'react-complex-tree';
import 'react-complex-tree/lib/style-modern.css';
import useFetch from 'react-fetch-hook';
import '../css/common.css';
import KeyboardArrowDown from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUp from '@mui/icons-material/KeyboardArrowUp';
import { useEffect, useMemo, useState } from 'react';
import MyDraggableList from './MyDraggableList';

export default function MyDraggableListV3({ headers, url, treeId }) {
  return (
    <div>
      <Toolbar className='flex flex-row gap-4'>
        <Button variant='contained'>Create</Button>
        <Button variant='contained'>Save</Button>
        <Button variant='contained'>Cancel</Button>
      </Toolbar>
      <MyDraggableList
        dataProvider={dataProvider}
        headers={headers}
        treeId={treeId}
      />
      {error ? (
        <>
          <Typography className='text-[#990000]'>
            {error.status + ': ' + error.statusText}
          </Typography>
        </>
      ) : (
        <></>
      )}
    </div>
  );
}
