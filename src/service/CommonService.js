import httpService from "./HttpService";

class CommonService {
  capitalize = (str) => {
    return str.charAt(0).toUpperCase() + str.slice(1);
  };

  sendInviteMail = (to, cc, subject, content) => {
    return new Promise((resolve, reject) => {
      httpService
        .post(`/api/common/sendEmail`, null, {
          params: { to, cc, subject, content },
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

  createUser = (formData) => {
    return new Promise((resolve, reject) => {
      httpService
        .post(`/public/createUser`, formData, null)
        .then((data) => {
          resolve(data);
        })
        .catch((err) => {
          reject(err);
          console.log(err);
        });
    });
  };

  generateOTP = (emailId) => {
    return new Promise((resolve, reject) => {
      httpService
        .post(`/public/generateOTP`, null, { params: { emailId } })
        .then((data) => {
          resolve(data);
        })
        .catch((err) => {
          reject(err);
          console.log(err);
        });
    });
  };

  changePasswordOTP = (formData) => {
    return new Promise((resolve, reject) => {
      httpService
        .post(`/public/changePasswordOTP`, formData, null)
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

const instance = new CommonService();
export default instance;
