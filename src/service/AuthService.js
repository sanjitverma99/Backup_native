import httpService from './HttpService';

class AuthService {
  checkAuthentication = () => {
    const token = httpService.getToken();

    if (!token) {
      return false;
    }

    return false;
  };

  handleAuthentication = () => {
    return new Promise((resolve, reject) => {
      if (!this.checkAuthentication()) {
        resolve(false);
      }

      this.signInWithToken()
        .then((data) => {
          resolve(data);
        })
        .catch((err) => {
          reject(err);
        });
    });
  };

  signInWithToken = () => {
    return httpService.get('/api/user');
  };

  signInWithUsernamePassword = ({ username, password }) => {
    // const encPassword = this.encryptData(password);
    return new Promise((resolve, reject) => {
      httpService
        .post('/public/login', null, { params: { username, password } })
        .then((data) => {
          httpService.storeToken(data);
          resolve(data);
        })
        .catch((err) => {
          reject(err);
        });
    });
  };

  signOut = () => {
    return httpService.post('/api/logout');
  };

  /*
  encryptData = (plaintext) => {
    const iv = crypto.randomBytes(16);
    const key = crypto.pbkdf2Sync('QDEKEY1234543210', iv, 65536, 16, 'sha1');
    const cipher = crypto.createCipheriv('aes-128-gcm', key, iv);
    const encrypted = Buffer.concat([cipher.update(plaintext), cipher.final()]);
    const tag = cipher.getAuthTag();
    return Buffer.concat([iv, encrypted, tag]).toString('base64');
  };
  */
}

const instance = new AuthService();
export default instance;
