import * as Actions from '../../actions';

const initialState = {
  token: null,
  username: null,
  firstName: null,
  lastName: null,
  roleName: null,
  roleId: null,
  emailId: null,
  mobileNo: null,
};

const auth = (state = initialState, action) => {
  switch (action.type) {
    case Actions.STORE_USER_DATA: {
      return {
        ...state,
        ...action.payload,
      };
    }
    case Actions.STORE_TOKEN: {
      return {
        ...state,
        token: action.payload,
      };
    }
    case Actions.SIGN_OUT: {
      return {
        token: null,
        username: null,
        firstName: null,
        lastName: null,
        roleName: null,
        roleId: null,
        emailId: null,
        mobileNo: null,
      };
    }
    default: {
      return state;
    }
  }
};

export default auth;
