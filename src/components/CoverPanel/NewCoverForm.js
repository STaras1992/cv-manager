import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Container from '@material-ui/core/Container';
import FileBase64 from 'react-file-base64';
import CheckIcon from '@material-ui/icons/Check';
import TextareaAutosize from '@material-ui/core/TextareaAutosize';
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
  textArea: {
    //background: '#e3eeff',
    minWidth: '250px',
    maxWidth: '650px',
    marginBottom: '10px',
    marginTop: '10px',
  },

  submitButton: {
    margin: '10px 0',
  },
  inputContainer: {
    display: 'flex',
    alignItems: 'flex-end',
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
        <TextField
          variant='outlined'
          label='name'
          name='name'
          value={name}
          error={error}
          helperText={error && 'Maximum name length is 30 characters'}
          onChange={handleInputChange}
        />
        <div className={classes.inputContainer}>
          <TextareaAutosize
            className={classes.textArea}
            label='Content'
            name='content'
            rowsMin={5}
            value={content}
            onChange={handleInputChange}
          />
          {/* <div className={error ? classes.messageErrorShow : classes.messageError}>Message is required</div> */}
        </div>
        <div className={classes.submitContainer}>
          <Button className={classes.submitButton} type='submit' variant='contained'>
            Save
          </Button>
          <Button className={classes.submitButton} type='reset' variant='contained'>
            Cancel
          </Button>
        </div>
      </Container>
    </form>
  );
};

export default Form;
