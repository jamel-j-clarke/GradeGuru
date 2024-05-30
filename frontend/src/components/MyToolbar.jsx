import { Button, Toolbar } from '@mui/material';

export default function MyToolbar({ buttons }) {
  return (
    <Toolbar className='flex flex-row gap-4'>
      {buttons.map(({ text, onClick }) => (
        <Button key={text} variant='contained' onClick={onClick}>
          {text}
        </Button>
      ))}
    </Toolbar>
  );
}
