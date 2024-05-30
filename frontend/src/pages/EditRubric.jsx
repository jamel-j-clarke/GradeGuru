import { useState, React, useMemo } from 'react';
import Toolbar from '@mui/material/Toolbar';
import Button from '@mui/material/Button';
import '../css/common.css';
import MyDraggableList from '../components/MyDraggableList';
import { StaticTreeDataProvider } from 'react-complex-tree';
import EditIcon from '@mui/icons-material/Edit';
import AddBoxIcon from '@mui/icons-material/AddBox';
import DeleteIcon from '@mui/icons-material/Delete';
import { useLocation, useParams } from 'react-router-dom';
import useFetchTrigger from '../components/api/UseFetchTrigger';
import MyDialog from '../components/MyDialog';
import Layout from '../components/Layout';

export default function EditRubric({ customTheme }) {
  // const urlParams = useParams();
  const { state } = useLocation();
  const [postItemDialogOpen, setPostItemDialogOpen] = useState(false);
  const [postItemDialogState, setPostItemDialogState] = useState({
    name: undefined,
  });

  const postItemFetch = useFetchTrigger('https://localhost/api/items', {
    method: 'post',
    data: {
      rubricId: state.rubricId,
      itemName: postItemDialogState.name,
      weight: 0,
      points: 0,
      description: '',
      parentId: 0,
    },
    onSuccess: () => getRubricItemsFetch.trigger(),
    fetchOnLoad: false,
  });

  const treeData = useMemo(
    () => ({
      root: {
        index: 'root',
        children: [],
      },
    }),
    [],
  );

  const getRubricItemsFetch = useFetchTrigger(
    `https://localhost/api/items/rubric/${state.rubricId}`,
    {
      onSuccess: (data) => {
        treeData.root.children = [];

        let items = data.map((item) => {
          const treeItem = {
            index: item.item_id.toString(),
            isFolder: false,
            children: [],
            canMove: true,
            data: {
              id: item.item_id,
              parent_id: item.parent_id,
              title: item.item_name,
              description: item.item_desc,
              weight: item.item_wgt,
              points: item.available_pts,
            },
          };

          return treeItem;
        });

        items = items.map((item) => {
          // TODO scan for children
          return item;
        });

        items.forEach((item) => {
          treeData[item.index] = item;
          if (item.data.parent_id === 0)
            treeData.root.children.push(item.index);
        });

        console.log('Treedata', treeData);

        dataProvider.onDidChangeTreeDataEmitter.emit(['root']);
      },
    },
  );

  const dataProvider = useMemo(
    () =>
      new StaticTreeDataProvider(treeData, (item, title) => ({
        ...item,
        title,
      })),
    [treeData],
  );

  return (
    <>
      <Layout title='Active Rubrics' customTheme={customTheme}>
        <Toolbar className='table-toolbar'>
          <Button
            onClick={() => setPostItemDialogOpen(true)}
            variant='contained'>
            New Rubric
          </Button>
        </Toolbar>

        <MyDraggableList
          dataProvider={dataProvider}
          headers={itemHeaders}
          treeId='edit-rubric-tree'
        />
      </Layout>

      <MyDialog
        title='New Course Rubric'
        isOpen={postItemDialogOpen}
        setIsOpen={setPostItemDialogOpen}
        onSubmit={() => postItemFetch.trigger()}
        propsToFill={[
          {
            label: 'Name',
            type: 'textfield',
            onChange: (event) =>
              setPostItemDialogState(
                (prev) => ((prev.name = event.target.value), prev),
              ),
            isRequired: true,
          },
        ]}
      />
    </>
  );
}

const itemHeaders = [
  {
    field: 'name',
    headerName: 'Name',
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
  {
    field: 'isOptional',
    headerName: 'Optional?',
    type: 'check',
    align: 'center',
    editable: () => true,
  },
  {
    field: 'isExtraCredit',
    headerName: 'Extra Credit?',
    type: 'check',
    align: 'center',
    editable: () => true,
  },
  {
    field: 'description',
    headerName: 'Add Description',
    align: 'center',
    type: 'button',
    icon: <EditIcon />,
    onClick: (event, data) => {},
    editable: () => true,
  },
  {
    headerName: 'Remove',
    align: 'center',
    type: 'button',
    icon: <DeleteIcon />,
    onClick: (event, data) => {},
    editable: () => true,
  },
  {
    headerName: 'Add Child',
    align: 'center',
    type: 'button',
    icon: <AddBoxIcon />,
    onClick: (event, data) => {},
    editable: () => true,
  },
];
