/* eslint-disable */
import React, { useEffect, useState } from 'react';
// import { Route } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import Divider from '@material-ui/core/Divider';
// import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import Avatar from '@material-ui/core/Avatar';
// import Fab from '@material-ui/core/Fab';
// import SendIcon from '@material-ui/icons/Send';
import { Redirect } from 'react-router-dom';
import Dialog from '../Dialog/Dialog';
import Profile from '../profile/Profile';
import FriendsItem from '../FriendsItem/FriendsItem';

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

const FriendsList = () => {
   const classes = useStyles();

   const [selectedFriend, setSelectedFriend] = useState(1)

   const onFriendSelected = (id) => {
      // alert(id);
      setSelectedFriend(id)
   };

   return (
      <Grid container component={Paper} className={classes.chatSection}>
         <Grid item xs={3} className={classes.borderRight500}>
            <Profile/>
            <Divider />
            <Grid item xs={12} style={{ padding: '10px' }} />
            <Divider />
            <FriendsItem onFriendSelected={onFriendSelected} />
            {/* <List>
               <ListItem button key="RemySharp">
                  <ListItemIcon>
                     <Avatar alt="Remy Sharp" src="https://material-ui.com/static/images/avatar/1.jpg" />
                  </ListItemIcon>
                  <ListItemText primary="Remy Sharp">Remy Sharp</ListItemText>
                  <ListItemText secondary="online" align="right" />
               </ListItem>
               <ListItem button key="Alice">
                  <ListItemIcon>
                     <Avatar alt="Alice" src="https://material-ui.com/static/images/avatar/3.jpg" />
                  </ListItemIcon>
                  <ListItemText primary="Alice">Alice</ListItemText>
               </ListItem>
               <ListItem button key="CindyBaker">
                  <ListItemIcon>
                     <Avatar alt="Cindy Baker" src="https://material-ui.com/static/images/avatar/2.jpg" />
                  </ListItemIcon>
                  <ListItemText primary="Cindy Baker">Cindy Baker</ListItemText>
               </ListItem>
            </List> */}
         </Grid>
         <Dialog selectedFriend={selectedFriend} />
      </Grid>
   );
};

export default FriendsList;