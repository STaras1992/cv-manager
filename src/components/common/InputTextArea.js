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
      '& textarea:valid:focus + fieldset': {
        borderLeftWidth: 6,
        padding: '4px !important',
      },
      '& textarea:invalid + fieldset': {
        border: 'red',
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

const InputTextArea = ({
  name,
  value,
  error,
  errorMessage = 'error',
  isRequired = false,
  handleInputChange,
  placeholder = '',
  classes,
}) => (
  <div className={clsx(classes.root, { [classes.error]: error, [classes.valid]: !error })}>
    <TextField
      variant='outlined'
      multiline
      rows={5}
      label={name}
      name={name}
      value={value}
      required={isRequired}
      error={error}
      placeholder={placeholder}
      helperText={error && errorMessage}
      onChange={handleInputChange}
    />
  </div>
);

export default withStyles(styles)(InputTextArea);
