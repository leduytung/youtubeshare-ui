import AxiosClient from './axios_client';

class MovieApi {
  getAllMovies(params) {
    let token = localStorage.getItem('FUNNY_MOVIE_TOKEN')
    const url = token ? 'secure/v1/movies' : 'public/v1/movies';
    return AxiosClient.get(url, { params });
  };

  createMovie(params) {
    const url = 'secure/v1/movies';
    return AxiosClient.post(url, params).then(res => {
      return {"status": true};
    })
    .catch(res => {
      return {"status": false};
    });;
  };
}

const movieApi = new MovieApi();
export default movieApi;
