"use client"
import { useState } from "react"
import * as React from 'react';
import Backdrop from '@mui/material/Backdrop';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import Fade from '@mui/material/Fade';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import AddIcon from '@mui/icons-material/Add';
import TextField from '@mui/material/TextField';
import { ADD_CLIENT } from '@/mutations/clients'
import {GET_CLIENTS} from '@/queries/clientQueries'
import { useMutation } from "@apollo/client";

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: '60vw',
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
  display: 'flex',
  flexDirection: 'column',
  gap: '20px',

};

const AddClientModal = () => {
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');

  // add client
  const [addClient] = useMutation(ADD_CLIENT, {
    variables: { name, email, phone },
    update(cache, { data: { addClient } }) {
      const { clients } = cache.readQuery({
        query: GET_CLIENTS,
      });
      cache.writeQuery({
        query: GET_CLIENTS,
        data: { clients: [...clients, addClient] },
      });
    },
  });
  

  const onSubmit = (e) => {
    e.preventDefault();
    console.log(name, email, phone);

    if (name === '' || email === '' || phone === '') {
      return alert('Please fill all fields');
    }

    addClient();

    setName('');
    setEmail('');
    setPhone('');

    handleClose();
  }

  return (
    <div>
      <Button
        variant="contained"
        disableElevation
        color="primary"
        startIcon={<AddIcon />}
        size="small"
        onClick={handleOpen}
      >
        Add Client
      </Button>
      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        open={open}
        onClose={handleClose}
        closeAfterTransition
        slots={{ backdrop: Backdrop }}
        slotProps={{
          backdrop: {
            timeout: 500,
          },
        }}
      >
        <Fade in={open}>
          <form action="" onSubmit={onSubmit}>
            <Box sx={style}>
              <Typography id="transition-modal-title" variant="h6" component="h2">
                Add client
              </Typography>
              <TextField fullWidth label="Name" id="fullWidth" value={name} onChange={e => setName(e.target.value)} />
              <TextField fullWidth label="Email" id="fullWidth" value={email} onChange={e => setEmail(e.target.value)} />
              <TextField fullWidth label="Phone" id="fullWidth" value={phone} onChange={e => setPhone(e.target.value)} />
              <Button
                type="submit"
                variant="contained"
                disableElevation
                color="primary"
                startIcon={<AddIcon />}
                size="large"
                onClick={handleOpen}
              >
                Add
              </Button>
            </Box>
          </form>
        </Fade>
      </Modal>
    </div>
  );
}

export default AddClientModal