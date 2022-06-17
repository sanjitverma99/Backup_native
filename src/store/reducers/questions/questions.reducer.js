import * as Actions from '../../actions';

const initialState = {
  currentModeId: null,
  currentCategoryId: null,
  currentQuestionId: null,
  currentUserScore: {
    username: null,
    score: null,
  },
};

const questions = (state = initialState, action) => {
  switch (action.type) {
    case Actions.STORE_CURRENT_MODE: {
      return {
        ...state,
        currentModeId: action.payload,
      };
    }
    case Actions.STORE_CURRENT_CATEGORY: {
      return {
        ...state,
        currentCategoryId: action.payload,
      };
    }
    case Actions.STORE_CURRENT_QUESTION: {
      return {
        ...state,
        currentQuestionId: action.payload,
      };
    }
    case Actions.STORE_CURRENTUSER_SCORE: {
      return {
        ...state,
        currentUserScore: {
          username: action.payload[0],
          score: action.payload[1],
        },
      };
    }
    default: {
      return state;
    }
  }
};

export default questions;
