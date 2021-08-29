import axios from 'axios';

export default {
  getUsers() {
    return axios.get('/data/users.json');
  },
};
