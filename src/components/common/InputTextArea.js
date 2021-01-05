import TextField from '@material-ui/core/TextField';
import { withStyles } from '@material-ui/core/styles';

const styles = {
  root: {
    '& .MuiTextField-root': {
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

      '& textarea:valid + fieldset, textarea': {
        borderColor: 'white',
        borderWidth: 2,
      },
      '& textarea:invalid + fieldset': {
        borderColor: 'red',
        borderWidth: 2,
      },
      '& textarea:valid:focus + fieldset': {
        borderLeftWidth: 6,
        padding: '4px !important',
      },
    },
  },
};

const InputTextArea = ({ name, value, error, handleInputChange, classes }) => (
  <div className={classes.root}>
    <TextField
      variant='outlined'
      multiline
      rows={5}
      label={name}
      name={name}
      value={value}
      error={error}
      placeholder='Enter cover content'
      helperText={error && 'Maximum content length is 1000 characters'}
      onChange={handleInputChange}
    />
  </div>
);

export default withStyles(styles)(InputTextArea);
