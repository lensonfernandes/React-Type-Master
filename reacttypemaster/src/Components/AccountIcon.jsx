import React from "react";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import { AppBar, Modal, Tab, Tabs, Box } from "@mui/material";
import { useState } from "react";
import { makeStyles } from "@mui/styles";
import LoginForm from "./LoginForm";
import SignupForm from "./SignupForm";
import LogoutIcon from '@mui/icons-material/Logout'
import { auth } from "../firebaseConfig";
import {useAuthState} from 'react-firebase-hooks/auth';
import {useNavigate} from 'react-router-dom'
import GoogleButton from 'react-google-button'
import { signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import { useAlert } from "../Context/AlertContext";
import {useTheme} from "../Context/ThemeContext"


const useStyles = makeStyles(() => ({
  modal: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    backdropFilter: 'blur(2px)'
  },
  box: {
    width: 400,
    alignItems:'center' ,
    textAlign:'center',
    border: '1px solid'
  },
}));



const AccountIcon = () => {
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState(0);

  const handleValueChange = (e, v) => {
    setValue(v);
  };


  const handleClose = () => setOpen(false);

  
  const classes = useStyles();
  const [user] = useAuthState(auth);

const logout = () => {
  auth.signOut().then((ok)=>{
    setAlert({
      open: true,
      type: 'success',
      message:'Logged Out'
    })
  }).catch((err)=>{
    setAlert({
      open: true,
      type: 'error',
      message:'Not able to Log Out '
    })
  })
}

const navigate = useNavigate();

const {theme} = useTheme();

const handleAccountIconClick = () => {
  if(user){
    navigate('/user');
  }
  else
  {
    setOpen(true)
  }
}

const {setAlert} =useAlert();
const googleProvider  = new GoogleAuthProvider();

const signInWithGoogle = () => {
  signInWithPopup(auth, googleProvider).then((res)=>{
    setAlert({
      open: true,
      type: 'success',
      message: 'Logged In'
    });
    handleClose();
  }).catch((err)=>{
    console.log(err);
    setAlert({
      open: true,
      type:'error',
      message:'Unable to use Google Authentication'
    });
  })
}

  return (
    <div> 
      <AccountCircleIcon onClick={handleAccountIconClick}/>
      {(user) && <LogoutIcon onClick={logout} style={{marginLeft: '5px'}}/>}

      <Modal open={open} onClose={handleClose} className={classes.modal}>
        <div className={classes.box}>
          <AppBar position="static"
            style={{backgroundColor:'transparent'}}
          >
            <Tabs value={value} onChange={handleValueChange} variant="fullWidth">
              <Tab label="login" style={{ color:theme.title}}></Tab>
              <Tab label="signup" style={{ color:theme.title}}></Tab>
            </Tabs>
          </AppBar>

          {value === 0 && <LoginForm  handleClose={handleClose}/>}
          {value === 1 && <SignupForm handleClose={handleClose}/>}

<Box className={classes.box}>
    <span style={{display:'block' , padding: '1rem'}}>OR</span>
    <GoogleButton 
      style={{width:'100%'}}
      onClick={signInWithGoogle}
    />
  </Box>

        </div>
      </Modal>
    </div>
  );
};

export default AccountIcon;
