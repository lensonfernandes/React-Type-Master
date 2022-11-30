import React, {useState} from 'react'
import { Box, Button, TextField } from '@mui/material'
import {auth} from '../firebaseConfig'
import {useAlert} from '../Context/AlertContext'
import errorMapping from '../utils/errorMessages'

const LoginForm = ({handleClose}) => {

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const {setAlert} = useAlert();

    const handleSubmit = () => {
        if(!email || !password)
        {
            setAlert({
                open: true,
                type:'warning',
                message:"Please enter all fields"
            });
            return;
        }
        auth.signInWithEmailAndPassword(email, password).then((ok)=>{
            setAlert({
                open: true,
                type:'success',
                message:"LogIn Successful"
            });
            handleClose();
        }).catch((err)=>{
            setAlert({
                open: true,
                type:'error',
                message:errorMapping[err.code] || "There was some error"
            });
            console.log(err);
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