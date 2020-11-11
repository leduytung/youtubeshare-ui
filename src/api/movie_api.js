import AxiosClient from './axios_client';

class MovieApi {
  getAll = (params) => {
    const url = 'public/v1/movies';
    return AxiosClient.get(url, { params });
  };
}

const movie_api = new MovieApi();
export default movie_api;
