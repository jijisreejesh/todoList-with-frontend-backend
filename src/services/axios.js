import axios from "axios";
const instance = axios.create({
    baseURL: 'https://192.168.1.126:3000',
    headers: {'X-Custom-Header': 'foobar'}
  });
  export default instance;