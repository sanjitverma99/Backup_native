import httpService from "./HttpService";

class OverviewService {
  getOverviewData = (userRole) => {
    return new Promise((resolve, reject) => {
      httpService
        .post("api/common/OverviewGraphdata/" + userRole)
        .then((data) => {
          resolve(data);
        })
        .catch((err) => {
          reject(err);
        });
    });
  };
}
const instance = new OverviewService();
export default instance;
