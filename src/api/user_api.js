import AxiosClient from './axios_client';

class UserApi {
  sign_in(params) {
    const url = 'public/v1/auth/sign_in';
    return AxiosClient.post(url, params).then(res => {
      return res.data["user"];
    })
    .then(user => {
      localStorage.setItem('FUNNY_MOVIE_TOKEN', user["authentication_token"]);
      localStorage.setItem('FUNNY_MOVIE_EMAIL', user["email"]);
      return user;
    })
    .catch(error => {
      // Process error
      console.log(error.response.data.error);
    })
  }

  sign_out(params) {
    const url = 'public/v1/auth/sign_out';
    return AxiosClient.delete(url, params).then(res => {
      return res;
    })
    .catch(error => {
      // Process error
      console.log(error.response.data.error);
    })
  }

  verify_token() {
    const url = 'secure/v1/users/verify_token';
    return AxiosClient.get(url).then(res => {
      return {"user": res.data, "signed_in": true};
    })
    .catch(error => {
      console.log(error.response.status);
      return {"user": null, "signed_in": false};
    })
  }
}

const user_api = new UserApi();
export default user_api;
