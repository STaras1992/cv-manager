import React, { useState, useEffect } from 'react';
import Form from './SendForm.js';
import { makeStyles, withStyles } from '@material-ui/core/styles';
import panelStyle from '../../styles/panelStyle.js';
import clsx from 'clsx';

const useStyles = makeStyles({
  root: {},
});

const SendMailPage = ({ classes }) => {
  const style = useStyles();

  const [body, setBody] = useState('');

  const makeMail = (data) => {};

  return (
    <section className={clsx(classes.root, style.root)}>
      <Form makeMail={makeMail} />
    </section>
  );
};

export default withStyles(panelStyle)(SendMailPage);
