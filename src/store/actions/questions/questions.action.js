export const STORE_CURRENT_MODE = 'STORE_CURRENT_MODE';
export const STORE_CURRENT_CATEGORY = 'STORE_CURRENT_CATEGORY';
export const STORE_CURRENT_QUESTION = 'STORE_CURRENT_QUESTION';
export const STORE_CURRENTUSER_SCORE = 'STORE_CURRENTUSER_SCORE';

export function storeCurrentMode(modeId) {
  return {
    type: STORE_CURRENT_MODE,
    payload: modeId,
  };
}

export function storeCurrentCategory(categoryId) {
  return {
    type: STORE_CURRENT_CATEGORY,
    payload: categoryId,
  };
}

export function storeCurrentQuestion(questionId) {
  return {
    type: STORE_CURRENT_QUESTION,
    payload: questionId,
  };
}

export function storeCurrentUserScore(usernameAndScore) {
  return {
    type: STORE_CURRENTUSER_SCORE,
    payload: usernameAndScore,
  };
}
