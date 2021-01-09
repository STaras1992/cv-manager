import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import clsx from 'clsx';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import List from '@material-ui/core/List';
import CssBaseline from '@material-ui/core/CssBaseline';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import IconButton from '@material-ui/core/IconButton';
import Button from '@material-ui/core/Button';
import MenuIcon from '@material-ui/icons/Menu';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import { getMenuItems } from '../../utills/menu.js';
import { SIDE_PANEL_WIDTH_WIDE, SIDE_PANEL_WIDTH_SHORT } from '../../consts/measures.js';
import { Link } from 'react-router-dom';
import { openSidePanel, closeSidePanel } from '../../actions/optionsActions.js';

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
  },

  header: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
  },

  appBar: {
    minHeight: '64px',
    zIndex: theme.zIndex.drawer + 1,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
  },

  appBarShift: {
    marginLeft: SIDE_PANEL_WIDTH_WIDE,
    width: `calc(100% - ${SIDE_PANEL_WIDTH_WIDE}px)`,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
    // [theme.breakpoints.down('xs')]: {
    //   width: `calc(100% - ${SIDE_PANEL_WIDTH_SHORT})`,
    // },
  },

  drawer: {
    width: SIDE_PANEL_WIDTH_WIDE,
    whiteSpace: 'nowrap',
  },

  drawerOpen: {
    width: SIDE_PANEL_WIDTH_WIDE,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
    // [theme.breakpoints.down('xs')]: {
    //   width: SIDE_PANEL_WIDTH_SHORT,
    // },
  },

  drawerClose: {
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    overflowX: 'hidden',
    width: SIDE_PANEL_WIDTH_SHORT,
  },

  toolbar: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-end',
    padding: theme.spacing(0, 1),
    // necessary for content to be below app bar
    ...theme.mixins.toolbar,
  },

  hide: {
    display: 'none',
  },
}));

const Nav = (props) => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const open = useSelector((state) => state.options.isSidePanelOpen);
  //const [open, setOpen] = useState(false);
  const [menuItems] = useState(getMenuItems());

  const handleDrawerOpen = () => {
    //setOpen(true);
    dispatch(openSidePanel);
  };

  const handleDrawerClose = () => {
    //setOpen(false);
    dispatch(closeSidePanel);
  };

  const menuListItems = menuItems.map((item) => (
    <ListItem button key={item.name} component={Link} to={item.to}>
      <ListItemIcon>{item.icon}</ListItemIcon>
      <ListItemText primary={item.name} />
    </ListItem>
  ));

  return (
    <div className={classes.root}>
      <CssBaseline />
      <AppBar
        position='fixed'
        className={clsx(classes.appBar, {
          [classes.appBarShift]: open,
        })}
      >
        <Toolbar className={classes.header}>
          <IconButton
            color='inherit'
            aria-label='open drawer'
            onClick={handleDrawerOpen}
            edge='start'
            className={clsx(classes.menuButton, {
              [classes.hide]: open,
            })}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant='h6' noWrap>
            Cv Manager
          </Typography>
          <Button color='inherit'>Login</Button>
        </Toolbar>
      </AppBar>

      <Drawer
        variant='permanent'
        className={clsx(classes.drawer, {
          [classes.drawerOpen]: open,
          [classes.drawerClose]: !open,
        })}
        classes={{
          paper: clsx({
            [classes.drawerOpen]: open,
            [classes.drawerClose]: !open,
          }),
        }}
      >
        <div className={classes.toolbar}>
          <IconButton onClick={handleDrawerClose}>
            <ChevronLeftIcon />
          </IconButton>
        </div>
        <Divider />
        <List>{menuListItems}</List>
        <Divider />
      </Drawer>
    </div>
  );
};

export default Nav;
