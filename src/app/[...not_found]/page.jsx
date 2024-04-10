import Link from 'next/link'
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';

export default function NotFound() {
  return (
    <Box component="section" sx={{ p: 2, border: '1px dashed grey' }}>
      <h1>Not found – 404!</h1>
      <div >
        <Button variant="contained" href="/" color="inherit" sx={{border: '1px solid black',}}>
          Go Home
        </Button>
      </div>
    </Box>
  )
}