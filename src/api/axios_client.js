import axios from 'axios';
import queryString from 'query-string';

const AxiosClient = axios.create({
  baseURL: process.env.REACT_APP_API_URL,
  headers: {
    'content-type': 'application/json',
    'Access-Control-Allow-Origin': '*'
  },
  paramsSerializer: (params) => queryString.stringify(params),
});
export default AxiosClient;
