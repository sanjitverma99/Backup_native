import httpService from "./HttpService";

class QuestionsService {
  getAllQuestions = () => {
    // const encPassword = this.encryptData(password);
    return new Promise((resolve, reject) => {
      httpService
        .get("/api/questions/all", null)
        .then((data) => {
          resolve(data);
        })
        .catch((err) => {
          reject(err);
        });
    });
  };

  getNextQuestions = (currentModeId, currentCategoryId) => {
    return new Promise((resolve, reject) => {
      httpService
        .get(
          `/api/questions/${currentModeId}/${currentCategoryId}/nextSet`,
          null
        )
        .then((data) => {
          resolve(data);
        })
        .catch((err) => {
          reject(err);
          console.log(err);
        });
    });
  };

  sendQuestionResponse = (modeCode, questionCode, userResponse) => {
    return new Promise((resolve, reject) => {
      httpService
        .post(`/api/questions/response`, null, {
          params: { modeCode, questionCode, userResponse },
        })
        .then((data) => {
          resolve(data);
        })
        .catch((err) => {
          reject(err);
          console.log(err);
        });
    });
  };

  updateUserLevel = (category) => {
    return new Promise((resolve, reject) => {
      httpService
        .post(`/api/questions/updateUserLevel/${category}`, null)
        .then((data) => {
          resolve(data);
        })
        .catch((err) => {
          reject(err);
          console.log(err);
        });
    });
  };

  fetchTopScoredCategories = (count) => {
    return new Promise((resolve, reject) => {
      httpService
        .get(`/api/questions/fetchTopScoredCategories/${count}`, null)
        .then((data) => {
          resolve(data);
        })
        .catch((err) => {
          reject(err);
          console.log(err);
        });
    });
  };

  fetchCurrentLevel = (category) => {
    return new Promise((resolve, reject) => {
      httpService
        .get(`/api/questions/fetchCurrentLevel/${category}`, null)
        .then((data) => {
          resolve(data);
        })
        .catch((err) => {
          reject(err);
          console.log(err);
        });
    });
  };
}

const instance = new QuestionsService();
export default instance;
