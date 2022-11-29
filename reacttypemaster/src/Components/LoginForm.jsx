import React, {useState} from 'react'
import { Box, Button, TextField } from '@mui/material'

const LoginForm = () => {

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleSubmit = () => {
        if(!email || !password)
        {
            alert("Enter all details");
            return;
        }
        console.log(email, password);
    }

  return (
    <Box
        p={3}
        style={{
            display: 'flex',
            flexDirection: 'column',
            gap: '20px',
            backgroundColor: 'white',
            padding: 10
        }}
    >
        <TextField
            variant='outlined'
            type='email'
            label='Enter Email'
            onChange={(e) => setEmail(e.target.value)}
        >

        </TextField>
        <TextField
            variant='outlined'
            type='password'
            label='Enter Password'
            onChange={(e) => setPassword(e.target.value)}
         >
        </TextField>
        <Button
            variant='contained'
            size='large'
            style={{background: 'red'}}
            onClick={handleSubmit}
        >
            Login
        </Button>
    </Box>
  )
}

export default LoginForm