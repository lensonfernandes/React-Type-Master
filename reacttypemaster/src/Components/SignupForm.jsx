import React , {useState} from 'react'
import { Box, Button, TextField } from '@mui/material'
import {auth} from '../firebaseConfig'
import errorMapping from '../utils/errorMessages'
import {useAlert} from '../Context/AlertContext'

const SignupForm = ({handleClose}) => {

    const [email, setEmail] = useState('');
    const [password, setPassword]= useState('');
    const [confirmPassword, setConfirmPassword] = useState("");


    const {setAlert} = useAlert();


    const handleSubmit = () => {
        if(!email || !password || !confirmPassword){
            
            setAlert({
                open: true,
                type:'warning',
                message:"Please enter all fields"
            });
            return;
        }

        if(password !==confirmPassword)
        {
            
            setAlert({
                open: true,
                type:'warning',
                message:"Password mismatch"
            });
            return;
        }

        auth.createUserWithEmailAndPassword(email, password).then((ok)=>{
            // alert("user created");
            
            setAlert({
                open: true,
                type:'success',
                message:"Signup Successful"
            });
            handleClose();

        }).catch((err)=>{
            // alert('Unable to create account');
            // alert(errorMapping[err.code] || "Unknown error");

            setAlert({
                open: true,
                type:'error',
                message:errorMapping[err.code] || "Some error occured"
            });
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