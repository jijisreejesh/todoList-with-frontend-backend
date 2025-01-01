import axios from "axios";
const instance = axios.create({
    baseURL: 'https://192.168.1.126:3000',
  });
  export default instance;