import React , {useState} from 'react'
import { Box, Button, TextField } from '@mui/material'
import {auth} from '../firebaseConfig'
import errorMapping from '../utils/errorMessages'
import {useAlert} from '../Context/AlertContext'
import { useTheme } from '../Context/ThemeContext'

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
    const {theme} = useTheme();
  return (
    <Box
        p={3}
        style={{
            display: 'flex',
            flexDirection: 'column',
            gap: '20px',
            backgroundColor: 'transparent',
            padding: 10
        }}
    >
        <TextField
            variant='outlined'
            type='email'
            label='Enter Email'
            onChange={(e)=>setEmail(e.target.value)}
            InputLabelProps={
                {
                    style:{
                        color:theme.title
                    }
                }
            }
            InputProps={{
                style:{
                    color: theme.title
                }
            }}
        >

        </TextField>
        <TextField
            variant='outlined'
            type='password'
            label='Enter Password'
            onChange={(e)=>setPassword(e.target.value)}
              InputLabelProps={
                {
                    style:{
                        color:theme.title
                    }
                }
            }
            InputProps={{
                style:{
                    color: theme.title
                }
            }}
         >
        </TextField>
        <TextField
            variant='outlined'
            type='password'
            label='Confirm Password'
            onChange={(e)=>setConfirmPassword(e.target.value)}
            InputLabelProps={
                {
                    style:{
                        color:theme.title
                    }
                }
            }
            InputProps={{
                style:{
                    color: theme.title
                }
            }}
         >
        </TextField>
        <Button
            variant='contained'
            size='large'
            style={{background: theme.title, color: theme.background}}
            onClick={handleSubmit}
        >
            Signup
        </Button>
    </Box>
  )
}

export default SignupForm