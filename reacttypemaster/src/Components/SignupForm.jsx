import React from 'react'
import { Box, Button, TextField } from '@mui/material'

const SignupForm = () => {
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
        <TextField
            variant='outlined'
            type='password'
            label='Confirm Password'
         >
        </TextField>
        <Button
            variant='contained'
            size='large'
            style={{background: 'red'}}
        >
            Signup
        </Button>
    </Box>
  )
}

export default SignupForm