import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import ListItem from '@material-ui/core/ListItem';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import Typography from '@material-ui/core/Typography';
import Avatar from '@material-ui/core/Avatar';
import IconButton from '@material-ui/core/IconButton';
import clsx from 'clsx';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import ListItemText from '@material-ui/core/ListItemText';
import FolderIcon from '@material-ui/icons/Folder';
import DeleteIcon from '@material-ui/icons/DeleteForever';
import FileIcon from '@material-ui/icons/InsertDriveFile';
import { LIGHT_BLUE, DARK_BLUE, LIGHT, DARK } from '../../../consts/colors.js';

const useStyles = makeStyles((theme) => ({
  root: {
    '& .MuiListItem-container': {
      background: LIGHT,
      maxWidth: '80%',
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      margin: 0,
      padding: 0,
      marginBottom: '5px',
      borderRadius: '2px',
      '& .MuiListItemText-root': {
        paddingRight: '20px',
      },
      [theme.breakpoints.down('sm')]: {
        maxWidth: '100%',
        height: '180px',
        justifyContent: 'center',
        alignItems: 'center',
        '& .MuiListItemSecondaryAction-root': {
          display: 'flex',
          flexDirection: 'column',
          margin: 0,
          padding: 0,
        },
        '& .MuiListItemText-root': {
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          textAlign: 'center',
        },
        '& .MuiAvatar-root': {
          width: '70px',
          height: '70px',
          '& svg': {
            fontSize: '50px',
          },
        },
        '& .MuiButtonBase-root': {
          padding: '8px 0',
          marginRight: '-20px',
        },
      },
      [theme.breakpoints.down('xs')]: {
        '& .MuiListItemAvatar-root': {
          display: 'none',
        },
      },
    },
    '& svg': {
      color: DARK,
    },
  },

  fileIconContainer: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    fontSize: '14px',
  },

  iconButton: {
    width: '75px',
  },

  deleteIconButton: {
    '& svg': {
      fontSize: '56px',
      paddingBottom: '7px',
      [theme.breakpoints.down('sm')]: {
        fontSize: '70px',
      },
    },
  },

  fileIconButton: {
    '& svg': {
      fontSize: '38px',
      [theme.breakpoints.down('sm')]: {
        fontSize: '50px',
      },
    },
  },
}));

const Cv = ({ id, name, type, description, file, deleteCv, openFile }) => {
  const classes = useStyles(useStyles());
  console.log(file);
  const onDeleteClick = (e) => {
    deleteCv(id);
  };

  const onOpenFileClick = (e) => {
    openFile(id);
  };

  return (
    <div className={classes.root}>
      <ListItem>
        <ListItemAvatar>
          <Avatar>
            <FolderIcon />
          </Avatar>
        </ListItemAvatar>
        <ListItemText
          style={{ wordBreak: 'break-all' }}
          primary={
            <React.Fragment>
              <Typography component='span' variant='h6' className={classes.descriptionText}>
                {name}
              </Typography>
            </React.Fragment>
          }
          secondary={
            <React.Fragment>
              <Typography component='span' variant='body2' className={classes.descriptionText}>
                {description}
              </Typography>
            </React.Fragment>
          }
        />
        <ListItemSecondaryAction>
          <IconButton
            className={clsx(classes.iconButton, classes.deleteIconButton)}
            edge='end'
            aria-label='delete'
            onClick={onDeleteClick}
          >
            <DeleteIcon />
          </IconButton>
          <IconButton
            className={clsx(classes.iconButton, classes.fileIconButton)}
            href={file}
            //target='_blank'
            rel='noopener noreferrer'
            edge='end'
            aria-label='file'
            component='a'
          >
            <div
              className={classes.fileIconContainer}
              style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center' }}
            >
              <FileIcon />
              {type}
            </div>
          </IconButton>
        </ListItemSecondaryAction>
      </ListItem>
    </div>
  );
};

export default Cv;
