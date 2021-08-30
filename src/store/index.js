import Vue from 'vue';
import Vuex from 'vuex';
import userApi from './apis/user.api';
import extensions from '@/extensions';

Vue.use(Vuex);

const ADD_SYSTEM_USER = 'ADD_SYSTEM_USER';
const UPDATE_SYSTEM_USER = 'UPDATE_SYSTEM_USER';
const UPDATE_SELECTED_USER = 'UPDATE_SELECTED_USER';
const SET_SYSTEM_USERS = 'SET_SYSTEM_USERS';
const SET_IS_LOADING = 'SET_IS_LOADING';
const DELETE_USERS = 'DELETE_USERS';

export default new Vuex.Store({
  state: {
    systemUsers: [],
    users: [],
    isLoading: false,
    selectedUser: -1,
  },
  actions: {
    fetchUsers({ commit }, sortBy = '-created') {
      commit(SET_IS_LOADING, true);
      userApi.getSystemUsers(sortBy).then((response) => {
        commit(SET_SYSTEM_USERS, response.data.results);
        commit(SET_IS_LOADING, false);
      });
    },
    processUserData({ commit }, userData) {
      return new Promise((resolve, reject) => {
        commit(SET_IS_LOADING, true);

        if (userData.isUpdate) {
          userApi.updateSystemUser(userData.data, userData.id)
            .then((response) => {
              resolve(userData.isUpdate);
              commit(UPDATE_SYSTEM_USER, response.data);
              commit(SET_IS_LOADING, false);
            })
            .catch(() => {
              reject();
            });
        } else {
          userApi.createSystemUser(userData.data)
            .then((response) => {
              resolve(userData.isUpdate);
              commit(ADD_SYSTEM_USER, response.data);
              commit(SET_IS_LOADING, false);
            })
            .catch(() => {
              reject();
            });
        }
      });
    },
    deleteUser({ commit }, userId) {
      commit(SET_IS_LOADING, true);

      return new Promise((resolve, reject) => {
        userApi.deleteUser(userId).then((response) => {
          resolve();
          commit(DELETE_USERS, response.data);
          commit(SET_IS_LOADING, false);
        }).catch(() => {
          reject();
        });
      });
    },
    updateSelectedUser({ commit }, value) {
      commit(UPDATE_SELECTED_USER, value);
    },
  },
  mutations: {
    [ADD_SYSTEM_USER]: (state, user) => {
      state.systemUsers = [...state.systemUsers, user];
    },
    [UPDATE_SYSTEM_USER]: (state, user) => {
      const index = state.systemUsers.findIndex((u) => u._id === user._id);
      state.systemUsers[index] = user;
    },
    [UPDATE_SELECTED_USER]: (state, value) => {
      state.selectedUser = value;
    },
    [SET_SYSTEM_USERS]: (state, users) => {
      state.systemUsers = users;
    },
    [SET_IS_LOADING]: (state, isLoading) => {
      state.isLoading = isLoading;
    },
    [DELETE_USERS]: (state, user) => {
      const index = state.systemUsers.findIndex((u) => u._id === user._id);
      const updatedUsersList = extensions.DeepCopy(state.systemUsers);
      updatedUsersList.splice(index, 1);

      state.systemUsers = [...updatedUsersList];
    },
  },
});
