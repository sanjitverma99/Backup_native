import * as Actions from "../../actions";

const initialState = {
  title: null,
  caseStatus: null,
  lastClickedDateTime: null,
  caseNo: null,
  STR: null,
};

const caseworkflow = (state = initialState, action) => {
  switch (action.type) {
    case Actions.STORE_CURRENT_TITLE: {
      return {
        ...state,
        data: action.payload,
      };
    }

    default: {
      return state;
    }
  }
};

export default caseworkflow;
