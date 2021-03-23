/* eslint-disable */
import React, { useEffect, useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Redirect } from 'react-router-dom';
import FriendsList from '../../components/FriendsList/FriendsList';

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

const Chat = () => {
  const classes = useStyles();
  const [ws] = useState(new WebSocket('ws://localhost:8080'));
  const [msg, setMsg] = useState('');
  const [isAuth, setIsAuth] = useState(true);

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
      <FriendsList />
      { isAuth === false ? <Redirect to="/login" /> : null}
    </div>
  );
};

export default Chat;
