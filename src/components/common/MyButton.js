import Button from '@material-ui/core/Button';
import clsx from 'clsx';
import { withStyles } from '@material-ui/core/styles';
import { LIGHT_BLUE, DARK_BLUE, LIGHT, DARK } from '../../consts/colors.js';

const styles = (theme) => ({
  root: {},

  buttonDarkToLight: {
    padding: '2px',
    background: 'black',
    color: 'white',
    border: `3px solid ${LIGHT}`,
    borderRadius: '10px',
    boxShadow: '0 10px 6px -6px white',
    textTransform: 'none',
    fontFamily: 'Russo One, sans-serif',
    fontSize: '1.2rem',
    [theme.breakpoints.up('md')]: {
      fontSize: '1.4rem',
    },

    '&:hover': {
      background: 'white',
      border: `3px solid ${DARK}`,
      color: 'black',
      boxShadow: '0 10px 6px -6px black',
    },
  },

  buttonLightToDark: {
    padding: '2 6px',
    background: 'white',
    color: 'black',
    border: `3px solid ${DARK_BLUE}`,
    borderRadius: '10px',
    boxShadow: '0 10px 6px -6px black',
    textTransform: 'none',
    fontFamily: 'Russo One, sans-serif',
    fontSize: '1.2rem',
    [theme.breakpoints.up('md')]: {
      fontSize: '1.4rem',
    },

    '&:hover': {
      background: 'black',
      color: 'white',
      border: `3px solid ${LIGHT}`,
      boxShadow: '0 10px 6px -6px white',
    },
  },
});

const MyButton = ({ name, theme, type = 'button', onClick, classes, styles }) => (
  <Button
    className={clsx(classes.root, {
      [classes.buttonDarkToLight]: theme === 'dark',
      [classes.buttonLightToDark]: theme === 'light',
    })}
    //className={theme === 'dark' ? classes.buttonDarkToLight : classes.buttonLightToDark}
    type={type}
    variant='contained'
    onClick={onClick}
    style={styles}
  >
    {name}
  </Button>
);

export default withStyles(styles)(MyButton);
