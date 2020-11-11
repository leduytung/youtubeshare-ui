import axiosClient from './axiosClient';

class MovieApi {
  getAll = (params) => {
    const url = 'public/v1/movies';
    return axiosClient.get(url, { params });
  };
}

const movieApi = new MovieApi();
export default movieApi;
