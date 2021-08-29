<template>
  <div id="app" class="user-manager">
    <header class="user-manager__header">
      <app-header />
    </header>
    <nav class="user-manager__nav">
      <side-nav />
    </nav>
    <section class="user-manager__content">
      <h1>User Management</h1>
      <div class="user-manager__toolbar">
        <div class="user-manager__search">
          <b-autocomplete
              rounded
              placeholder="e.g. FPO"
              icon="magnify"
              clearable >
              <template #empty>No results found</template>
          </b-autocomplete>
        </div>
        <div class="user-manager__actions">
          <b-select placeholder="Select a name">
                  <option
                      v-for="option in data"
                      :value="option.id"
                      :key="option.id">
                      {{ option.user.first_name }}
                  </option>
          </b-select>
          <b-button type="is-primary" @click="toggleAddUpdateUser">Add User</b-button>
          <b-button
            :type="hasUsersSelected ? 'is-danger' : ''"
            :disabled="!hasUsersSelected">
              Delete
          </b-button>
        </div>
      </div>
      <user-info-titles />
      <!-- loading flag -->
      <!-- transition group -->
      <div class="user-manager__user-container">
        <user v-for="(user, index) in users"
          :key="index"
          :user-info="user"
          :index="index"
          @user-selected="setSelectedUser($event)"
          @user-edit="toggleAddUpdateUser" />
      </div>
      <!--  <user v-for="(user, index) in users" :key="index" :user-info="user" index="index" /> user sends emitter to delete  -->
    </section>
    <add-update-user
    v-if="isAddUpdateUserVisible"
    :user-info="userToEdit"
    @add-update-close="toggleAddUpdateUser"
    @user-changes="processUser" />
  </div>
</template>

<script>
import { mapActions, mapState } from 'vuex';
import AppHeader from '@/components/AppHeader';
import SideNav from '@/components/SideNav';
import User from '@/components/User';
import AddUpdateUser from '@/components/AddUpdateUser';
import UserInfoTitles from '@/components/UserInfoTitles';
import extensions from '@/extensions';

export default {
  name: 'app',
  components: {
    AppHeader,
    SideNav,
    User,
    UserInfoTitles,
    AddUpdateUser,
  },
  data() {
    return {
      selectedUsers: [],
      isAddUpdateUserVisible: false,
      userToEdit: {},
    };
  },
  created() {
    this.fetchUsers();
  },
  computed: {
    ...mapState({
      users: (state) => state.users,
    }),
    hasUsersSelected() {
      return this.selectedUsers.length > 0;
    },
  },
  methods: {
    ...mapActions({
      fetchUsers: 'fetchUsers',
      processUser: 'processUser',
    }),
    setSelectedUser(value) {
      if (value.checked) {
        this.selectedUsers.push(value.index);
      } else {
        extensions.RemoveValueFromArray(value.index, this.selectedUsers);
      }
    },
    toggleAddUpdateUser(value = -1) {
      // if index is provided we update
      // this will also clear the object is we do a standard add
      this.userToEdit = Number.isInteger(value) && value > -1 ? this.users[value] : {};
      const test = !this.isAddUpdateUserVisible;
      this.isAddUpdateUserVisible = test;
    },
  },
};
</script>

<style lang="scss">
#app {
  font-family: 'Roboto', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: $text-color;
}

.user-manager {
  display: grid;
  grid-template-areas:
  "header header"
  "side-nav content";
  height: 100vh;
  grid-template-columns: 300px 1fr;
  grid-template-rows: auto 1fr;

  &__header {
    grid-area: header;
    background-color: #11222f;
    padding: 12px 24px;
    box-shadow: 0 0 10px #474d52;
    position: relative;
    z-index: 2;
  }

  &__nav {
    grid-area: side-nav;
    width: 100%;
    height: 100%;
    background-color: #50A1E1;
    position: relative;
    z-index: 1;
    box-shadow: 0 0 9px #5c6469;
  }

  &__toolbar {
    background-color: white;
    box-shadow: 0 2px 4px #b3bfca;
    display: flex;
    padding: $spacing-unit-lg;
    justify-content: space-between;
  }

  &__search {
    flex: 0 0 300px;
  }

  &__actions {
    flex: 0 0 auto;
    display: flex;

    > * {
      margin-left: 24px;
    }
  }

  &__content {
    grid-area: content;
    background-color: #d3e0ea;
    padding: 40px 50px 50px;

    > h1 {
      font-size: 30px;
      font-weight: 600;
      margin-bottom: 8px;
    }
  }
}
</style>
