import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { makeStyles, withStyles } from '@material-ui/core/styles';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import Container from '@material-ui/core/Container';
import { useForm, Controller, FormProvider } from 'react-hook-form';
import InputTextField from '../common/InputTextField.js';
import MyButton from '../common/MyButton.js';
import FormSelect from '../common/FormSelect.js';
import FormInput from '../common/FormInput.js';
import { getAllCvs } from '../../actions/cvActions.js';
import { getAllCovers } from '../../actions/coverActions.js';
import { MAX_NAME_LENGTH, MAX_DESCRIPTION_LENGTH } from '../../consts/measures.js';
import FormTitle from '../common/FormTitle.js';
import formStyle from '../../styles/formStyle.js';
import ConfirmDialog from '../common/ConfirmDialog.js';

const schema = yup.object().shape({
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
  cvSelect: yup.string().required('Please select cv'),
  coverSelect: yup.string().required('Please select cover'),
});

// const useStyles = makeStyles((theme) => ({
//   // root: {
//   //   width: '100%',
//   //   display: 'flex',
//   //   flexDirection: 'column',
//   //   justifyContent: 'flex-start',
//   // },
//   // formControll: {},
//   // textField: {
//   //   width: '80%',
//   //   '& .MuiTextField-root': {
//   //     color: 'white',
//   //     borderColor: 'white',
//   //   },
//   // },
//   // selectField: {
//   //   width: '50%',
//   // },
//   // formTitle: {
//   //   margin: '50px 0',
//   // },
// }));

const TemplateForm = ({
  initName = '',
  initDescription = '',
  initCvId = '',
  initCoverId = '',
  mode = 'new',
  saveTemplate,
  closeForm,
  classes,
}) => {
  // const classes = useStyles();
  const dispatch = useDispatch();
  const [data, setData] = useState(null);
  const cvList = useSelector((state) => state.cv.items.map((item) => ({ id: item.id, name: item.name })));
  const coverList = useSelector((state) => state.cover.items.map((item) => ({ id: item.id, name: item.name })));
  const [openDialog, setOpenDialog] = useState(false);

  const formObject = useForm({
    mode: 'all',
    resolver: yupResolver(schema),
  });

  const { handleSubmit, reset, control, register, errors, clearErrors } = formObject;

  const onSubmit = (formData) => {
    if (mode === 'new') {
      saveTemplate(formData.name, formData.description, formData.cvSelect, formData.coverSelect);
      return;
    }
    setData({
      name: formData.name,
      description: formData.description,
      cv: formData.cvSelect,
      cover: formData.coverSelect,
    });
    setOpenDialog(true);
  };

  const handleDialogOk = () => {
    saveTemplate(data.name, data.description, data.cv, data.cover);
    setOpenDialog(false);
  };

  const handleDialogCancel = () => {
    setOpenDialog(false);
  };

  const handleReset = () => {
    reset({ name: '', description: '', cvSelect: '', coverSelect: '' });
    clearErrors();
  };

  const handleClose = () => {
    closeForm();
  };

  useEffect(() => {
    if (cvList.length === 0) dispatch(getAllCvs());
    if (coverList.length === 0) dispatch(getAllCovers());
  }, []);

  useEffect(() => {
    // console.log('initCvId:', initCvId);
    // console.log('initCoverId:', initCoverId);
    // console.log('cvList:', cvList);
    // console.log('coverList:', coverList);
    reset({ name: initName, description: initDescription, cvSelect: initCvId, coverSelect: initCoverId });
  }, [initName, initCvId, initDescription, initCoverId]);

  return (
    <FormProvider {...formObject}>
      <form className={classes.root} onSubmit={handleSubmit(onSubmit)} onReset={handleReset}>
        {/* <Container className={classes.root}> */}
        <FormTitle mode={mode} label='template' handleClose={handleClose} />
        <FormInput name='name' label='Name' required={true} defaultValue={initName} errorobj={errors} />
        <FormInput
          name='description'
          label='Description'
          defaultValue={initDescription}
          required={false}
          errorobj={errors}
        />
        <FormSelect
          name='cvSelect'
          label='Cv'
          options={cvList}
          defaultValue={initCvId}
          required={true}
          errorobj={errors}
        />
        <FormSelect
          name='coverSelect'
          label='Cover'
          options={coverList}
          defaultValue={initCoverId}
          required={true}
          errorobj={errors}
        />
        <div className={classes.submitContainer}>
          <MyButton name='Save' theme='dark' type='submit' />
          <MyButton name='Reset' theme='dark' type='reset' />
        </div>
        {/* </Container> */}
      </form>
      <ConfirmDialog
        open={openDialog}
        dialogTitle='Update template?'
        dialogText='All previus data will be updated'
        handleOk={handleDialogOk}
        handleClose={handleDialogCancel}
      />
    </FormProvider>
  );
};

export default withStyles(formStyle)(TemplateForm);
