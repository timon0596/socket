/* eslint-disable */
import React, { useEffect, useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Divider from '@material-ui/core/Divider';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import TextField from '@material-ui/core/TextField';
import Fab from '@material-ui/core/Fab';
import SendIcon from '@material-ui/icons/Send';
import axios from 'axios';
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

const Dialog = (props) => {
   const classes = useStyles();
   const [idDialog, setIdDialog] = useState(1)
   const [msg, setMsg] = useState('');
   const [allDialog, setAlldialog] = useState([
      {
         id: 1,
         messageHistory: ['Hey man, What s up ? ', 'Hey, Iam Good! What about you ?', 'Cool. i am good, let s catch up!'],
      },
      {
         id: 2,
         messageHistory: ['Здаров', 'Здаров, че хочел?', 'Ничё'],
      },
   ])

   const updateDialog = () => {
      const { selectedFriend } = props;
      if (!selectedFriend) {
         return;
      } else {
         setIdDialog(selectedFriend)
      }
   }

   useEffect(() => {
      updateDialog();
   }, []);

   useEffect(() => {
      if (props.selectedFriend !== idDialog) {
         updateDialog();
      }
   }, [props.selectedFriend]);

   return (
      <Grid item xs={9}>
         <List className={classes.messageArea}>
            {allDialog.map(({ id, messageHistory, index }) => {
               if (id === idDialog) {
                  return (
                     <ListItem key={id}>
                        <Grid container>
                           <Grid item xs={12}>
                              <ListItemText align="right" primary={messageHistory[0]} />
                              {/* <h1>{idDialog}</h1> */}
                           </Grid>
                           <Grid item xs={12}>
                              <ListItemText align="right" secondary="09:30" />
                           </Grid>
                        </Grid>
                     </ListItem>
                  )
               }
               return null
            })}
            {/* <ListItem key="1">
               <Grid container>
                  <Grid item xs={12}>
                     <ListItemText align="right" primary="Hey man, What's up ?" />
                  </Grid>
                  <Grid item xs={12}>
                     <ListItemText align="right" secondary="09:30" />
                  </Grid>
               </Grid>
            </ListItem>
            <ListItem key="2">
               <Grid container>
                  <Grid item xs={12}>
                     <ListItemText align="left" primary="Hey, Iam Good! What about you ?" />
                  </Grid>
                  <Grid item xs={12}>
                     <ListItemText align="left" secondary="09:31" />
                  </Grid>
               </Grid>
            </ListItem>
            <ListItem key="3">
               <Grid container>
                  <Grid item xs={12}>
                     <ListItemText align="right" primary="Cool. i am good, let's catch up!" />
                  </Grid>
                  <Grid item xs={12}>
                     <ListItemText align="right" secondary="10:30" />
                  </Grid>
               </Grid>
            </ListItem> */}
         </List>
         <Divider />
         <Grid container style={{ padding: '20px' }}>
            <Grid item xs={11}>
               <TextField id="outlined-basic-email" label="Type Something" fullWidth onChange={(e) => setMsg(e.target.value)} value={msg} />
            </Grid>
            <Grid xs={1} align="right">
               <Fab color="primary" aria-label="add" onClick={() => { axios.post('http://localhost:8080/login',{login:'admin',password:'admin'},{
      withCredentials: true,
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Content-Type': 'application/json',
      },
    }); }}><SendIcon /></Fab>
            </Grid>
         </Grid>
      </Grid>
   );
};

export default Dialog;