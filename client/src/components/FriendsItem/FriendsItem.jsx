/* eslint-disable */
import React, { useEffect, useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import Divider from '@material-ui/core/Divider';
import Typography from '@material-ui/core/Typography';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import Avatar from '@material-ui/core/Avatar';
import { Redirect } from 'react-router-dom';
import Dialog from '../Dialog/Dialog';

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

const FriendsItem = (props) => {
   const classes = useStyles();
   const [friendsList, setFriendsList] = useState([
      { id: 1, name: 'Vlad', avatar: 'https://material-ui.com/static/images/avatar/2.jpg' },
      { id: 2, name: 'Tim', avatar: 'https://material-ui.com/static/images/avatar/3.jpg' },
      { id: 3, name: 'Ivan', avatar: 'https://material-ui.com/static/images/avatar/4.jpg' },
      { id: 4, name: 'Ulia', avatar: 'https://material-ui.com/static/images/avatar/5.jpg' },
   ])

   return (
      <List>
         {friendsList.map(({ id, name, avatar }) => {
            return (
               <ListItem button key="RemySharp" key={id} onClick={() => props.onFriendSelected(id)}>
                  <ListItemIcon>
                     <Avatar alt={name} src={avatar} />
                  </ListItemIcon>
                  <ListItemText primary={name}>{name}</ListItemText>
                  <ListItemText secondary="online" align="right" />
               </ListItem>
            )
         })}
      </List>
   );
};

export default FriendsItem;