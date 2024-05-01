import axios from 'axios';

const client = axios.create({
  // baseURL: `${import.meta.env.VITE_SERVER_URL}api/`,
  baseURL: "http://127.0.0.1:8000",
  // headers: {
  //   'Content-Type': 'application/json',
  // },
  // withCredentials: true,
});

export default client;
