import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import InputTextField from '../common/InputTextField.js';
import MyButton from '../common/MyButton.js';

const useStyles = makeStyles((theme) => ({
  root: {
    marginLeft: '300px',
    marginTop: '200px',
  },
}));

const TemplatePanel = () => {
  const classes = useStyles();
  const handleInputChange = {};
  return (
    <div className={classes.root}>
      <InputTextField name='' error={false} handleInputChange={handleInputChange} />
      <MyButton name='Button' />
    </div>
  );
};

export default TemplatePanel;
