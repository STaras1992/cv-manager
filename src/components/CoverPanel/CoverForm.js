import React, { useState, useEffect, useRef } from 'react';
import { makeStyles, withStyles } from '@material-ui/core/styles';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { useForm, FormProvider } from 'react-hook-form';
import MyButton from '../common/MyButton.js';
import { FormInput } from '../common/FormInput.js';
import { MAX_NAME_LENGTH } from '../../consts/measures.js';
import FormTitle from '../common/FormTitle.js';
import formStyle from '../../styles/formStyle.js';
import { EditorState } from 'draft-js';
import { RichTextEditor } from '../common/RichTextEditor.js';
import { convertJsonToEditorContent, convertEditorContentToJson } from '../../utills/editorUtils.js';
import ConfirmDialog from '../common/ConfirmDialog.js';
import BiSwitch from '../common/BiSwitch.js';
import { RTL, LTR, NEW_MODE } from '../../consts/strings.js';

const schema = yup.object().shape({
  name: yup
    .string()
    .required('Name is required field')
    .test('len', `Must be less than ${MAX_NAME_LENGTH} characters`, (val) => val.length <= MAX_NAME_LENGTH),
});

const useStyles = makeStyles(() => ({
  editor: {
    width: '100%',
  },
  directionSwitch: {
    display: 'flex',
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  directionSwitchLabel: {
    padding: '5px',
    color: 'white',
  },
}));

const CoverForm = ({
  initName = '',
  initContent = '',
  initDirection = LTR,
  mode = NEW_MODE,
  saveCover,
  closeForm,
  classes,
}) => {
  const myClasses = useStyles();

  const [data, setData] = useState(null);
  const [initEditorContent, setInitEditorContent] = useState('');
  const [content, setContent] = useState('');
  const [openDialog, setOpenDialog] = useState(false);
  const [textDirectionLtr, setTextDirectionLtr] = useState(true);

  const formObject = useForm({
    mode: 'all',
    resolver: yupResolver(schema),
  });

  const { handleSubmit, reset, errors, clearErrors } = formObject;

  const onSubmit = (formData) => {
    if (mode === NEW_MODE) {
      saveCover(formData.name, convertEditorContentToJson(content), textDirectionLtr ? LTR : RTL);
      return;
    }
    setData({
      name: formData.name,
      content: convertEditorContentToJson(content),
      direction: textDirectionLtr ? LTR : RTL,
    });
    setOpenDialog(true);
  };

  const handleClose = () => {
    closeForm();
  };

  const handleDialogOk = () => {
    saveCover(data.name, data.content, data.direction);
    setOpenDialog(false);
  };

  const handleDialogCancel = () => {
    setOpenDialog(false);
  };

  const handleReset = () => {
    reset({ name: '' });
    clearErrors();
    setTextDirectionLtr(true);
    setInitEditorContent(EditorState.createEmpty().getCurrentContent());
  };

  const handleChangeDirection = () => {
    setTextDirectionLtr(!textDirectionLtr);
  };

  const onContentChanged = (newContent) => {
    setContent(newContent);
  };

  useEffect(() => {
    reset({ name: initName });
  }, [initName]);

  useEffect(() => {
    if (initContent !== '') {
      setInitEditorContent(convertJsonToEditorContent(initContent));
    }
  }, [initContent]);

  useEffect(() => {
    setTextDirectionLtr(initDirection === LTR);
  }, [initDirection]);

  useEffect(() => {
    setContent(initEditorContent);
  }, [initEditorContent]);

  return (
    <FormProvider {...formObject}>
      <form className={classes.root} onSubmit={handleSubmit(onSubmit)} onReset={handleReset}>
        <FormTitle mode={mode} label='cover' handleClose={handleClose} />
        {/* <FormInputUnControlled name='name' required={true} label='Name' onChange={onNameChange} value={name} /> */}
        <FormInput name='name' label='Name' required={true} defaultValue={initName} errorobj={errors} />
        <div className={myClasses.editor}>
          <RichTextEditor
            initContent={initEditorContent}
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

        <div className={classes.submitContainer}>
          <MyButton name='Save' theme='dark' type='submit' />
          <MyButton name='Reset' theme='dark' type='reset' />
        </div>
      </form>
      <ConfirmDialog
        open={openDialog}
        dialogTitle='Update cover?'
        dialogText='All previous data will be updated'
        handleOk={handleDialogOk}
        handleClose={handleDialogCancel}
      />
    </FormProvider>
  );
};

export default withStyles(formStyle)(CoverForm);
