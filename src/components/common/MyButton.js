import Button from '@material-ui/core/Button';
import { withStyles } from '@material-ui/core/styles';
import { LIGHT_BLUE, DARK_BLUE, LIGHT, DARK } from '../../consts/colors.js';

const styles = (theme) => ({
  root: {
    margin: 0,
    padding: 0,
  },

  buttonDarkToLight: {
    padding: '2px',
    background: 'black',
    color: 'white',
    border: `3px solid ${LIGHT}`,
    boxShadow: '0 10px 6px -6px white',
    textTransform: 'none',
    fontFamily: 'Russo One, sans-serif',
    fontSize: '1.3rem',
    [theme.breakpoints.up('md')]: {
      fontSize: '1.5rem',
    },

    '&:hover': {
      background: 'white',
      border: `3px solid ${DARK}`,
      color: 'black',
      boxShadow: '0 10px 6px -6px black',
    },
  },

  buttonLightToDark: {
    padding: '2px',
    background: 'white',
    color: 'black',
    border: `3px solid ${DARK_BLUE}`,
    borderRadius: '10px',
    boxShadow: '0 10px 6px -6px black',
    textTransform: 'none',
    fontFamily: 'Russo One, sans-serif',
    fontSize: '1.3rem',
    [theme.breakpoints.up('md')]: {
      fontSize: '1.5rem',
    },

    '&:hover': {
      background: 'black',
      color: 'white',
      border: `3px solid ${LIGHT}`,
      boxShadow: '0 10px 6px -6px white',
    },
  },
});

const MyButton = ({ name, type, classes }) => (
  <Button className={type === 'dark' ? classes.buttonDarkToLight : classes.buttonLightToDark} variant='contained'>
    {name}
  </Button>
);

export default withStyles(styles)(MyButton);
