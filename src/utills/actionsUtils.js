import { DEV } from '../consts/strings.js';

export const catchError = (err, dispatch, setError) => {
  if (!err.response) {
    dispatch(setError('Server not responding'));
  } else if (err.response.status === 409 || err.response.status === 400 || err.response.status === 401) {
    dispatch(setError(err.response.data.message));
  } else {
    dispatch(setError('ERROR'));
    process.env.NODE_ENV === DEV && console.log(`Unexpected error ${err}`);
  }
};
