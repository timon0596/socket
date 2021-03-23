/* eslint-disable */
import React, { useEffect, useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import Divider from '@material-ui/core/Divider';
import Dialog from '../Dialog/Dialog';
import Profile from '../Profile/Profile';
import FriendsItem from '../FriendsItem/FriendsItem';

const useStyles = makeStyles({
   table: {
      minWidth: 650,
   },
   chatSection: {
      width: '100%',
      height: '85vh',
   },
   headBG: {
      backgroundColor: '#e0e0e0',
   },
   borderRight500: {
      borderRight: '1px solid #e0e0e0',
   },
   messageArea: {
      height: '60vh',
      overflowY: 'auto',
   },
});

const FriendsList = () => {
   const classes = useStyles();

   const [selectedFriend, setSelectedFriend] = useState(1)

   const onFriendSelected = (id) => {
      setSelectedFriend(id)
   };

   return (
      <Grid container component={Paper} className={classes.chatSection}>
         <Grid item xs={3} className={classes.borderRight500}>
            <Profile />
            <Divider />
            <Grid item xs={12} style={{ padding: '10px' }} />
            <Divider />
            <FriendsItem onFriendSelected={onFriendSelected} />
         </Grid>
         <Dialog selectedFriend={selectedFriend} />
      </Grid>
   );
};

export default FriendsList;