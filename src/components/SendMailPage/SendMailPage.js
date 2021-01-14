import React, { useState, useEffect } from 'react';
import { shallowEqual, useDispatch, useSelector } from 'react-redux';
import Form from './SendForm.js';
import { makeStyles, withStyles } from '@material-ui/core/styles';
import panelStyle from '../../styles/panelStyle.js';
import Container from '@material-ui/core/Container';
import clsx from 'clsx';
import TextField from '@material-ui/core/TextField';
import Paper from '@material-ui/core/Paper';
import { Typography } from '@material-ui/core';

const useStyles = makeStyles({
  root: {},
  body: {
    width: '80%',
  },
});

const SendMailPage = ({ classes }) => {
  const style = useStyles();

  const [body, setBody] = useState('');
  const isSidePanelOpen = useSelector((state) => state.options.isSidePanelOpen);

  const makeMail = (data) => {
    let bodyContent = `To: ${data.to}\n\nFrom::${data.from}\n\nSubject:${data.subject}\n\nAttachment:${}`;
    setBody(bodyContent);
  };

  const getCvName = (id) => {
    const name = useSelector((state) => state.cv.cvName);
  }

  useEffect(() => {}, [body]);

  return (
    <section
      className={clsx(classes.root, {
        [classes.expanded]: isSidePanelOpen,
      })}
    >
      <Container>
        <Form makeMail={makeMail} />
        <Paper>{body}</Paper>
      </Container>
    </section>
  );
};

export default withStyles(panelStyle)(SendMailPage);
