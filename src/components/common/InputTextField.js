import TextField from '@material-ui/core/TextField';
import { withStyles } from '@material-ui/core/styles';

const styles = {
  root: {
    width: '100%',
    '& .MuiTextField-root': {
      width: '100%',
      color: 'white',
      '& .MuiInputBase-root': {
        color: 'white',
      },
      '& label': {
        color: '#12D8FA',
      },
      '& label.Mui-focused': {
        color: '#12D8FA',
      },

      '& input:valid + fieldset, textarea': {
        borderColor: 'white',
        borderWidth: 2,
      },
      '& input:invalid + fieldset': {
        borderColor: 'red',
        borderWidth: 2,
      },
      '& input:valid:focus + fieldset': {
        borderLeftWidth: 6,
        padding: '4px !important',
      },
    },
  },
};

const InputTextField = ({ name, value, error, handleInputChange, classes }) => (
  <div className={classes.root}>
    <TextField
      variant='outlined'
      label={name}
      name={name}
      value={value}
      error={error}
      autoComplete='false'
      placeholder='Enter file name'
      helperText={error && 'Maximum name length is 30 characters'}
      onChange={handleInputChange}
    />
  </div>
);

export default withStyles(styles)(InputTextField);
