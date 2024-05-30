import { KeyboardArrowDown, KeyboardArrowUp } from '@mui/icons-material';
import {
  Checkbox,
  FormControl,
  FormHelperText,
  IconButton,
  Input,
  InputAdornment,
  InputLabel,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TextField,
  Typography,
} from '@mui/material';
import { useState } from 'react';
import { Tree, UncontrolledTreeEnvironment } from 'react-complex-tree';

export default function MyDraggableList({ dataProvider, headers, treeId }) {
  const onDragAndDrop = (changedItemIds) => {
    const changedItems = changedItemIds.map((itemId) =>
      dataProvider.getTreeItem(itemId),
    );
    Promise.all(changedItems).then((treeItems) => {
      treeItems.forEach((item) => {
        item.children.length === 0
          ? (item.isFolder = false)
          : (item.isFolder = true);
      });
    });
  };
  dataProvider.onDidChangeTreeData(onDragAndDrop);
  return (
    <UncontrolledTreeEnvironment
      dataProvider={dataProvider}
      getItemTitle={(item) => null}
      viewState={{}}
      onSelectItems={(items) => {
        const selectedItems = items.map((itemId) =>
          dataProvider.getTreeItem(itemId),
        );
        Promise.all(selectedItems).then((treeItems) =>
          treeItems.forEach((item) => (item.selected = true)),
        );
      }}
      // defaultInteractionMode={'click-arrow-to-expand'}
      canDragAndDrop={true}
      canDropOnFolder={true}
      canDropOnNonFolder={true}
      canReorderItems={true}
      renderItemArrow={arrowView}
      renderItem={(props) => rowView({ ...props, headers })}
      renderItemsContainer={itemContainerView}
      renderTreeContainer={(props) => tableView({ ...props, headers })}
      renderLiveDescriptorContainer={() => <></>}>
      <Tree treeId={treeId} rootItem='root' />
    </UncontrolledTreeEnvironment>
  );
}

const arrowView = ({ item, context }) =>
  item.isFolder ? (
    <IconButton size='small' className='mr-2'>
      {context.isExpanded ? <KeyboardArrowUp /> : <KeyboardArrowDown />}
    </IconButton>
  ) : (
    <IconButton size='small' disabled className='mr-2'>
      <KeyboardArrowUp className='fill-transparent' />
    </IconButton>
  );

const tableView = ({ children, containerProps, headers }) => (
  <TableContainer component={Paper}>
    <Table sx={{ minWidth: 650 }} aria-label='simple table'>
      <TableHead>
        <TableRow>
          {headers.map((header) => (
            <TableCell key={header.headerName} align={header.align}>
              <Typography>{header.headerName}</Typography>
            </TableCell>
          ))}
        </TableRow>
      </TableHead>
      <TableBody {...containerProps}>{children}</TableBody>
    </Table>
  </TableContainer>
);

const itemContainerView = ({ children, containerProps }) => <>{children}</>;

const rowView = ({ arrow, depth, context, children, item, headers }) => (
  <>
    <TableRow
      key={item.index}
      {...context.itemContainerWithChildrenProps}
      {...context.interactiveElementProps}
      className={'[&>*]:py-2' + (context.isSelected ? ' bg-[#bbb]' : '')}>
      {headers.map((header, i) => {
        let inputType, inputEndAdornment, inputProps, inputElement;
        switch (header.type) {
          case 'percent':
            inputType = 'number';
            inputProps = {
              min: 0,
              max: 100,
            };
            inputEndAdornment = (
              <InputAdornment position='end'>%</InputAdornment>
            );
            break;
          case 'points':
            inputType = 'number';
            inputEndAdornment = (
              <InputAdornment position='end'>pts</InputAdornment>
            );
            break;
          case 'text':
            inputType = 'text';
            break;
          case 'button':
            break;
          case 'check':
            break;
          default:
            console.error('Unknown header type', header.type);
            return (
              <TableCell
                key={header.headerName}
                {...context.itemContainerWithoutChildrenProps}>
                Unknown header type: {header.type}
              </TableCell>
            );
        }
        switch (header.type) {
          case 'percent':
          case 'points':
          case 'text':
            inputElement = (
              <FormControl variant='standard' className='h-min w-max'>
                <MyInput
                  header={header}
                  type={inputType}
                  inputProps={inputProps}
                  endAdornment={inputEndAdornment}
                  item={item}
                />
              </FormControl>
            );
            break;
          case 'button':
            inputElement = <MyIconButton header={header} item={item} />;
            break;
          case 'check':
            inputElement = <MyCheckbox header={header} item={item} />;
            break;
          default:
            console.error('Unknown header type', header.type);
        }
        if (i === 0) {
          return (
            <TableCell
              key={header.headerName}
              className='flex flex-row bg-transparent items-center pl-2'
              align={header.align}
              {...context.itemContainerWithoutChildrenProps}>
              {[...Array(depth).keys()].map((i) => (
                <div key={i} className={`w-[16px]`} />
              ))}
              {arrow}
              {inputElement}
              <Typography>
                {item.children.length != 0 ? `(${item.children.length})` : ''}
              </Typography>
            </TableCell>
          );
        } else {
          return (
            <TableCell
              key={header.headerName}
              align={header.align}
              {...context.itemContainerWithoutChildrenProps}>
              {inputElement}
            </TableCell>
          );
        }
      })}
    </TableRow>
    {children}
  </>
);

function MyInput({ header, type, inputProps, endAdornment, item, required }) {
  const [value, setValue] = useState(item.data[header.field]);
  const [error, setError] = useState(false);
  const handleChange = (e) => {
    if (required) {
      setError(!e.target.value);
    }
    setValue(e.target.value);
    item.data[header.field] = e.target.value;
  };
  return (
    <FormControl>
      <Input
        className={error ? 'text-[#bf3831]' : ''}
        type={type}
        inputProps={inputProps}
        endAdornment={endAdornment}
        onChange={handleChange}
        value={value}
        error={error}
        placeholder={header.headerName}
        readOnly={!header.editable(item.data)}
        onClick={(e) => e.stopPropagation()}
        onFocus={(e) => e.stopPropagation()}
        onKeyUp={(e) => e.stopPropagation()}
        onKeyDown={(e) => e.stopPropagation()}
        onKeyUpCapture={(e) => e.stopPropagation()}
        onKeyDownCapture={(e) => e.stopPropagation()}
      />
    </FormControl>
  );
}

function MyIconButton({ header, item }) {
  return (
    <IconButton
      onClick={(event) => {
        event.stopPropagation();
        header.onClick(event, item.data);
      }}>
      {header.icon}
    </IconButton>
  );
}

function MyCheckbox({ header, item }) {
  const [value, setValue] = useState(item.data[header.field]);

  return (
    <Checkbox
      checked={value}
      onChange={(event) => setValue(event.target.checked)}
    />
  );
}
