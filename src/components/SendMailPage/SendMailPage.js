import React, { useState, useEffect } from 'react';
import { shallowEqual, useDispatch, useSelector } from 'react-redux';
import Form from './SendForm.js';
import * as api from '../../api/api.js';
import { makeStyles, withStyles } from '@material-ui/core/styles';
import panelStyle from '../../styles/panelStyle.js';
import Container from '@material-ui/core/Container';
import clsx from 'clsx';
import TextField from '@material-ui/core/TextField';
import Divider from '@material-ui/core/Divider';
import CircularProgress from '@material-ui/core/CircularProgress';
import MyButton from '../common/MyButton.js';
import Checkbox from '@material-ui/core/Checkbox';
import Paper from '@material-ui/core/Paper';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import { Typography } from '@material-ui/core';
import { Editor, EditorState, convertFromRaw, convertToRaw } from 'draft-js';
import { stateToHTML } from 'draft-js-export-html';
import { RichTextEditor, FormRichTextEditor } from '../common/RichTextEditor.js';
import { convertJsonToEditorContent, convertEditorContentToJson } from '../../utills/editorUtils.js';
import { useHtmlWrapWith } from '../../utills/html.js';
import MyCheckBox from '../common/MyCheckBox.js';
import MySwitch from '../common/MySwitch.js';
import { setLoadingOn, setLoadingOff } from '../../actions/optionsActions.js';
import { sendEmailRequest, getData, setSended } from '../../actions/emailActions.js';

const useStyles = makeStyles({
  contentContainer: {
    width: '100%',
    '& .MuiPaper-root ': {
      minHeight: '400px',
      padding: '20px',
    },
  },
  editorBlock: {},
  linksBlock: {
    marginTop: '40px',
    '& a': {
      textDecoration: 'none',
    },
  },
  mailField: {
    padding: '2px 0',
    fontSize: '20px',
    fontWeight: '500',
    '& span': {
      paddingLeft: '10px',
      fontWeight: '700',
    },
  },
  body: {
    fontSize: '18px',
    fontWeight: '600',
    paddingTop: '40px',
  },
  contentPaper: {
    marginTop: '50px',
  },
  sendContainer: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
    marginBottom: '50px',
  },
});

const SendMailPage = ({ classes }) => {
  const myClasses = useStyles();

  const dispatch = useDispatch();
  const [data, setData] = useState(null);
  const [showBody, setShowBody] = useState(false);
  const [editMode, setEditMode] = useState(false);
  const [initContentState, setInitContentState] = useState('');
  const [contentState, setContentState] = useState('');
  const [isSending, setIsSending] = useState(false);
  const isSended = useSelector((state) => state.email.isSended);
  const selectedCv = useSelector((state) => state.email.selectedCv, shallowEqual);
  const selectedCover = useSelector((state) => state.email.selectedCover, shallowEqual);
  //const [html, setHtml, wrapWithReplyTo, wrapWithWebsite, wrapWithFirstName, wrapWithLastName] = useHtmlWrapWith();
  const isSidePanelOpen = useSelector((state) => state.options.isSidePanelOpen);
  const isLoading = useSelector((state) => state.options.isLoading);
  // console.log('Selected CV:', selectedCv);
  // console.log('Selected cover:', selectedCover);
  // console.log('show body:', showBody);
  // console.log('edit mode:', editMode);

  const makeMail = (data) => {
    dispatch(setLoadingOn);
    setData(data);
  };

  const sendMail = () => {
    // console.log(convertEditorContentToJson(contentState));
    setIsSending(true);
  };

  const editMail = (e) => {
    setEditMode(!editMode);
  };

  const onContentChanged = (newContentState) => {
    setContentState(newContentState);
  };

  useEffect(() => {
    if (data) {
      dispatch(getData(data.cv, data.cover));
    }
  }, [data]);

  useEffect(() => {
    if (isSending) {
      dispatch(
        sendEmailRequest({
          to: data.to,
          from: data.from,
          subject: data.subject,
          file: selectedCv.file,
          cover: stateToHTML(contentState),
        })
      );
      // console.log('done');
      // setIsSending(false);
    }
  }, [isSending]);

  useEffect(() => {
    if (selectedCover !== null && selectedCv !== null && data !== null) {
      setContentState(convertJsonToEditorContent(selectedCover.content));
      setInitContentState(convertJsonToEditorContent(selectedCover.content));
      setShowBody(true);
    }
  }, [selectedCover, selectedCv]);

  useEffect(() => {
    if (editMode) {
      setInitContentState(contentState);
    }
  }, [editMode]);

  useEffect(() => {
    if (isSended && isSending) {
      setIsSending(false);
      dispatch(setSended(false));
    }
  }, [isSended]);

  return (
    <section
      className={clsx(classes.root, {
        [classes.expanded]: isSidePanelOpen,
      })}
    >
      <Container>
        <Form makeMail={makeMail} />
        <div className={myClasses.contentContainer}>
          <div className={clsx(classes.loading, { [classes.hide]: !isLoading })}>
            {!isSending && <CircularProgress />}
          </div>
          {showBody && (
            <div>
              <Paper className={myClasses.contentPaper}>
                <div className={myClasses.mailField}>
                  To:<span>{data.to}</span>
                </div>
                <Divider />
                <div className={myClasses.mailField}>
                  From: <span>{data.from}</span>
                </div>
                <Divider />
                <div className={myClasses.mailField}>
                  Subject: <span>{data.subject}</span>
                </div>
                <Divider />
                <div className={myClasses.mailField}>
                  Attachment: <span>{selectedCv.name + '.' + selectedCv.type}</span>
                </div>
                <Divider />

                {showBody && (
                  <div className={myClasses.body}>
                    <div className={myClasses.editorBlock}>
                      {editMode ? (
                        <RichTextEditor initContent={initContentState} onContentChange={onContentChanged} />
                      ) : (
                        <Editor
                          // editorState={EditorState.createWithContent(convertFromRaw(JSON.parse(selectedCover.content)))}
                          editorState={EditorState.createWithContent(contentState)}
                          readOnly={true}
                        />
                      )}
                    </div>
                  </div>
                )}
              </Paper>

              {/* <MyCheckBox label='edit' name='edit' value={editMode} handleChange={editMail} /> */}
              <MySwitch label='edit' name='edit' value={editMode} handleChange={editMail} />
              <div className={myClasses.sendContainer}>
                <MyButton disabled={isLoading} name='Send' theme='light' type='button' onClick={sendMail} />
                {/* <div className={clsx(classes.loading, { [classes.hide]: isLoading })}> */}
                <CircularProgress className={clsx(classes.loading, { [classes.hide]: !isLoading })} />
                {/* </div> */}
              </div>

              {/* <MyButton name='Edit' theme='light' type='button' onClick={editMail} /> */}
            </div>
          )}
        </div>
      </Container>
    </section>
  );
};

export default withStyles(panelStyle)(SendMailPage);
