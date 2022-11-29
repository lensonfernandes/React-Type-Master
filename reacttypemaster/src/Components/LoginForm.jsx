import React from 'react'
import { Box, Button, TextField } from '@mui/material'

const LoginForm = () => {
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
        >

        </TextField>
        <TextField
            variant='outlined'
            type='password'
            label='Enter Password'
         >
        </TextField>
        <Button
            variant='contained'
            size='large'
            style={{background: 'red'}}
        >
            Login
        </Button>
    </Box>
  )
}

export default LoginForm