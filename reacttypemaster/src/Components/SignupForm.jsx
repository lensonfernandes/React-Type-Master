import React , {useState} from 'react'
import { Box, Button, TextField } from '@mui/material'
import {auth} from '../firebaseConfig'

const SignupForm = ({handleClose}) => {

    const [email, setEmail] = useState('');
    const [password, setPassword]= useState('');
    const [confirmPassword, setConfirmPassword] = useState("");


    const handleSubmit = () => {
        if(!email || !password || !confirmPassword){
            alert("Enter All Details");
            return;
        }

        if(password !==confirmPassword)
        {
            alert("Password mismatch")
            return;
        }

        auth.createUserWithEmailAndPassword(email, password).then((ok)=>{
            alert("user created");
            handleClose();

        }).catch((err)=>{
            alert('Unable to create account');
        })
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
            onChange={(e)=>setEmail(e.target.value)}
        >

        </TextField>
        <TextField
            variant='outlined'
            type='password'
            label='Enter Password'
            onChange={(e)=>setPassword(e.target.value)}
         >
        </TextField>
        <TextField
            variant='outlined'
            type='password'
            label='Confirm Password'
            onChange={(e)=>setConfirmPassword(e.target.value)}
         >
        </TextField>
        <Button
            variant='contained'
            size='large'
            style={{background: 'red'}}
            onClick={handleSubmit}
        >
            Signup
        </Button>
    </Box>
  )
}

export default SignupForm