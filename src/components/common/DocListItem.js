import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import ListItem from '@material-ui/core/ListItem';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import Typography from '@material-ui/core/Typography';
import Avatar from '@material-ui/core/Avatar';
import IconButton from '@material-ui/core/IconButton';
import clsx from 'clsx';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import ListItemText from '@material-ui/core/ListItemText';
import FolderIcon from '@material-ui/icons/Folder';
import DeleteIcon from '@material-ui/icons/DeleteForever';
import FileIcon from '@material-ui/icons/InsertDriveFile';
import EditIcon from '@material-ui/icons/Edit';
import Tooltip from '@material-ui/core/Tooltip';
import MyToolTip from './MyToolTip.js';
import { LIGHT_BLUE, DARK_BLUE, LIGHT, DARK, LIME } from '../../consts/colors.js';

const useStyles = makeStyles((theme) => ({
  root: {
    '& .MuiListItem-container': {
      background: LIGHT,
      maxWidth: '100%',
      height: '100px',
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      margin: 0,
      padding: 0,
      marginBottom: '5px',
      borderRadius: '2px',
      '& .MuiListItemText-root': {
        paddingRight: '80px',
        paddingLeft: '10px',
        [theme.breakpoints.down('sm')]: {
          paddingRight: '10px',
        },
      },

      '& .MuiAvatar-root': {
        backgroundColor: DARK_BLUE,
        width: '60px',
        height: '60px',
        '& svg': {
          fontSize: '40px',
          color: 'white',
        },
      },

      [theme.breakpoints.down('sm')]: {
        height: '200px',
        justifyContent: 'center',
        alignItems: 'center',
        '& .MuiListItemSecondaryAction-root': {
          display: 'flex',
          flexDirection: 'column',
        },
        '& .MuiAvatar-root': {
          width: '70px',
          height: '70px',
          '& svg': {
            fontSize: '50px',
          },
        },
      },
      [theme.breakpoints.down('xs')]: {
        '& .MuiListItemAvatar-root': {
          display: 'none',
        },
      },
    },
    '& svg': {
      color: DARK_BLUE,
    },
  },

  iconButton: {
    '& svg': {
      fontSize: '32px',
    },
  },

  toolTip: {
    backgroundColor: LIME,
    color: DARK,
    border: `1px solid black`,
    boxShadow: theme.shadows[1],
    fontSize: '20px',
  },
  arrowToolTip: {
    color: 'black',
  },
}));

const DocList = ({ id, name, description, type = '', file = '', actions = [], onEdit, onDelete }) => {
  const classes = useStyles();

  const onDeleteClick = (e) => {
    onDelete(id);
  };

  const onEditClick = (e) => {
    onEdit({ id });
  };

  const listActions = actions.map((action, index) => {
    switch (action) {
      case 'delete': {
        return (
          <MyToolTip key={index} title='delete' position='top'>
            <IconButton
              key={index}
              className={clsx(classes.iconButton, classes.deleteIconButton)}
              edge='end'
              aria-label='delete'
              onClick={onDeleteClick}
            >
              <DeleteIcon />
            </IconButton>
          </MyToolTip>
        );
      }
      case 'edit': {
        return (
          <MyToolTip key={index} title='edit' position='top'>
            <IconButton key={index} className={classes.iconButton} edge='end' aria-label='edit' onClick={onEditClick}>
              <EditIcon />
            </IconButton>
          </MyToolTip>
        );
      }
      case 'open': {
        return (
          <MyToolTip key={index} title='file' position='top'>
            <IconButton
              key={index}
              className={clsx(classes.iconButton, classes.fileIconButton)}
              href={file}
              //target='_blank'
              rel='noopener noreferrer'
              edge='end'
              aria-label='file'
              component='a'
            >
              <FileIcon />
            </IconButton>
          </MyToolTip>
        );
      }
      default:
        return <></>;
    }
  });

  return (
    <div className={classes.root}>
      <ListItem>
        <ListItemAvatar>
          <Avatar>
            {/* <FolderIcon /> */}
            {type !== '' ? type : <FileIcon />}
          </Avatar>
        </ListItemAvatar>
        <ListItemText
          style={{ wordBreak: 'break-all' }}
          primary={
            <React.Fragment>
              <Typography component='span' variant='h6' color='secondary' className={classes.descriptionText}>
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
        <ListItemSecondaryAction>{listActions}</ListItemSecondaryAction>
      </ListItem>
    </div>
  );
};

export default DocList;
