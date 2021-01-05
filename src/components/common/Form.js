import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert from '@material-ui/lab/Alert';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import TextareaAutosize from '@material-ui/core/TextareaAutosize';

function Alert(props) {
  return <MuiAlert elevation={6} style={{ fontSize: '30px' }} variant='filled' {...props} />;
}

const initialValues = {
  name: '',
  email: '',
  subject: '',
  message: '',
};

const useStyle = makeStyles((theme) => ({
  root: {
    '& .MuiFormControl-root': {
      background: '#e3eeff',
      width: '100%',
      maxWidth: '700px',
      margin: theme.spacing(1),
    },
  },
  formContainer: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
  },
  textArea: {
    background: '#e3eeff',
    width: '90%',
    maxWidth: '650px',
    marginBottom: '10px',
  },
  messageError: {
    display: 'none',
  },
  messageErrorShow: {
    width: '100%',
    color: '#f44336',
    display: 'flex',
    justifyContent: 'center',
    marginBottom: '3px',
    fontSize: '0.75rem',
    textAlign: 'left',
    fontFamily: 'Roboto, Helvetica, Arial, sans-serif',
    fontWeight: '400',
    lineHeight: '1.66',
    letterSpacing: '0.03333em',
  },
  '@global': {
    '.MuiFormHelperText-root': {
      background: '#f3e7e9',
      margin: 0,
    },
  },
  button: {
    background: 'black',
    padding: '5px 20px',
    color: 'white',
    border: '3px solid #393a73',
    borderRadius: '10px',
    boxShadow: '0 10px 6px -6px white',
    textTransform: 'none',
    fontSize: '1.3rem',
    fontWeight: 600,
    fontFamily: 'Russo One, sans-serif',
    [theme.breakpoints.up('md')]: {
      fontSize: '1.5rem',
    },
    [theme.breakpoints.up('lg')]: {
      fontSize: '1.8rem',
    },
    [theme.breakpoints.up('xl')]: {
      fontSize: '2.2rem',
    },
    '&:hover': {
      background: 'white',
      color: 'black',
      boxShadow: '0 10px 6px -6px black',
    },
  },
}));

const Form = ({ handleMessageSent }) => {
  const classes = useStyle();
  const [formData, setFormData] = useState(initialValues);
  const [errors, setErrors] = useState({ email: '', message: '', name: '', subject: '' });
  const [visited, setVisited] = useState({ email: false, message: false, name: false, subject: false });
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [messageSendSucces, setMessageSentSucces] = useState(false);
  const [isSending, setIsSending] = useState(false);

  const validate = (field = null) => {
    let temp = {};
    if (!field || field === 'email') {
      temp.email = /$^|.+@.+..+/.test(formData.email) ? '' : 'Email is not valid';
      temp.email = formData.email !== '' ? temp.email : 'Email field is required';
    } else temp.email = '';
    if (!field || field === 'message') {
      temp.message = formData.message ? '' : 'Message field is required';
    } else temp.message = '';
    if (!field || field === 'name') {
      temp.name = formData.name.length < 25 ? '' : 'Maximum field length is 25 characters';
    } else temp.name = '';
    if (!field || field === 'subject') {
      temp.subject = formData.subject.length < 50 ? '' : 'Maximum field length is 50 characters';
    } else temp.subject = '';

    setErrors({ ...temp });

    return temp.email === '' && temp.name === '' && temp.subject === '' && temp.message === '';
  };

  const resetForm = () => {
    setFormData(initialValues);
    setErrors({ email: '', message: '', name: '', subject: '' });
    setVisited({ email: false, message: false, name: false, subject: false });
  };

  const handleInputChange = (e) => {
    const { name, value } = e.currentTarget;
    if (!visited[name]) setVisited({ ...visited, [name]: true });
    setFormData({ ...formData, [name]: value });
    console.log(visited);
    console.log(errors);
  };

  useEffect(() => {
    if (visited.email) validate('email');
  }, [formData.email]);

  useEffect(() => {
    if (visited.name) validate('name');
  }, [formData.name]);

  useEffect(() => {
    if (visited.subject) validate('subject');
  }, [formData.subject]);

  useEffect(() => {
    if (visited.message) validate('message');
  }, [formData.message]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (validate()) {
      setIsSending(true);
      try {
        await axios({
          method: 'POST',
          //url: 'http://localhost:4000/send',
          url: 'http://3.120.243.234/api/send',
          data: formData,
        }).then((response) => {
          if (response.data.status === 'success') {
            setMessageSentSucces(true);
            setOpenSnackbar(true);
          } else if (response.data.status === 'fail') {
            setMessageSentSucces(false);
            setOpenSnackbar(true);
          }
        });
      } catch (e) {
        console.log(e);
        setMessageSentSucces(false);
        setOpenSnackbar(true);
      }
    }
    setIsSending(false);
    if (messageSendSucces) {
      resetForm();
      handleMessageSent();
    }
  };

  const handleCloseSnackbar = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    setOpenSnackbar(false);
  };

  return (
    <div>
      <form onSubmit={handleSubmit} className={classes.root}>
        <Container className={classes.formContainer} maxWidth='lg'>
          <TextField
            variant='outlined'
            label='Email*'
            name='email'
            value={formData.email}
            error={errors.email !== '' ? true : false}
            helperText={errors.email}
            onChange={handleInputChange}
          />
          <TextField
            variant='outlined'
            label='Name'
            name='name'
            value={formData.name}
            error={errors.name !== '' ? true : false}
            helperText={errors.name}
            onChange={handleInputChange}
          />
          <TextField
            variant='outlined'
            label='Subject'
            name='subject'
            value={formData.subject}
            error={errors.subject !== '' ? true : false}
            helperText={errors.subject}
            onChange={handleInputChange}
          />
          <TextareaAutosize
            className={classes.textArea}
            label='Message*'
            name='message'
            rowsMin={5}
            value={formData.message}
            onChange={handleInputChange}
          />
          <div className={errors.message !== '' ? classes.messageErrorShow : classes.messageError}>
            Message is required
          </div>
          <div>
            <Button disabled={isSending} className={classes.button} type='submit' variant='contained'>
              Send
            </Button>
          </div>
        </Container>
        <Snackbar
          className={classes.snackbar}
          anchorOrigin={{ horizontal: 'left', vertical: 'bottom' }}
          open={openSnackbar}
          autoHideDuration={3000}
          onClose={handleCloseSnackbar}
        >
          <Alert onClose={handleCloseSnackbar} severity={messageSendSucces ? 'success' : 'error'}>
            {messageSendSucces ? 'Message sent' : 'Failed to send message'}
          </Alert>
        </Snackbar>
      </form>
    </div>
  );
};

export default Form;
