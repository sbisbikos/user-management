<template>
  <section class="add-update" @click.self.stop="closeForm">
    <div class="add-update__container">
      <h2>{{ `${addOrUpdate} User` }}</h2>
      <div class="add-update__form">
          <b-input
            v-model="userData.firstName"
            placeholder="First Name" />
          <b-input
            v-model="userData.lastName"
            placeholder="Last Name"/>
          <b-input
            v-model="userData.email"
            placeholder="Email" />
          <b-input
            v-model="userData.company"
            placeholder="Company" />
          <b-input
            v-model="userData.city"
            placeholder="City" />
          <b-input
            v-model="userData.country"
            placeholder="Country" />
          <b-input
            v-model="userData.countryCode"
            placeholder="Country Code" />
          <b-input
            v-model="userData.title"
            placeholder="Title" />
      </div>
      <div class="add-update__footer">
        <b-button type="is-primary" @click="processUser">{{ saveOrSubmit }}</b-button>
      </div>
    </div>
    <font-awesome-icon icon="times" class="add-update__close" @click="closeForm" />
  </section>
</template>

<script>
import extensions from '@/extensions';

export default {
  props: {
    userInfo: {
      type: Object,
      required: false,
    },
  },
  data() {
    return {
      userData: {
        firstName: '',
        lastName: '',
        email: '',
        company: '',
        city: '',
        country: '',
        countryCode: '',
        title: '',
      },
      initialUserData: {},
    };
  },
  created() {
    debugger;
    if (this.isUpdate) {
      this.initialUserData = extensions.DeepCopy(this.userInfo);
      this.userData = { ...this.initialUserData };
    }
  },
  computed: {
    isUpdate() {
      return this.userInfo && Object.keys(this.userInfo).length;
    },
    addOrUpdate() {
      return this.isUpdate ? 'Update' : 'Add';
    },
    saveOrSubmit() {
      return this.isUpdate ? 'Save' : 'Submit';
    },
  },
  methods: {
    processUser() {
      let user;
      if (this.isUpdate) {
        debugger;
        user = { ...this.initialUserData, ...this.userData };
      } else {
        debugger;
        // create mock IP and ID
        const ipAddress = '127.0.0.1';
        const id = '1a2b3c4d5';
        const created = this.getCurrentDate();

        user = {
          ...this.userData,
          isActive: true,
          created,
          ipAddress,
          id,
        };
      }

      this.$emit('user-changes', user);
      this.closeForm();
    },
    getCurrentDate() {
      let currentDate = new Date();
      const dd = String(currentDate.getDate()).padStart(2, '0');
      const mm = String(currentDate.getMonth() + 1).padStart(2, '0');
      const yyyy = currentDate.getFullYear();

      currentDate = `${mm}/${dd}/${yyyy}`;

      return currentDate;
    },
    closeForm() {
      this.$emit('add-update-close');
    },
  },
};
</script>

<style lang="scss" scoped>
  .add-update {
    position: fixed;
    width: 100%;
    height: 100%;
    top: 0;
    left: 0;
    background-color: rgba(0, 0, 0, 0.5);
    z-index: 10000;

    &__container {
      position: absolute;
      top: 50%;
      left: 50%;
      width: 600px;
      transform: translate3d(-50%, -50%, 0);
      background-color: white;
      padding: $spacing-unit-lg;

      h2 {
        font-size: 20px;
        font-weight: bold;
      }
    }

    &__form {
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: $spacing-unit-lg;
      margin: $spacing-unit-med 0 $spacing-unit-lg;
    }

    &__footer {
      display: flex;
      justify-content: flex-end;
    }

    &__close {
      position: absolute;
      top: 10px;
      right: 10px;
      color: white;
      width: 34px;
      height: 34px;
      cursor: pointer;
    }
  }
</style>
