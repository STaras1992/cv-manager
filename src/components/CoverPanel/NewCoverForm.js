import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Container from '@material-ui/core/Container';
import FileBase64 from 'react-file-base64';
import CheckIcon from '@material-ui/icons/Check';
import TextareaAutosize from '@material-ui/core/TextareaAutosize';
import InputTextField from '../common/InputTextField.js';
import InputTextArea from '../common/InputTextArea.js';
import MyButton from '../common/MyButton.js';
import clsx from 'clsx';

const useStyle = makeStyles((theme) => ({
  root: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
    marginTop: '50px',
    marginLeft: 0,
    paddingLeft: 0,
  },

  inputContainer: {
    width: '50%',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
    marginBottom: '20px',
  },

  submitContainer: {
    '& button': {
      width: '100px',
      marginRight: '10px',
    },
  },
  hide: {
    display: 'none',
  },
}));

const Form = ({ saveCover }) => {
  const classes = useStyle();

  const [name, setName] = useState('');
  const [content, setContent] = useState('');
  const [error, setError] = useState(false);

  const handleInputChange = async (e) => {
    if (e.target.name === 'name') await setName(e.target.value);
    else if (e.target.name === 'content') await setContent(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    saveCover(name, content);
  };

  const handleReset = async () => {
    await setName('');
    await setContent('');
    await setError(false);
  };

  useEffect(() => {
    if (name.length >= 30) {
      setError(true);
    } else {
      setError(false);
    }
  }, [name]);

  return (
    <form onSubmit={handleSubmit} onReset={handleReset}>
      <Container className={classes.root}>
        <div className={classes.inputContainer}>
          <InputTextField name='name' value={name} error={error} handleInputChange={handleInputChange} />
          <div style={{ marginTop: '10px' }}>
            <InputTextArea name='content' value={content} error={error} handleInputChange={handleInputChange} />
          </div>
          {/* <div className={error ? classes.messageErrorShow : classes.messageError}>Message is required</div> */}
        </div>
        <div className={classes.submitContainer}>
          <MyButton name='Save' type='dark' />
          <MyButton name='Cancel' type='dark' />
        </div>
      </Container>
    </form>
  );
};

export default Form;
