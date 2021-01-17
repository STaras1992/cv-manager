import {} from '../consts/actionTypes.js';

const initState = {
  firstName: 'Stas',
  lastName: 'Tarasenko',
  website: 'http://18.193.76.149/',
  email: 'stas23061992@gmail.com',
};

const userReducer = (state = initState, action) => {
  switch (action.type) {
    default:
      return state;
  }
};

export default userReducer;
