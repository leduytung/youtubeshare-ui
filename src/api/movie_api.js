import AxiosClient from './axios_client';

class MovieApi {
  getAllMovies(params, signed_in) {
    const url = signed_in ? 'public/v1/movies' : 'secure/v1/movies';
    return AxiosClient.get(url, { params });
  };
}

const movie_api = new MovieApi();
export default movie_api;
