import React, { forwardRef } from 'react';
import { useForm, Controller, useFormContext } from 'react-hook-form';
import { makeStyles } from '@material-ui/core/styles';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import InputLabel from '@material-ui/core/InputLabel';
import Select from '@material-ui/core/Select';
//import { StyledInputLabel } from '../../styles';
import FormHelperText from '@material-ui/core/FormHelperText';

const useStyles = makeStyles((theme) => ({
  root: {
    marginTop: '20px',
    marginBottom: '20px',
    // margin: theme.spacing(1),
  },
  formControl: {
    margin: theme.spacing(1),
    minWidth: 120,
  },
  reqLabel: {
    color: '#f44336',
  },
  select: {
    width: '50%',
  },
  inputLabel: {
    // marginLeft: '5px',
    // fontSize: '20px',
  },
}));

const MuiSelect = forwardRef((props, ref) => {
  const classes = useStyles();
  const { label, name, options, required, errorobj } = props;

  let isError = false;
  let errorMessage = '';
  if (errorobj && errorobj.hasOwnProperty(name)) {
    isError = true;
    errorMessage = errorobj[name].message;
  }

  return (
    <FormControl className={classes.root} variant='outlined' error={isError}>
      <InputLabel className={classes.inputLabel} htmlFor={name}>
        {label} {required ? <span className='reqLabel'>*</span> : null}
      </InputLabel>
      <Select className={classes.select} variant='outlined' label={label} id={name} {...props}>
        <MenuItem value=''>
          <em>None</em>
        </MenuItem>
        {options.map((item) => (
          <MenuItem key={item.id} value={item.id}>
            {item.name}
          </MenuItem>
        ))}
      </Select>
      <FormHelperText>{errorMessage}</FormHelperText>
    </FormControl>
  );
});

function FormSelect(props) {
  const { name, label, options, defaultValue } = props;
  const { control } = useFormContext();

  return (
    <React.Fragment>
      <Controller as={MuiSelect} control={control} name={name} label={label} defaultValue={defaultValue} {...props} />
    </React.Fragment>
  );
}

export default FormSelect;
