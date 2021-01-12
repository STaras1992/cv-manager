import { LIGHT_BLUE, DARK_BLUE, LIGHT, DARK, RED_ERROR, GREEN_SUCCESS } from '../consts/colors.js';

const styles = {
  root: {
    width: '100%',
    display: 'flex',
    margin: 0,
    marginBottom: '50px',
    padding: 0,
    flexDirection: 'column',
    justifyContent: 'flex-start',
  },
  submitContainer: {
    marginTop: '50px',
    '& button': {
      width: '100px',
      marginRight: '10px',
    },
  },
};

export default styles;
