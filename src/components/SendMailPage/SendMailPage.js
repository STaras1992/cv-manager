import React, { useState, useEffect } from 'react';
import { shallowEqual, useDispatch, useSelector } from 'react-redux';
import Form from './SendForm.js';
import { makeStyles, withStyles } from '@material-ui/core/styles';
import panelStyle from '../../styles/panelStyle.js';
import Container from '@material-ui/core/Container';
import clsx from 'clsx';
import Divider from '@material-ui/core/Divider';
import CircularProgress from '@material-ui/core/CircularProgress';
import MyButton from '../common/MyButton.js';
import Paper from '@material-ui/core/Paper';
import { Editor, EditorState } from 'draft-js';
import { RichTextEditor, getBlockStyle } from '../common/RichTextEditor.js';
import { convertJsonToEditorContent } from '../../utills/editorUtils.js';
import MySwitch from '../common/MySwitch.js';
import BiSwitch from '../common/BiSwitch.js';
import Snackbar from '@material-ui/core/Snackbar';
import Alert from '../common/Alert.js';
import { setLoadingOn } from '../../actions/optionsActions.js';
import { sendEmailRequest, getData, setSended } from '../../actions/emailActions.js';
import { makeHtml } from '../../utills/html.js';
import { RTL, LTR } from '../../consts/strings.js';
import 'draft-js/dist/Draft.css';

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
  directionSwitch: {
    display: 'flex',
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  directionSwitchLabel: {
    padding: '5px',
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
  const isSidePanelOpen = useSelector((state) => state.options.isSidePanelOpen);
  const isLoading = useSelector((state) => state.options.isLoading);
  const showError = useSelector((state) => state.options.showError);
  const [showSnackbar, setShowSnackbar] = useState(false);
  const userEmailAdress = useSelector((state) => state.user.user.email);
  const [textDirectionLtr, setTextDirectionLtr] = useState(true);

  const makeMail = (data) => {
    dispatch(setLoadingOn);
    setData(data);
  };

  const sendMail = () => {
    setIsSending(true);
  };

  const editMail = (e) => {
    setEditMode(!editMode);
  };

  const onContentChanged = (newContentState) => {
    setContentState(newContentState);
  };

  const handleCloseSnackbar = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    setShowSnackbar(false);
  };

  const handleChangeDirection = () => {
    setTextDirectionLtr(!textDirectionLtr);
  };

  useEffect(() => {
    data && dispatch(getData(data.cv, data.cover));
  }, [data]);

  useEffect(() => {
    if (isSending) {
      dispatch(
        sendEmailRequest({
          to: data.to,
          from: data.from,
          subject: data.subject,
          file: selectedCv.file,
          cover: makeHtml(contentState, textDirectionLtr ? LTR : RTL, userEmailAdress),
        })
      );
    }
  }, [isSending]);

  useEffect(() => {
    if (selectedCover !== null && selectedCv !== null && data !== null) {
      setContentState(convertJsonToEditorContent(selectedCover.content));
      setInitContentState(convertJsonToEditorContent(selectedCover.content));
      setTextDirectionLtr(selectedCover.direction === 'LTR');
      setShowBody(true);
    }
  }, [selectedCover, selectedCv]);

  useEffect(() => {
    if (editMode) {
      setInitContentState(contentState);
    }
  }, [editMode]);

  useEffect(() => {
    //on first enter isSending = false so message not fired
    if (isSended && isSending) {
      setIsSending(false);
      dispatch(setSended(false));
      setShowSnackbar(true);
      setShowBody(false); //TODO uncomment, commented for test
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
                <div className={myClasses.body}>
                  <div className={myClasses.editorBlock}>
                    {editMode ? (
                      <div>
                        <RichTextEditor
                          initContent={initContentState}
                          direction={textDirectionLtr ? LTR : RTL}
                          onContentChange={onContentChanged}
                        />
                        <BiSwitch
                          classes={{ root: myClasses.directionSwitch, label: myClasses.directionSwitchLabel }}
                          labelLeft={LTR}
                          labelRight={RTL}
                          checked={textDirectionLtr}
                          handleChange={handleChangeDirection}
                        />
                      </div>
                    ) : (
                      <Editor
                        blockStyleFn={getBlockStyle}
                        editorState={EditorState.createWithContent(contentState)}
                        textAlignment={selectedCover.direction === 'LTR' ? 'left' : 'right'}
                        readOnly={true}
                      />
                    )}
                  </div>
                </div>
              </Paper>
              <MySwitch label='edit' name='edit' value={editMode} handleChange={editMail} />
              <div className={myClasses.sendContainer}>
                <MyButton disabled={isLoading} name='Send' theme='light' type='button' onClick={sendMail} />
                <CircularProgress className={clsx(classes.loading, { [classes.hide]: !isLoading })} />
              </div>
            </div>
          )}
        </div>
        {/* <div style={{ color: 'white', direction: 'rtl' }}>אני STAS טרסנקו</div> */}
      </Container>
      <Snackbar
        className={classes.snackbar}
        anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
        open={showSnackbar}
        autoHideDuration={4000}
        onClose={handleCloseSnackbar}
      >
        <Alert onClose={handleCloseSnackbar} severity={showError ? 'error' : 'success'}>
          {showError ? 'Failed to send email.Try again' : 'Email sent successfully'}
        </Alert>
      </Snackbar>
    </section>
  );
};

export default withStyles(panelStyle)(SendMailPage);
