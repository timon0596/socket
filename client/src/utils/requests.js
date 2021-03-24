import axios from 'axios';

const options = {
  withCredentials: true,
  headers: {
    'Access-Control-Allow-Origin': '*',
    'Content-Type': 'application/json',
  },
};
export const getRequest = (url) => axios.get(url, options);
export const postRequest = (url, data) => axios.post(url, data, options);
