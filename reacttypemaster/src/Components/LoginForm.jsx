import React from 'react'
import { Box, Button, TextField } from '@mui/material'

const LoginForm = () => {
  return (
    <Box>
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
        <Button>
            Login
        </Button>
    </Box>
  )
}

export default LoginForm