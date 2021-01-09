import TextField from '@material-ui/core/TextField';
import { withStyles } from '@material-ui/core/styles';
import clsx from 'clsx';
import { LIGHT_BLUE, DARK_BLUE, LIGHT, DARK, LIME, RED_ERROR } from '../../consts/colors.js';

const styles = {
  root: {
    width: '80%',
    margin: '15px 0px',
    '& .MuiTextField-root': {
      width: '100%',
      color: 'white',
      '& .MuiInputBase-root': {
        color: 'white',
      },
      '& input:valid:focus + fieldset': {
        borderLeftWidth: 6,
        padding: '4px !important',
      },
      '& input:invalid + fieldset': {
        borderColor: 'red',
        borderWidth: 2,
      },
    },
  },

  valid: {
    '& .MuiOutlinedInput-root .MuiOutlinedInput-notchedOutline': {
      borderColor: 'white',
    },
    '& label': {
      color: LIME,
    },
    '& label.Mui-focused': {
      color: LIME,
    },
  },

  error: {},
};

const InputTextField = ({
  name,
  value,
  error,
  errorMessage = 'error',
  required = false,
  handleInputChange,
  placeholder = '',
  classes,
}) => (
  <div className={clsx(classes.root, { [classes.error]: error, [classes.valid]: !error })}>
    <TextField
      variant='outlined'
      label={name}
      name={name}
      value={value}
      error={error}
      required={required}
      autoComplete='off'
      placeholder={placeholder}
      helperText={error && errorMessage}
      onChange={handleInputChange}
    />
  </div>
);

export default withStyles(styles)(InputTextField);
