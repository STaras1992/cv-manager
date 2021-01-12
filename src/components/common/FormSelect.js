import React, { forwardRef } from 'react';
import { useForm, Controller, useFormContext } from 'react-hook-form';
import { makeStyles } from '@material-ui/core/styles';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import ArrowDropDownIcon from '@material-ui/icons/ArrowDropDown';
import InputLabel from '@material-ui/core/InputLabel';
import Select from '@material-ui/core/Select';
import InputAdornment from '@material-ui/core/InputAdornment';
import FormHelperText from '@material-ui/core/FormHelperText';
import { LIGHT_BLUE, DARK_BLUE, LIGHT, DARK, RED_ERROR, LIME } from '../../consts/colors.js';

const useStyles = makeStyles((theme) => ({
  root: {
    width: '50%',
    minWidth: '260px',
    margin: '15px 0px',
    '& .MuiOutlinedInput-root .MuiOutlinedInput-notchedOutline': {
      borderColor: 'white',
    },
    '&:hover .MuiOutlinedInput-root .MuiOutlinedInput-notchedOutline': {
      borderWidth: 4,
      padding: '4px !important',
    },
    '& .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline': {
      borderLeftWidth: 6,
      borderWidth: 4,
      padding: '4px !important',
    },
    '& label': {
      color: LIME,
    },
    '& label.Mui-error': {
      color: LIME,
    },
    '& label.Mui-focused': {
      color: LIME,
    },

    '& .MuiInputBase-root': {
      color: 'white',
    },
    '& .MuiSelect-icon': {
      fontSize: '30px',
      color: 'white',
    },
  },
  reqLabel: {
    color: '#f44336',
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
