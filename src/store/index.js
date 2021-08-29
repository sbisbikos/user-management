import Vue from 'vue';
import Vuex from 'vuex';
import userApi from './apis/user.api';

Vue.use(Vuex);

const GET_USERS = 'GET_USERS';
const SET_IS_LOADING = 'SET_IS_LOADING';

export default new Vuex.Store({
  state: {
    users: {},
    isLoading: false,
  },
  actions: {
    fetchUsers({ commit }) {
      commit(SET_IS_LOADING, true);
      userApi.getUsers().then((response) => {
        setTimeout(() => {
          commit(GET_USERS, response.data);
          commit(SET_IS_LOADING, false);
        }, 1000);
      });
    },
  },
  mutations: {
    [GET_USERS]: (state, users) => {
      state.users = users;
    },
    [SET_IS_LOADING]: (state, isLoading) => {
      state.isLoading = isLoading;
    },
  },
});
