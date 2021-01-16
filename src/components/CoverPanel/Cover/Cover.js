import React, { useState, useEffect } from 'react';
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
import EditIcon from '@material-ui/icons/Edit';
import { convertJsonToEditorContent, convertEditorContentToJson } from '../../../utills/editorUtils.js';
import { Editor, EditorState, convertFromRaw } from 'draft-js';
import { LIGHT_BLUE, DARK_BLUE, LIGHT, DARK } from '../../../consts/colors.js';
import './Cover.css';
// import 'draft-js/dist/Draft.css';

const useStyles = makeStyles((theme) => ({
  root: {
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
      [theme.breakpoints.down('sm')]: {
        maxWidth: '100%',
      },
    },
    '& .MuiAccordionSummary-root': {
      backgroundColor: LIGHT,
      borderBottom: '1px solid rgba(0, 0, 0, .125)',
      marginBottom: -1,
      minHeight: '56px',
      '&$expanded': {
        minHeight: '56px',
      },
      '& .MuiAccordionSummary-content': {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        '& svg': {
          fontSize: '36px',
        },
        '&$expanded': {
          margin: '12px 0',
        },
      },
    },
    '& .MuiAccordiondDetails-root': {},
  },
  editorContainer: {},
}));

const Cover = ({ id, name, content, expanded, deleteCover, editCover, handleChange }) => {
  const classes = useStyles();
  const [editorState, setEditorState] = useState(EditorState.createWithContent(convertJsonToEditorContent(content))); //EditorState.createWithContent(convertJsonToEditorContent(content))

  const onDeleteClick = (e) => {
    e.stopPropagation();
    deleteCover(id);
  };

  const onEditClick = (e) => {
    e.stopPropagation();
    editCover(id, name, content);
  };

  useEffect(() => {
    setEditorState(EditorState.createWithContent(convertJsonToEditorContent(content)));
  }, [content]);

  return (
    <div className={classes.root}>
      <Accordion square expanded={expanded === id} onChange={handleChange(id)}>
        <AccordionSummary>
          <Typography variant='h6'>{name}</Typography>
          <div className={classes.actionsContainer}>
            <IconButton edge='end' aria-label='edit' onClick={onEditClick}>
              <EditIcon />
            </IconButton>
            <IconButton edge='end' aria-label='delete' onClick={onDeleteClick}>
              <DeleteIcon />
            </IconButton>
          </div>
        </AccordionSummary>
        <AccordionDetails>
          {/* <Typography style={{ wordBreak: 'break-all' }}>{content}</Typography> */}
          <div className='editor-root'>
            <Editor editorState={editorState} readOnly={true} />
          </div>
        </AccordionDetails>
      </Accordion>
    </div>
  );
};

export default Cover;
