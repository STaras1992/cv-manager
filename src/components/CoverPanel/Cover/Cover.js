import React, { useState } from 'react';
import { makeStyles, withStyles } from '@material-ui/core/styles';
// import MuiAccordion from '@material-ui/core/Accordion';
// import MuiAccordionSummary from '@material-ui/core/AccordionSummary';
// import MuiAccordionDetails from '@material-ui/core/AccordionDetails';
import Accordion from '@material-ui/core/Accordion';
import AccordionSummary from '@material-ui/core/AccordionSummary';
import AccordionDetails from '@material-ui/core/AccordionDetails';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import DeleteIcon from '@material-ui/icons/Delete';

const useStyles = makeStyles((theme) => ({
  root: {
    // width: '100%',
    // minWidth: '250px',
    // maxWidth: '600px',
    '& .MuiAccordion-root': {
      maxWidth: '80%',
      border: '1px solid rgba(0, 0, 0, .125)',
      boxShadow: 'none',
      '&:not(:last-child)': {
        borderBottom: 0,
      },
      '&:before': {
        display: 'none',
      },
      '&$expanded': {
        margin: 'auto',
      },
      [theme.breakpoints.down('xs')]: {
        maxWidth: '100%',
      },
    },
    '& .MuiAccordionSummary-root': {
      backgroundColor: 'rgba(0, 0, 0, .03)',
      borderBottom: '1px solid rgba(0, 0, 0, .125)',
      marginBottom: -1,
      minHeight: 56,
      '&$expanded': {
        minHeight: 56,
      },
      '& .MuiAccordionSummary-content': {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        flexWrap: 'no-wrap',
        '&$expanded': {
          margin: '12px 0',
        },
      },
    },
    '& .MuiAccordiondDetails-root': {},
  },
  // coverHeader: {
  //   width: '100%',
  //   display: 'flex',
  //   flexDirection: 'row',
  //   justifyContent: 'space-between',
  //   alignItems: 'center',
  //   flexWrap: 'no-wrap',
  // },
}));

// const Accordion = withStyles({
//   root: {
//     border: '1px solid rgba(0, 0, 0, .125)',
//     boxShadow: 'none',
//     '&:not(:last-child)': {
//       borderBottom: 0,
//     },
//     '&:before': {
//       display: 'none',
//     },
//     '&$expanded': {
//       margin: 'auto',
//     },
//   },

//   expanded: {},
// })(MuiAccordion);

// const AccordionSummary = withStyles({
//   root: {
//     backgroundColor: 'rgba(0, 0, 0, .03)',
//     borderBottom: '1px solid rgba(0, 0, 0, .125)',
//     marginBottom: -1,
//     minHeight: 56,
//     '&$expanded': {
//       minHeight: 56,
//     },
//   },
//   content: {
//     '&$expanded': {
//       margin: '12px 0',
//     },
//   },
//   expanded: {},
// })(MuiAccordionSummary);

// const AccordionDetails = withStyles((theme) => ({
//   root: {
//     padding: theme.spacing(2),
//     '& p': {
//       display: 'inline-block',
//       width: '100%',
//       color: 'red',
//     },
//   },
// }))(MuiAccordionDetails);

const Cover = ({ name, content, expanded, deleteCover, handleChange }) => {
  const classes = useStyles();

  const onDeleteClick = () => {
    deleteCover(name);
  };

  return (
    <div className={classes.root}>
      <Accordion square expanded={expanded === name} onChange={handleChange(name)}>
        <AccordionSummary>
          {/* <div className={classes.coverHeader}> */}
          <Typography>{name}</Typography>
          <IconButton edge='end' aria-label='delete' onClick={onDeleteClick}>
            <DeleteIcon />
          </IconButton>
          {/* </div> */}
        </AccordionSummary>
        <AccordionDetails>
          <Typography>{content}</Typography>
        </AccordionDetails>
      </Accordion>
    </div>
  );
};

export default Cover;
