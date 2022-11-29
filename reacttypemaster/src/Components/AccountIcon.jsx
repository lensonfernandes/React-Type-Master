import React from "react";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import { AppBar, Modal, Tab, Tabs } from "@mui/material";
import { useState } from "react";
import { makeStyles } from "@mui/styles";
import LoginForm from "./LoginForm";
import SignupForm from "./SignupForm";

const useStyles = makeStyles(() => ({
  modal: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  box: {
    width: 400,
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

  return (
    <div>
      <AccountCircleIcon onClick={()=>{setOpen(true)}}/>

      <Modal open={open} onClose={handleClose} className={classes.modal}>
        <div className={classes.box}>
          <AppBar position="static"
            style={{backgroundColor:'transparent'}}
          >
            <Tabs value={value} onChange={handleValueChange} variant="fullWidth">
              <Tab label="login" style={{ color:'white'}}></Tab>
              <Tab label="signup" style={{ color:'white'}}></Tab>
            </Tabs>
          </AppBar>

          {value === 0 && <LoginForm />}
          {value === 1 && <SignupForm/>}
        </div>
      </Modal>
    </div>
  );
};

export default AccountIcon;
