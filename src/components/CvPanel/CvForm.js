import React, { useState, useEffect } from 'react';
import { withStyles } from '@material-ui/core/styles';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { useForm, FormProvider } from 'react-hook-form';
import MyButton from '../common/MyButton.js';
import FormInput from '../common/FormInput.js';
import { MAX_NAME_LENGTH, MAX_DESCRIPTION_LENGTH } from '../../consts/measures.js';
import { FILE_FORMATS } from '../../consts/structs.js';
import FormTitle from '../common/FormTitle.js';
import FormFileInput from '../common/FormFileInput.js';
import formStyle from '../../styles/formStyle.js';
import ConfirmDialog from '../common/ConfirmDialog.js';
import { NEW_MODE } from '../../consts/strings.js';

const newModeSchema = yup.object().shape({
  name: yup
    .string()
    .required('Name is required field')
    .test('len', `Must be less than ${MAX_NAME_LENGTH} characters`, (val) => val.length <= MAX_NAME_LENGTH),
  description: yup
    .string()
    .test(
      'len',
      `Must be less than ${MAX_DESCRIPTION_LENGTH} characters`,
      (val) => val.length <= MAX_DESCRIPTION_LENGTH
    ),
  cvFile: yup
    .mixed()

    .test('fileSelected', 'File is required', (value) => {
      return value && value.length > 0;
    })
    .test('fileSize', 'File is too large', (value) => {
      return value.length === 0 || (value.length > 0 && value[0].size < 3000000);
    })
    .test('type', 'Only doc, docx, pdf format supported', (value) => {
      return value.length === 0 || (value.length > 0 && FILE_FORMATS.includes(value[0].type));
    }),
});

const editModeSchema = yup.object().shape({
  name: yup
    .string()
    .required('Name is required field')
    .test('len', `Must be less than ${MAX_NAME_LENGTH} characters`, (val) => val.length <= MAX_NAME_LENGTH),
  description: yup
    .string()
    .test(
      'len',
      `Must be less than ${MAX_DESCRIPTION_LENGTH} characters`,
      (val) => val.length <= MAX_DESCRIPTION_LENGTH
    ),
  cvFile: yup
    .mixed()
    .test('fileSize', 'File is too large', (value) => {
      return value.length === 0 || (value.length > 0 && value[0].size < 3000000);
    })
    .test('type', 'Only doc, docx, pdf format supported', (value) => {
      return value.length === 0 || (value.length > 0 && FILE_FORMATS.includes(value[0].type));
    }),
});

const CvForm = ({ initName = '', initDescription = '', initFile = null, mode = 'new', saveCv, closeForm, classes }) => {
  const [data, setData] = useState(null);
  const [isAfterReset, setIsAfterReset] = useState(false);
  const [openDialog, setOpenDialog] = useState(false);

  const formObject = useForm({
    defaultValues: {
      cvFile: null,
    },
    mode: 'all',
    resolver: yupResolver(mode === NEW_MODE ? newModeSchema : editModeSchema),
  });

  const { handleSubmit, reset, watch, errors, clearErrors } = formObject;

  const file = watch('cvFile');

  const onSubmit = (data) => {
    if (mode === NEW_MODE) {
      if (data.cvFile.length > 0) saveCv(data.name, data.description, data.cvFile[0]);
      else saveCv(data.name, data.description, initFile);
      return;
    }
    setData(data);
    setOpenDialog(true);
  };

  const handleDialogOk = () => {
    //new File choosed
    if (data.cvFile.length > 0) saveCv(data.name, data.description, data.cvFile[0]);
    //edit instance with same file
    else saveCv(data.name, data.description, initFile);
    setOpenDialog(false);
  };

  const handleDialogCancel = () => {
    setOpenDialog(false);
  };

  const handleClose = () => {
    closeForm();
  };

  const handleReset = () => {
    reset({ name: '', description: '', cvFile: null });
    clearErrors();
    setIsAfterReset(true);
  };

  useEffect(() => {
    reset({ name: initName, description: initDescription, cvFile: null });
    setIsAfterReset(false);
  }, [initFile]);

  return (
    <FormProvider {...formObject}>
      <form className={classes.root} onSubmit={handleSubmit(onSubmit)} onReset={handleReset}>
        <FormTitle mode={mode} label='CV' handleClose={handleClose} />
        <FormInput name='name' label='Name' required={true} defaultValue={initName} errorobj={errors} />
        <FormInput
          name='description'
          label='Description'
          defaultValue={initDescription}
          required={false}
          errorobj={errors}
        />
        {/* <FormFileInput name='cvFile' errors={errors} initFile={initFile} /> */}
        <FormFileInput
          name='cvFile'
          errors={errors}
          isSelected={(file && file.length > 0) || (initFile && !isAfterReset)}
        />
        <div className={classes.submitContainer}>
          <MyButton name='Save' theme='dark' type='submit' />
          <MyButton name='Reset' theme='dark' type='reset' />
        </div>
      </form>
      <ConfirmDialog
        open={openDialog}
        dialogTitle='Update CV?'
        dialogText='All previous data will be updated'
        handleOk={handleDialogOk}
        handleClose={handleDialogCancel}
      />
    </FormProvider>
  );
};

export default withStyles(formStyle)(CvForm);
