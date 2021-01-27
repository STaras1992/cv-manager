import MuiAlert from '@material-ui/lab/Alert';

function Alert(props) {
  return <MuiAlert elevation={6} style={{ fontSize: '30px' }} variant='filled' {...props} />;
}

export default Alert;
