/* eslint-disable */
import React, { useEffect, useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import Divider from '@material-ui/core/Divider';
import Profile from '../Profile/Profile';
import FriendsItem from '../FriendsItem/FriendsItem';

const useStyles = makeStyles({
   table: {
      minWidth: 650,
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

const FriendsList = (props) => {
   const classes = useStyles();

   return (
      <Grid item xs={3} className={classes.borderRight500}>
         <Profile />
         <Divider />
         <Grid item xs={12} style={{ padding: '10px' }} />
         <Divider />
         <FriendsItem onFriendSelected={props.onFriendSelected} />
      </Grid>
   );
};

export default FriendsList;