import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import ListItem from '@material-ui/core/ListItem';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import Avatar from '@material-ui/core/Avatar';
import IconButton from '@material-ui/core/IconButton';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import ListItemText from '@material-ui/core/ListItemText';
import FolderIcon from '@material-ui/icons/Folder';
import DeleteIcon from '@material-ui/icons/Delete';
import FileIcon from '@material-ui/icons/InsertDriveFile';

const useStyles = makeStyles((theme) => ({
  root: {
    '& .MuiListItem-container': {
      width: '500px',
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      flexWrap: 'wrap',
    },
  },
}));

const Cv = ({ name, type, link }) => {
  const classes = useStyles(useStyles());

  return (
    <div className={classes.root}>
      <ListItem>
        <ListItemAvatar>
          <Avatar>
            <FolderIcon />
          </Avatar>
        </ListItemAvatar>
        <ListItemText primary={name} secondary={type} />
        <ListItemSecondaryAction>
          <IconButton edge='end' aria-label='delete'>
            <DeleteIcon />
          </IconButton>
          <IconButton href={link} target='_blank' rel='noopener noreferrer' edge='end' aria-label='file'>
            <FileIcon />
          </IconButton>
        </ListItemSecondaryAction>
      </ListItem>
    </div>
  );
};

export default Cv;
