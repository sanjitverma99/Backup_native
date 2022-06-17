/* eslint-disable no-undef */
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";
import store from "../store";

class HttpService {
  getToken = async () => {
    try {
      const value = await AsyncStorage.getItem("QDE_Persieve");
      if (value !== null) {
        return value;
      }
    } catch (error) {
      // Error fetching Token
    }
    return undefined;
  };

  storeToken = async (data) => {
    try {
      await AsyncStorage.setItem("QDE_Persieve", JSON.stringify(data.token));
    } catch (error) {
      // Error saving data
    }
  };

  http = () => {
    let url;

    if (__DEV__) {
      // url = "https://knowhow.qde.ai";
      // url = "http://s4-kf3.ashish-siddarth.compassapp-native.exp.direct:9000";

      url = "http://10.177.60.156:9000";

    } else {
      X;
      url = "https://knowhow.qde.ai/";
    }

    const service = axios.create({
      baseURL: url,
    });

    const accessToken = store.getState().auth.auth.token;
    if (accessToken && accessToken !== null) {
      service.defaults.headers.common.Authorization = `Bearer ${accessToken}`;
    }
    return service;
  };

  get = (url, data) => {
    return new Promise((resolve, reject) => {
      this.http()
        .get(url, data)
        .then((response) => {
          resolve(response.data);
        })
        .catch((error) => {
          reject(error);
        });
    });
  };

  post = (url, data, config) => {
    return new Promise((resolve, reject) => {
      this.http()
        .post(url, data, config)
        .then((response) => {
          resolve(response.data);
        })
        .catch((error) => {
          reject(error);
        });
    });
  };

  put = (url, data, config) => {
    return new Promise((resolve, reject) => {
      this.http()
        .put(url, data, config)
        .then((response) => {
          resolve(response.data);
        })
        .catch((error) => {
          reject(error);
        });
    });
  };
}

const instance = new HttpService();
export default instance;
