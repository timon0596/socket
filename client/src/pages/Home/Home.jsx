/* eslint-disable */
import React, { useEffect, useState } from 'react';
// import { Route } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import Divider from '@material-ui/core/Divider';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import Avatar from '@material-ui/core/Avatar';
import Fab from '@material-ui/core/Fab';
import SendIcon from '@material-ui/icons/Send';
import { Redirect } from 'react-router-dom';
import FriendsList from '../../components/FriendsList/FriendsList';
import axios from 'axios';
import { inject, observer } from 'mobx-react';
// import { Redirect, Router, Switch } from 'react-router-dom';
// import axios from 'axios';
// import SignIn from './components/LoginForm/LoginForm';
// import MenuAppBar from './components/Navbar/Navbar';
const useStyles = makeStyles({
  table: {
    minWidth: 650,
  },
  chatSection: {
    width: '100%',
    height: '80vh',
  },
  headBG: {
    backgroundColor: '#e0e0e0',
  },
  borderRight500: {
    borderRight: '1px solid #e0e0e0',
  },
  messageArea: {
    height: '70vh',
    overflowY: 'auto',
  },
});
/* eslint-disable */
const Chat = ({profile}) => {
  const classes = useStyles();
  const [ws] = useState(new WebSocket('ws://localhost:8080'));
  const [isAuth, setIsAuth] = useState(true);

  const getCokies = () => {
      
  };

  useEffect(async () => {
    try {
      
      const {data:{user}} = await axios.get(`${process.env.REACT_APP_BASE_ADDR}/user`,{
      withCredentials: true,
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Content-Type': 'application/json',
      },
    }
  );
    profile.setInitials({...user})
    setIsAuth(true);

    } catch (error) {
      console.log(error);  
      setIsAuth(false)
    }
    
    getCokies();

    ws.addEventListener('open', () => {
      ws.send('opened');
    });

    ws.addEventListener('message', (data) => {
      console.log(data.data);
    });
  });

  return (
    <div>
      { isAuth  ? <FriendsList /> : <Redirect to="/Login" />}
      <h1>{isAuth}</h1>
    </div>
  );
};

export default inject('profile')(observer(Chat));
