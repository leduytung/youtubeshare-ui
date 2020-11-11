import AxiosClient from './axios_client';

class UserApi {
  sign_in = (params) => {
    const url = 'public/api/v1/auth/sign_in';
    return AxiosClient.post(url, params).then(res => {
      return res.data;
    })
    .then(data => {
      localStorage.setItem('FUNNY_MOVIE_TOKEN', data["authentication_token"])
      // localStorage.getItem('itemName')
      return data
    })
    .catch(error => {
      console.log(error.response.data.error)
    })
  };
}

const user_api = new UserApi();
export default user_api;
