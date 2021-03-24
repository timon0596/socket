import React from 'react';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import Avatar from '@material-ui/core/Avatar';
import { inject, useObserver } from 'mobx-react';

const Profile = inject('profile')(({ profile }) => useObserver(
  () => (
    <div>
      <List>
        <ListItem button key="RemySharp">
          <ListItemIcon>
            <Avatar alt="Remy Sharp" src="https://material-ui.com/static/images/avatar/1.jpg" />
          </ListItemIcon>
          <ListItemText onClick={() => {
            profile.setInitials({ name: 'qwe', id: 1 });
          }}
          >
            {profile.initials.name}
          </ListItemText>
        </ListItem>
      </List>
    </div>
  ),
));

export default Profile;
