import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import {
  Autocomplete,
  Button,
  Dialog,
  FormControl,
  InputLabel,
  Select,
  TextField,
} from '@mui/material';

export default function MyDialog({
  title,
  isOpen,
  setIsOpen,
  onSubmit,
  propsToFill,
}) {
  return (
    <Dialog
      className='dialog'
      open={isOpen}
      onClose={(e) => {
        e.preventDefault();
        e.stopPropagation();
        setIsOpen(false);
      }}
      PaperProps={{
        component: 'form',
        onSubmit: (e) => {
          e.preventDefault();
          e.stopPropagation();
          onSubmit();
          setIsOpen(false);
        },
      }}>
      <DialogTitle>{title}</DialogTitle>
      <DialogContent>
        {propsToFill.map(
          ({
            label,
            type,
            onChange,
            isRequired,
            value: defaultValue,
            options,
          }) => {
            switch (type) {
              case 'autocomplete':
                // TODO Add props validation for options
                return (
                  <Autocomplete
                    disablePortal
                    className='dialog-item'
                    variant='outlined'
                    required={isRequired}
                    options={options}
                    defaultValue={defaultValue}
                    onChange={onChange}
                    renderInput={(params) => (
                      <TextField {...params} label={label} />
                    )}
                  />
                );
              case 'select':
                return (
                  <FormControl key={onChange}>
                    <InputLabel id={onChange}>{label}</InputLabel>
                    <Select
                      labelId={onChange}
                      label={label}
                      defaultValue={defaultValue}
                      onChange={onChange}
                      required={isRequired}>
                      {options}
                    </Select>
                  </FormControl>
                );
              case 'textfield':
                return (
                  <TextField
                    key={onChange}
                    autoFocus
                    label={label}
                    fullwidth='true'
                    defaultValue={defaultValue}
                    onChange={onChange}
                    required={isRequired}
                  />
                );
              default:
                throw new Error('Unknown dialog type: ', type);
            }
          },
        )}
      </DialogContent>
      <DialogActions className='dialog-actions'>
        <Button onClick={() => setIsOpen(false)} variant='outlined'>
          Cancel
        </Button>
        <Button type='submit' variant='filled'>
          Save
        </Button>
      </DialogActions>
    </Dialog>
  );
}
