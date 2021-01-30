import React from 'react';
import MuiLink from '@material-ui/core/Link';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import { LIGHT } from '../../consts/colors.js';

const useStyles = makeStyles(() => ({
  root: {
    dispaly: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    color: LIGHT,
    marginTop: '40px',
    marginBottom: '20px',
  },
  link: {
    textDecoration: 'none',
  },
}));

const Copyright = () => {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <Typography variant='body2' align='center'>
        {`© ${new Date().getFullYear()}, CV Manager by `}
        &nbsp;
        <MuiLink
          className={classes.link}
          color='inherit'
          href='http://18.193.76.149/'
          rel='noopener noreferrer'
          target='_blank'
        >
          Stas Tarasenko
        </MuiLink>
      </Typography>
    </div>
  );
};

export default Copyright;
