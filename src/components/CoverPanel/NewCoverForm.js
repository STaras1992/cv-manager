import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Container from '@material-ui/core/Container';
import FileBase64 from 'react-file-base64';
import CheckIcon from '@material-ui/icons/Check';
import TextareaAutosize from '@material-ui/core/TextareaAutosize';
import Typography from '@material-ui/core/Typography';
import InputTextField from '../common/InputTextField.js';
import InputTextArea from '../common/InputTextArea.js';
import MyButton from '../common/MyButton.js';
import clsx from 'clsx';
import { MAX_NAME_LENGTH, MAX_COVER_LENGTH } from '../../consts/measures.js';

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
  formTitle: {
    width: '100%',
    color: 'white',
    textAlign: 'left',
    marginTop: '50px',
    marginBottom: '10px',
  },
  submitContainer: {
    marginTop: '50px',
    '& button': {
      width: '100px',
      marginRight: '10px',
    },
  },
  hide: {
    display: 'none',
  },
}));

const Form = ({ initName = '', initContent = '', mode = 'new', saveCover }) => {
  const classes = useStyle();

  const [name, setName] = useState(initName);
  const [content, setContent] = useState(initContent);
  const [error, setError] = useState({ nameError: false, contentError: false });
  const [initFlag, setInitFlag] = useState(true);
  const [visited, setVisited] = useState({ nameVisit: false, contentVisit: false });

  const handleInputChange = async (e) => {
    const { name, value } = e.target;

    if (name === 'name') {
      if (!visited.nameVisit) setVisited((prevState) => ({ ...prevState, ['nameVisit']: true }));
      setName(value);
    } else if (name === 'content') {
      if (!visited.contentVisit) setVisited((prevState) => ({ ...prevState, ['contentVisit']: true }));
      setContent(value);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (initFlag) {
      setVisited((prevState) => ({
        ...prevState,
        ['nameVisit']: true,
        ['contentVisit']: true,
      }));
      setInitFlag(false);
    }
    if (!(error.nameError || error.contentError)) {
      saveCover(name, content);
    }
  };

  useEffect(() => {
    validate('name');
  }, [name]);

  useEffect(() => {
    validate('content');
  }, [content]);

  useEffect(() => {
    validate('name');
    validate('content');
  }, [visited]);

  useEffect(() => {
    setName(initName);
  }, [initName]);

  useEffect(() => {
    setContent(initContent);
  }, [initContent]);

  const handleReset = async () => {
    setName('');
    setContent('');
    setInitFlag(true);
    await setVisited({ nameVisit: false, contentVisit: false });
    await setError({ nameError: false, contentError: false });
  };

  const validate = async (input) => {
    switch (input) {
      case 'name':
        if (name.length >= MAX_NAME_LENGTH && visited.nameVisit) {
          setError((prevState) => ({ ...prevState, ['nameError']: true }));
        } else if (error.nameError) {
          setError((prevState) => ({ ...prevState, ['nameError']: false }));
        }
        break;
      case 'content':
        if (content.length >= MAX_COVER_LENGTH && visited.contentVisit) {
          setError((prevState) => ({ ...prevState, ['contentError']: true }));
        } else if (error.descriptionError) {
          setError((prevState) => ({ ...prevState, ['contentError']: false }));
        }
        break;
      default:
        break;
    }
  };

  return (
    <form onSubmit={handleSubmit} onReset={handleReset}>
      <Container className={classes.root}>
        <Typography className={classes.formTitle} variant='h4'>
          {mode === 'edit' ? 'Edit cover:' : 'New cover:'}
        </Typography>
        <InputTextField
          name='name'
          value={name}
          error={error.nameError}
          placeholder='Enter cover name'
          required={visited.nameVisit}
          errorMessage={`Max name length is ${MAX_NAME_LENGTH} characters`}
          handleInputChange={handleInputChange}
        />
        <InputTextArea
          name='content'
          value={content}
          error={error.contentError}
          placeholder='Enter cover content name'
          required={false}
          errorMessage={`Max cover length is ${MAX_COVER_LENGTH} characters`}
          handleInputChange={handleInputChange}
        />
        {/* <div className={error ? classes.messageErrorShow : classes.messageError}>Message is required</div> */}
        <div className={classes.submitContainer}>
          <MyButton name='Save' theme='dark' type='submit' />
          <MyButton name='Cancel' theme='dark' type='reset' />
        </div>
      </Container>
    </form>
  );
};

export default Form;
