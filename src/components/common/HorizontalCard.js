import React from 'react';
import Card from '@material-ui/core/Card';
import { makeStyles } from '@material-ui/core/styles';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import { Link } from 'react-router-dom';
import { LIGHT_BLUE, BLUE } from '../../consts/colors.js';

const useStyles = makeStyles((theme) => ({
  root: {
    width: '70%',
    minHeight: '180px',
    display: 'flex',
    justifyContent: 'space-between',
    [theme.breakpoints.down('sm')]: {
      flexDirection: 'column',
      width: '90%',
    },
  },
  content: {
    width: '70%',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'flex-end',
    alignItems: 'flex-start',
    [theme.breakpoints.down('sm')]: {
      width: '100%',
    },
    '&:last-child': {
      paddingBottom: '16px',
    },
  },
  cardLink: {
    width: '100%',
    display: 'flex',
    justifyContent: 'flex-end',
    alignItems: 'center',
    textDecoration: 'none',
  },
  button: {
    width: '60px',
    height: '60px',
    boxShadow: '5px 5px 5px 0px #000000, inset 4px 4px 15px 0px #E0EFFC',
    borderRadius: '120px',
    fontSize: '1.3em',
    fontWeight: 600,
    color: LIGHT_BLUE,
    textTransform: 'none',
    transition: 'all 0.4s ease-in-out',
    '&:hover': {
      boxShadow: '5px 5px 5px 0px #E0EAFF, inset 4px 4px 6px 0px #464159',
      // backgroundColor: 'white',
      color: BLUE,
    },
  },
  cover: {
    width: '30%',
    [theme.breakpoints.down('sm')]: {
      width: '100%',
      height: '150px',
    },
  },
}));

const HorizontalCard = ({ title, text, linkText = 'Try it', image, path }) => {
  const classes = useStyles();

  return (
    <Card className={classes.root}>
      <CardMedia className={classes.cover} image={image} title='CV manager' />
      <CardContent className={classes.content}>
        <Typography variant='h5'>{title}</Typography>
        <Typography variant='subtitle1'>{text}</Typography>
        <Link className={classes.cardLink} to={path}>
          <Button classes={{ root: classes.button }}>{linkText}</Button>
        </Link>
      </CardContent>
    </Card>
  );
};

export default HorizontalCard;
