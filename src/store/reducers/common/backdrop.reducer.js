import * as Actions from '../../actions';

const initialState = {
  enabled: false,
  message: undefined,
};

const backdrop = (state = initialState, action) => {
  switch (action.type) {
    case Actions.SHOW_MESSAGE: {
      return {
        enabled: true,
        message: action.payload,
      };
    }
    case Actions.HIDE_MESSAGE: {
      return {
        enabled: false,
        message: undefined,
      };
    }
    default: {
      return state;
    }
  }
};

export default backdrop;
