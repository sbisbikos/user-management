import Vue from 'vue';
import Vuex from 'vuex';
import userApi from './apis/user.api';

Vue.use(Vuex);

const SET_USERS = 'SET_USERS';
const SET_IS_LOADING = 'SET_IS_LOADING';
const PROCESS_USER = 'PROCESS_USER';

export default new Vuex.Store({
  state: {
    users: [],
    isLoading: false,
  },
  actions: {
    fetchUsers({ commit }) {
      commit(SET_IS_LOADING, true);
      userApi.getUsers().then((response) => {
        setTimeout(() => {
          commit(SET_USERS, response.data);
          commit(SET_IS_LOADING, false);
        }, 1000);
      });
    },
    processUser({ commit }, user) {
      commit(PROCESS_USER, user);
    },
  },
  mutations: {
    [SET_USERS]: (state, users) => {
      state.users = users;
    },
    [SET_IS_LOADING]: (state, isLoading) => {
      state.isLoading = isLoading;
    },
    [PROCESS_USER]: (state, user) => {
      debugger;
      const userRecord = state.users.filter((u) => u.id === user.id).find((r) => r);
      const indexToUpdate = userRecord ? state.users.indexOf(userRecord) : -1;

      if (indexToUpdate > -1) {
        state.users[indexToUpdate] = user;
      } else {
        state.users.push(user);
      }
    },
  },
});
