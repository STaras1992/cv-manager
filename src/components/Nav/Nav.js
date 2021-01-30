import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import clsx from 'clsx';
import { makeStyles } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import List from '@material-ui/core/List';
import CssBaseline from '@material-ui/core/CssBaseline';
import Divider from '@material-ui/core/Divider';
import IconButton from '@material-ui/core/IconButton';
import Button from '@material-ui/core/Button';
import MenuIcon from '@material-ui/icons/Menu';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ProfileIcon from '@material-ui/icons/AccountCircle';
import ListItemText from '@material-ui/core/ListItemText';
import { getMenuItems } from '../../utills/menu.js';
import { SIDE_PANEL_WIDTH_WIDE, SIDE_PANEL_WIDTH_SHORT } from '../../consts/measures.js';
import { Link } from 'react-router-dom';
import { openSidePanel, closeSidePanel } from '../../actions/optionsActions.js';
import { logout } from '../../actions/userActions.js';
import { LIGHT, LIME } from '../../consts/colors.js';
import { showErrorOff } from '../../actions/optionsActions.js';

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
  },

  header: {
    background: '#363795',
    background: ' -webkit-linear-gradient(to right, #005c97, #363795)',
    background: 'linear-gradient(to right, #005c97, #363795)',

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
    ...theme.mixins.toolbar,
  },
  profile: {
    display: 'flex',
    alignItems: 'center',
  },
  loginContainer: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    cursor: 'default',
  },
  userName: {
    margin: 0,
    padding: 0,
    paddingTop: '5px',
    marginBottom: '-10px',
    color: LIME,
    fontSize: '13px',
  },
  profileIcon: {
    '& svg': {
      fontSize: '32px',
      color: LIME,
      transition: 'all 0.4s ease-in-out',
    },
  },
  profileDisabled: {
    '& svg': {
      color: LIGHT,
    },
  },
  actionButton: {
    fontSize: '14px',
    transition: 'all 0.2s ease-in-out',
    '&:hover': {
      color: LIME,
    },
  },
  loginButton: {
    '&:hover': {
      textDecoration: 'overline',
    },
  },
  signupButton: {
    '&:hover': {
      textDecoration: 'underline',
    },
  },
  hide: {
    // display: 'none',
    visibility: 'hidden',
  },
}));

const Nav = (props) => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const open = useSelector((state) => state.options.isSidePanelOpen);
  const [menuItems] = useState(getMenuItems());
  const isLoggedIn = useSelector((state) => state.user.isLoggedIn);
  const userEmail = useSelector((state) => state.user.user.firstName);
  console.log(userEmail);
  const handleDrawerOpen = () => {
    dispatch(openSidePanel);
  };

  const handleDrawerClose = () => {
    dispatch(closeSidePanel);
  };

  const handleLogout = () => {
    dispatch(logout());
  };

  const handlePageChange = () => {
    dispatch(showErrorOff);
  };

  const menuListItems = menuItems.map((item) => (
    <ListItem button key={item.name} component={Link} to={item.to} onClick={handlePageChange}>
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
          <div className={classes.profile}>
            <div
              className={clsx({
                [classes.hide]: isLoggedIn === null,
              })}
            >
              {isLoggedIn ? (
                <Button className={classes.actionButton} color='inherit' onClick={handleLogout}>
                  Logout
                </Button>
              ) : (
                <div>
                  <Button
                    className={clsx(classes.actionButton, classes.signupButton)}
                    component={Link}
                    to='/signup'
                    color='inherit'
                  >
                    Sign up
                  </Button>
                  <Button
                    className={clsx(classes.actionButton, classes.loginButton)}
                    component={Link}
                    to='/login'
                    color='inherit'
                  >
                    Login
                  </Button>
                </div>
              )}
            </div>
            <div className={classes.loginContainer}>
              <p className={classes.userName}>{userEmail}</p>
              <IconButton
                classes={{ root: classes.profileIcon, disabled: classes.profileDisabled }}
                disabled={!isLoggedIn}
              >
                <ProfileIcon />
              </IconButton>
            </div>
          </div>
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
