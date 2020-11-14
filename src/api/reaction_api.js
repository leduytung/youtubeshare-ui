import AxiosClient from './axios_client';

class ReactionApi {
  react(params) {
    const url = 'secure/v1/reactions';
    return AxiosClient.post(url, params).then(res => {
      return {"status": true};
    })
    .catch(res => {
      return {"status": false};
    });
  };

  getReactions(params) {
    const url = 'secure/v1/reactions/list';
    return AxiosClient.post(url, params).then(res => {
      return res.data;
    })
    .catch(res => {
      return {"status": false};
    });
  };
}

const reactionApi = new ReactionApi();
export default reactionApi;
