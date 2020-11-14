import AxiosClient from './axios_client';

class UserApi {
  getUserEmails(params) {
    const url = 'public/v1/users/emails';
    return AxiosClient.post(url, params).then(res => {
      return res.data;
    })
    .catch(res => {
      return {"status": false};
    });
  }
}

const userApi = new UserApi();
export default userApi;
