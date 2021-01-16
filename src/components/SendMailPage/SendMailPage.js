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
import MyButton from '../common/MyButton.js';
import Paper from '@material-ui/core/Paper';
import { Typography } from '@material-ui/core';
import { Editor, EditorState, convertFromRaw, convertToRaw } from 'draft-js';
import { stateToHTML } from 'draft-js-export-html';
import { RichTextEditor, FormRichTextEditor } from '../common/RichTextEditor.js';

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
    margin: '50px 0',
  },
});

const SendMailPage = ({ classes }) => {
  const myClasses = useStyles();

  const [data, setData] = useState(null);
  const [showBody, setShowBody] = useState(false);
  const [body, setBody] = useState('');
  const [coverState] = useState(null);
  const [isSending, setIsSending] = useState(false);
  const [selectedCv, setSelectedCv] = useState(null);
  const [selectedCover, setSelectedCover] = useState(null);
  const isSidePanelOpen = useSelector((state) => state.options.isSidePanelOpen);

  const makeMail = (data) => {
    setData(data);
  };

  const sendMail = () => {
    console.log();
    setIsSending(true);
  };

  useEffect(() => {
    if (data) {
      const getDocs = async () => {
        const cvResponse = await api.getCvById(data.cv);
        const coverResponse = await api.getCoverById(data.cover);
        setSelectedCv(cvResponse);
        setSelectedCover(coverResponse);
        setShowBody(true);
      };

      try {
        getDocs();
      } catch (err) {
        console.log(err.message);
      }
    }
    // } catch (err) {
    //   console.log('Fetch error');
    // }
  }, [data]);

  useEffect(() => {
    if (isSending) {
      const fetchSending = async (data) => {
        const response = await api.sendMailRequest(data);
        setIsSending(false);
      };

      try {
        fetchSending({
          to: data.to,
          from: data.from,
          subject: data.subject,
          file: selectedCv.file,
          cover: stateToHTML(convertFromRaw(JSON.parse(selectedCover.content))),
        });
      } catch (err) {
        console.log(err);
        setIsSending(false);
      }
    }
  }, [isSending]);

  const onOpenMailClient = () => {};

  const onContentChanged = () => {};

  return (
    <section
      className={clsx(classes.root, {
        [classes.expanded]: isSidePanelOpen,
      })}
    >
      <Container>
        <Form makeMail={makeMail} />
        <div className={myClasses.contentContainer}>
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
                {/* <div className={myClasses.mailField}>
                Attachment: <span>{selectedCv.name}</span>
              </div>
              <Divider /> */}

                {showBody && (
                  <div className={myClasses.body}>
                    <div className={myClasses.editorBlock}>
                      {/* <RichTextEditor initState={selectedCover.content} onContentChange={onContentChanged} /> */}
                      <Editor
                        editorState={EditorState.createWithContent(convertFromRaw(JSON.parse(selectedCover.content)))}
                        readOnly={true}
                      />
                    </div>
                    <div>
                      <p className={myClasses.linksBlock}>
                        <a href={selectedCv.file}>CV link</a>
                        <br />
                        <a href='http://18.193.76.149/'>Portfolio link</a>
                      </p>
                    </div>
                  </div>
                )}
              </Paper>
              <MyButton name='Send' theme='light' type='button' onClick={sendMail} />
            </div>
          )}
        </div>
      </Container>
    </section>
  );
};

export default withStyles(panelStyle)(SendMailPage);
