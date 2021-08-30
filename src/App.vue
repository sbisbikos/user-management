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
          <b-select v-model="selectedSortOption" placeholder="Select a name" @input="fetchUsers(selectedSortOption)">
            <option value="-created">Date Created</option>
            <option value="firstname">FirstName Name</option>
            <option value="lastname">Last Name</option>
            <option value="country">Country</option>
            <option value="company">Company</option>
          </b-select>
          <b-button type="is-primary" @click="toggleAddUpdateUser">Add User</b-button>
          <b-button
            :type="hasUserSelected ? 'is-danger' : ''"
            :disabled="!hasUserSelected"
            @click="deleteUsersHandler">
              Delete
          </b-button>
        </div>
      </div>
      <user-info-titles />
      <!-- loading flag -->
      <!-- transition group -->
      <div class="user-manager__user-wrapper">
        <transition name="fade">
        <div v-if="!isLoading" class="user-manager__user-container">
          <user v-for="(user, index) in systemUsers"
            :key="user.id"
            :user-info="user"
            :index="index"
            :selectedUser="selectedUser"
            @user-activation="processUserHandler"
            @user-selected="setSelectedUser"
            @user-edit="toggleAddUpdateUser" />
        </div>
        </transition>
        <b-loading :is-full-page="false" v-model="isLoading" :can-cancel="false"></b-loading>
      </div>
    </section>
    <transition name="fade">
      <add-update-user
        v-if="isAddUpdateUserVisible"
        :user-info="userToEdit"
        @add-update-close="toggleAddUpdateUser"
        @user-changes="processUserHandler" />
    </transition>
  </div>
</template>

<script>
import { mapActions, mapState } from 'vuex';
import AppHeader from '@/components/AppHeader';
import SideNav from '@/components/SideNav';
import User from '@/components/User';
import AddUpdateUser from '@/components/AddUpdateUser';
import UserInfoTitles from '@/components/UserInfoTitles';

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
      selectedSortOption: '-created',
      isAddUpdateUserVisible: false,
      userToEdit: {},
    };
  },
  created() {
    this.fetchUsers();
  },
  computed: {
    ...mapState({
      systemUsers: (state) => state.systemUsers,
      isLoading: (state) => state.isLoading,
      selectedUser: (state) => state.selectedUser,
    }),
    hasUserSelected() {
      return this.selectedUser !== null;
    },
  },
  methods: {
    ...mapActions({
      fetchUsers: 'fetchUsers',
      processUserData: 'processUserData',
      deleteUser: 'deleteUser',
      updateSelectedUser: 'updateSelectedUser',
    }),
    deleteUsersHandler() {
      this.deleteUser(this.systemUsers[this.selectedUser]._id).then(() => {
        // clear checkboxes / reset selected users
        this.updateSelectedUser(-1);

        this.$buefy.toast.open({
          message: 'User has been deleted',
          type: 'is-warning',
        });
      });
    },
    processUserHandler(userData) {
      this.processUserData(userData).then((isUpdate) => {
        const message = isUpdate ? 'User updated' : 'User added';

        this.$buefy.toast.open({
          message,
          type: 'is-success',
        });
      });
    },
    setSelectedUser(value) {
      if (value.checked) {
        this.updateSelectedUser(value.index);
      } else {
        this.updateSelectedUser(-1);
      }
    },
    toggleAddUpdateUser(value = -1) {
      // if index is provided we update
      // this will also clear the edit object if we do a standard add
      this.userToEdit = Number.isInteger(value) && value > -1 ? this.systemUsers[value] : {};
      this.isAddUpdateUserVisible = !this.isAddUpdateUserVisible;
    },
  },
};
</script>

<style lang="scss" scoped>
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

  &__user-wrapper {
    position: relative;
    min-height: 300px;

    // Buefy overrides
    ::v-deep .loading-icon:after {
      border: 2px solid #50a1e1;
      border-right-color: transparent;
      border-top-color: transparent;
      width: 5em;
      height: 5em;
      border-width: 0.5em;
    }

    ::v-deep .loading-background {
      background-color: transparent;
    }
  }

  &__user-container {
    box-shadow: 0 2px 4px #b3bfca;
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

.fade-enter-active, .fade-leave-active {
  transition: opacity .7s;
}
.fade-enter, .fade-leave-to {
  opacity: 0;
}
</style>
