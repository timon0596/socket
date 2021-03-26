/* eslint-disable */
import React, { useEffect, useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Redirect } from 'react-router-dom';
import FriendsList from '../../components/FriendsList/FriendsList';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import Dialog from '../../components/Dialog/Dialog';
import Loader from '../../components/Loader/Loader'
import ActionAlerts from '../../components/SimpleAlerts/SimpleAlerts';

const useStyles = makeStyles({
  chatSection: {
    width: '100%',
  },
});

const Chat = () => {
  const classes = useStyles();
  const [ws] = useState(new WebSocket('ws://localhost:8080'));
  const [msg, setMsg] = useState('');
  const [isAuth, setIsAuth] = useState(true);

  const [selectedFriend, setSelectedFriend] = useState(1)

  const onFriendSelected = (id) => {
    setSelectedFriend(id)
  };

  const getCokies = () => {
    if (document.cookie) {
      var cookieValue = document.cookie.replace(/(?:(?:^|.*;\s*)token\s*\=\s*([^;]*).*$)|^.*$/, "$1");
      setIsAuth(true);
    } else {
      setIsAuth(false);
    }
  };

  useEffect(() => {
    getCokies();

    ws.addEventListener('open', () => {
      ws.send('something');
    });

    ws.addEventListener('message', (data) => {
      console.log(data.data);
    });
  }, [ws]);

  const send = (text) => {
    ws.send(text);
  };

  return (
    <div>
      <Grid container component={Paper} className={classes.chatSection}>
        <FriendsList onFriendSelected={onFriendSelected} />
        <Dialog
          selectedFriend={selectedFriend}
        />
      </Grid>
      { isAuth === false ? <Redirect to="/login" /> : null}
      <Loader />
      <ActionAlerts />
    </div>
  );
};

export default Chat;
