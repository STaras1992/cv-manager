import {} from '../consts/actionTypes.js';

const initState = {
  firstName: 'Stas',
  lastName: 'Tarasenko',
  portfolioLink: 'http://18.193.76.149/',
};

const userReducer = (state = initState, action) => {
  switch (action.type) {
    default:
      return state;
  }
};

export default userReducer;
