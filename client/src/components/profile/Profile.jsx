import React, { useEffect } from 'react';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import Avatar from '@material-ui/core/Avatar';
import { inject, observer } from 'mobx-react';

const Profile = inject('profile')(observer(
  ({ profile }) => {
    useEffect(() => {
    });
    return (
      <div>
        <List>
          <ListItem button key="RemySharp">
            <ListItemIcon>
              <Avatar alt="Remy Sharp" src="https://material-ui.com/static/images/avatar/1.jpg" />
            </ListItemIcon>
            <ListItemText>
              {profile.user}
            </ListItemText>
          </ListItem>
        </List>
      </div>
    );
  },
));

export default Profile;
