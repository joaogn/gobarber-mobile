import axios from 'axios';

const api = axios.create({
  baseURL: 'https://gobarber.api.joaogn.com',
});

export default api;
