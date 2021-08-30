import axios from 'axios';

export default {
  getSystemUsers(sort) {
    return axios({
      method: 'get',
      url: `${process.env.VUE_APP_ROOT_API}systemusers`,
      params: {
        sort,
      },
    });
  },
  createSystemUser(data) {
    return axios({
      method: 'post',
      url: `${process.env.VUE_APP_ROOT_API}systemusers`,
      data,
    });
  },
  updateSystemUser(data, userId) {
    return axios({
      method: 'put',
      url: `${process.env.VUE_APP_ROOT_API}systemusers/${userId}`,
      data,
    });
  },
  deleteUser(userId) {
    return axios({
      method: 'delete',
      url: `${process.env.VUE_APP_ROOT_API}systemusers/${userId}`,
    });
  },
};
