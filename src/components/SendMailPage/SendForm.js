import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { makeStyles, withStyles } from '@material-ui/core/styles';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import Container from '@material-ui/core/Container';
import { useForm, Controller, FormProvider } from 'react-hook-form';
import InputTextField from '../common/InputTextField.js';
import MyButton from '../common/MyButton.js';
import TextField from '@material-ui/core/TextField';
import FormSelect from '../common/FormSelect.js';
import FormInput from '../common/FormInput.js';
import { getAllCvs } from '../../actions/cvActions.js';
import { getAllCovers } from '../../actions/coverActions.js';
import { getAllMyTemplates } from '../../actions/templateActions.js';
import { MAX_NAME_LENGTH, MAX_DESCRIPTION_LENGTH } from '../../consts/measures.js';
import FormTitle from '../common/FormTitle.js';
import formStyle from '../../styles/formStyle.js';

const useStyles = makeStyles((theme) => ({
  useCvCoverContainer: {
    width: '80%',
    [theme.breakpoints.down('xs')]: {
      width: '100%',
    },
  },
}));

const schema = yup.object().shape({
  to: yup.string().required('Recipient email adress is required').email('Bad email adress'),
  from: yup.string().required('Sender email adress is required').email('Bad email adress'),
  subject: yup.string().test('len', `Must be less than 80 characters`, (val) => val.length <= 80),
  cv: yup.string().required('Cv is required'),
  cover: yup.string(),
  template: yup.string(),
});

const defaultValues = {
  to: '',
  from: '',
  subject: '',
  cv: '',
  cover: '',
  template: '',
};

const SendForm = ({ makeMail, classes }) => {
  const myClasses = useStyles();
  const dispatch = useDispatch();

  const cvOptions = useSelector((state) => state.cv.items.map((item) => ({ id: item.id, name: item.name })));
  const coverOptions = useSelector((state) => state.cover.items.map((item) => ({ id: item.id, name: item.name })));
  const templateOptions = useSelector((state) =>
    state.template.items.map((item) => ({ id: item.id, name: item.name }))
  );
  //const [selectedTemplate, setSelectedTemplate] = useState('');

  const formObject = useForm({
    mode: 'all',
    resolver: yupResolver(schema),
  });
  const { handleSubmit, reset, control, register, setValue, errors, watch, clearErrors } = formObject;

  const template = watch('template');

  const selectedTemplate = useSelector((state) => state.template.items.find((item) => item.id === template));

  const onSubmit = (data) => {
    console.log(data);
    makeMail(data);
  };

  const onReset = () => {
    reset(defaultValues);
    clearErrors();
  };

  useEffect(() => {
    dispatch(getAllCvs());
    dispatch(getAllCovers());
    dispatch(getAllMyTemplates());
  }, []);

  useEffect(() => {
    if (selectedTemplate) {
      setValue('cv', selectedTemplate.cv);
      setValue('cover', selectedTemplate.cover);
    }
  }, [selectedTemplate]);

  return (
    <FormProvider {...formObject}>
      <form className={classes.root} onSubmit={handleSubmit(onSubmit)} onReset={onReset}>
        {/* <Container className={classes.root}> */}
        <FormInput name='to' label='To' required={true} errorobj={errors} defaultValue='' />
        <FormInput name='from' label='From' required={true} errorobj={errors} defaultValue='' />
        <FormInput name='subject' label='Subject' required={false} errorobj={errors} defaultValue='' />
        <div className={myClasses.useTemplateContainer}>
          <FormSelect name='template' label='Template' options={templateOptions} defaultValue='' />
        </div>
        <div className={myClasses.useCvCoverContainer}>
          <FormSelect name='cv' label='Cv' options={cvOptions} required={true} errorobj={errors} defaultValue='' />
          <FormSelect
            name='cover'
            label='Cover'
            options={coverOptions}
            required={false}
            errorobj={errors}
            defaultValue=''
          />
        </div>
        <div className={classes.submitContainer}>
          <MyButton name='Preview' theme='dark' type='submit' />
        </div>
        {/* </Container> */}
      </form>
    </FormProvider>
  );
};

export default withStyles(formStyle)(SendForm);
