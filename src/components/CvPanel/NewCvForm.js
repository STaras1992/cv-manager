import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import FilledInput from '@material-ui/core/FilledInput';
import Container from '@material-ui/core/Container';
import FileBase64 from 'react-file-base64';
import Typography from '@material-ui/core/Typography';
import CheckIcon from '@material-ui/icons/Check';
import ErrorIcon from '@material-ui/icons/Error';
import UploadIcon from '@material-ui/icons/Publish';
import InputTextField from '../common/InputTextField.js';
import MyButton from '../common/MyButton.js';
import clsx from 'clsx';
import { LIGHT_BLUE, DARK_BLUE, LIGHT, DARK, RED_ERROR } from '../../consts/colors.js';
import { MAX_NAME_LENGTH, MAX_DESCRIPTION_LENGTH } from '../../consts/measures.js';

const useStyle = makeStyles((theme) => ({
  root: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
    marginTop: '50px',
    marginBottom: '50px',
    padding: 0,
  },
  formTitle: {
    width: '100%',
    color: 'white',
    textAlign: 'left',
    marginTop: '50px',
    marginBottom: '10px',
  },
  fileButton: {
    background: LIGHT,
    margin: '10px 0',
  },
  submitButton: {
    margin: '10px 0',
  },
  inputContainer: {
    display: 'flex',
    justifyContent: 'flex-start',
    alignItems: 'center',
  },
  fileInput: {
    display: 'none',
  },
  inputStatusIcon: {
    '& svg': {
      fontSize: '45px',
      fontWeight: 'bold',
      paddingBottom: '5px',
      color: '#24FE41',
    },
    marginLeft: '10px',
  },
  fileError: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    '& svg': {
      fontSize: '30px',
      fontWeight: 'bold',
      paddingBottom: '5px',
      color: 'red',
    },
    marginLeft: '10px',
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

const Form = ({ initName = '', initDescription = '', initFile = null, mode = 'new', saveCv }) => {
  const classes = useStyle();
  const [name, setName] = useState(initName);
  const [file, setFile] = useState(initFile);
  const [description, setDescription] = useState(initDescription);
  const [error, setError] = useState({ nameError: false, descriptionError: false, fileError: false });
  const [initFlag, setInitFlag] = useState(true);
  const [visited, setVisited] = useState({ nameVisit: false, descriptionVisit: false, fileVisit: false });

  const handleInputChange = (e) => {
    const { name, value } = e.target;

    if (name === 'name') {
      if (!visited.nameVisit) setVisited((prevState) => ({ ...prevState, ['nameVisit']: true }));
      setName(value);
    } else if (name === 'description') {
      if (!visited.descriptionVisit) setVisited((prevState) => ({ ...prevState, ['descriptionVisit']: true }));
      setDescription(value);
    }
  };

  const handleFileSelect = async (e) => {
    if (!visited.fileVisit) setVisited((prevState) => ({ ...prevState, ['fileVisit']: true }));
    setFile(e.target.files[0]);
    setError((prevState) => ({ ...prevState, ['fileError']: false }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    //on first submit check all fields
    if (initFlag) {
      setVisited((prevState) => ({
        ...prevState,
        ['fileVisit']: true,
        ['nameVisit']: true,
        ['descriptionVisit']: true,
      }));
      setInitFlag(false);
    }

    //if no error continue submitting
    if (!(error.nameError || error.descriptionError || error.fileError)) {
      saveCv(name, description, file);
    }
  };

  useEffect(() => {
    validate('file');
  }, [file]);

  useEffect(() => {
    validate('name');
  }, [name]);

  useEffect(() => {
    validate('description');
  }, [description]);

  useEffect(() => {
    validate('file');
    validate('name');
    validate('description');
  }, [visited]);

  useEffect(() => {
    setName(initName);
  }, [initName]);

  useEffect(() => {
    setDescription(initDescription);
  }, [initDescription]);

  useEffect(() => {
    setFile(initFile);
  }, [initFile]);

  const handleReset = async () => {
    setName('');
    setDescription('');
    setFile(null);
    setInitFlag(true);
    await setVisited({ nameVisit: false, descriptionVisit: false, fileVisit: false });
    await setError({ nameError: false, descriptionError: false, fileError: false });
  };

  const validate = async (input) => {
    //console.log('validate ' + input);
    switch (input) {
      case 'name':
        if (name.length >= MAX_NAME_LENGTH && visited.nameVisit) {
          // console.log('val name');
          setError((prevState) => ({ ...prevState, ['nameError']: true }));
        } else if (error.nameError) {
          setError((prevState) => ({ ...prevState, ['nameError']: false }));
        }
        break;
      case 'description':
        if (description.length >= MAX_DESCRIPTION_LENGTH && visited.descriptionVisit) {
          // console.log('val description');
          setError((prevState) => ({ ...prevState, ['descriptionError']: true }));
        } else if (error.descriptionError) {
          setError((prevState) => ({ ...prevState, ['descriptionError']: false }));
        }
        break;
      case 'file':
        if (file === null && visited.fileVisit) {
          // console.log('val file');
          setError((prevState) => ({ ...prevState, ['fileError']: true }));
        } else if (error.fileError) {
          setError((prevState) => ({ ...prevState, ['fileError']: false }));
        }
        break;
      default:
        break;
    }
    // console.log(error);
    // console.log(visited);
  };

  return (
    <form onSubmit={handleSubmit} onReset={handleReset}>
      <Container className={classes.root}>
        <Typography className={classes.formTitle} variant='h4'>
          {mode === 'edit' ? 'Edit CV:' : 'New CV:'}
        </Typography>
        <InputTextField
          name='name'
          value={name}
          error={error.nameError}
          errorMessage={`Maximum name length ${MAX_NAME_LENGTH} characters`}
          required={visited.nameVisit}
          placeholder='Enter file name '
          handleInputChange={handleInputChange}
        />
        <InputTextField
          name='description'
          value={description}
          error={error.descriptionError}
          errorMessage={`Maximum description length ${MAX_DESCRIPTION_LENGTH} characters`}
          required={false}
          placeholder='Enter file description (language,position..)'
          handleInputChange={handleInputChange}
        />
        <div className={classes.inputContainer}>
          <Button className={classes.fileButton} variant='contained' startIcon={<UploadIcon />} component='label'>
            Upload File
            <div className={classes.fileInput}>
              {/* <FileBase64 onDone={handleFileSelect} /> */}
              <input type='file' onChange={handleFileSelect} />
            </div>
          </Button>
          <div className={clsx(classes.inputStatusIcon, { [classes.hide]: !file })}>
            <CheckIcon />
          </div>
          <div className={clsx(classes.fileError, { [classes.hide]: !error.fileError })}>
            <ErrorIcon />
            <Typography variant='body1' color='secondary'>
              Please choose file
            </Typography>
          </div>
        </div>
        <div className={classes.submitContainer}>
          <MyButton name='Save' theme='dark' type='submit' />
          <MyButton name='Cancel' theme='dark' type='reset' />
        </div>
      </Container>
    </form>
  );
};

export default Form;
