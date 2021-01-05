import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Container from '@material-ui/core/Container';
import FileBase64 from 'react-file-base64';
import CheckIcon from '@material-ui/icons/Check';
import clsx from 'clsx';

const useStyle = makeStyles((theme) => ({
  root: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
    marginTop: '50px',
  },
  fileButton: {
    margin: '10px 0',
  },
  submitButton: {
    margin: '10px 0',
  },
  inputContainer: {
    display: 'flex',
    alignItems: 'flex-end',
  },
  fileInput: {
    display: 'none',
  },
  inputStatusIcon: {
    '& svg': {
      fontSize: '40px',
      paddingBottom: '5px',
      color: 'green',
    },
    marginLeft: '10px',
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

const Form = ({ saveCv }) => {
  const classes = useStyle();

  const [name, setName] = useState('');
  const [file, setFile] = useState(null);
  const [error, setError] = useState(false);

  const handleInputChange = (e) => {
    setName(e.target.value);
  };

  const handleFileSelect = (file) => {
    setFile(file);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    saveCv({ name, file });
  };

  const handleReset = async () => {
    await setName('');
    await setFile(null);
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
          <Button className={classes.fileButton} disabled={file !== null} variant='contained' component='label'>
            Upload File
            <div className={classes.fileInput}>
              <FileBase64 onDone={handleFileSelect} />
            </div>
          </Button>

          <div className={clsx(classes.inputStatusIcon, { [classes.hide]: !file })}>
            <CheckIcon />
          </div>
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
