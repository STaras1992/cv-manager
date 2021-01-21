import React from 'react';
import Card from '@material-ui/core/Card';
import { makeStyles, withStyles } from '@material-ui/core/styles';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import { LIGHT_BLUE, DARK_BLUE, LIGHT, DARK, LIME } from '../../consts/colors.js';

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
    // '&:hover': {
    //   width: '80%',
    //   border: `2px solid ${LIGHT}`,
    //   minHeight: '220px',
    //   [theme.breakpoints.down('sm')]: {
    //     flexDirection: 'column',
    //     width: '95%',
    //   },
    // },
  },
  content: {
    width: '70%',
    [theme.breakpoints.down('sm')]: {
      width: '100%',
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

const HorizontalCard = ({ title, text, image }) => {
  const classes = useStyles();

  return (
    <Card className={classes.root}>
      <CardMedia className={classes.cover} image={image} title='CV manager' />
      <CardContent className={classes.content}>
        <Typography variant='h5'>{title}</Typography>
        <Typography variant='subtitle1'>{text}</Typography>
      </CardContent>
    </Card>
  );
};

export default HorizontalCard;
