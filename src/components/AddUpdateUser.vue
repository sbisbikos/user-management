<template>
  <section class="add-update" @click.self.stop="closeForm">
    <div class="add-update__container">
      <h2>{{ `${addOrUpdate} User` }}</h2>
      <div class="add-update__form">
          <b-field
          :type="$v.userData.firstname.$error ? 'is-danger' : ''"
          :message="$v.userData.firstname.$error ? 'First Name is Required' : ''">
          <b-input
            v-model="userData.firstname"
            placeholder="First Name" />
          </b-field>
          <b-field
          :type="$v.userData.lastname.$error ? 'is-danger' : ''"
          :message="$v.userData.lastname.$error ? 'Last Name is Required' : ''">
          <b-input
            v-model="userData.lastname"
            placeholder="Last Name"/>
          </b-field>
          <b-field
          :type="$v.userData.username.$error ? 'is-danger' : ''"
          :message="$v.userData.username.$error ? 'Username is Required' : ''">
          <b-input
            v-model="userData.username"
            placeholder="Username"/>
          </b-field>
          <b-field
          :type="$v.userData.email.$error ? 'is-danger' : ''"
          :message="$v.userData.email.$error ? 'Email is Required' : ''">
          <b-input
            v-model="userData.email"
            placeholder="Email" />
          </b-field>
          <b-field
          :type="$v.userData.company.$error ? 'is-danger' : ''"
          :message="$v.userData.company.$error ? 'Company is Required' : ''">
          <b-input
            v-model="userData.company"
            placeholder="Company" />
          </b-field>
          <b-field
          :type="$v.userData.addresses.postalCode.$error ? 'is-danger' : ''"
          :message="$v.userData.addresses.postalCode.$error ? 'Postal Code is Required' : ''">
          <b-input
            v-model="userData.addresses.postalCode"
            placeholder="Postal Code" />
          </b-field>
          <b-field
          :type="$v.userData.addresses.country.$error ? 'is-danger' : ''"
          :message="$v.userData.addresses.country.$error ? 'Country is Required' : ''">
          <b-input
            v-model="userData.addresses.country"
            placeholder="Country" />
          </b-field>
          <b-field
          :type="$v.userData.jobTitle.$error ? 'is-danger' : ''"
          :message="$v.userData.jobTitle.$error ? 'Job Title is Required' : ''">
          <b-input
            v-model="userData.jobTitle"
            placeholder="Title" />
          </b-field>
      </div>
      <div class="add-update__footer">
        <b-button type="is-primary" @click="processUser">{{ saveOrSubmit }}</b-button>
      </div>
    </div>
    <font-awesome-icon icon="times" class="add-update__close" @click="closeForm" />
  </section>
</template>

<script>
import { required } from 'vuelidate/lib/validators';
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
        firstname: '',
        lastname: '',
        username: '',
        email: '',
        company: '',
        addresses: {
          country: '',
          postalCode: '',
        },
        jobTitle: '',
      },
      initialUserData: {},
      errors: false,
    };
  },
  created() {
    if (this.isUpdate) {
      // copy to avoid passing by reference
      this.initialUserData = extensions.DeepCopy(this.userInfo);

      // flatten array so we don't need to deal with multiple addresses
      // eslint-disable-next-line prefer-destructuring
      this.initialUserData.addresses = this.initialUserData.addresses[0];

      // assign previous values to form
      Object.keys(this.userData).forEach((key) => { this.userData[key] = this.initialUserData[key]; });
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

      // validate form
      this.$v.userData.$touch();
      this.errors = this.$v.userData.$anyError;

      if (this.errors) {
        return;
      }

      if (this.isUpdate) {
        user = {
          data: {
            ...this.userData,
            addresses: [this.userData.addresses], // put addresses back
          },
          isUpdate: this.isUpdate,
          id: this.initialUserData._id,
        };
      } else {
        user = {
          data: {
            ...this.userData,
            addresses: [this.userData.addresses], // put addresses back
            activated: true,
          },
          isUpdate: this.isUpdate,
        };
      }

      this.$emit('user-changes', user);
      this.closeForm();
    },
    closeForm() {
      this.$emit('add-update-close');
    },
  },
  validations: {
    userData: {
      firstname: {
        required,
      },
      lastname: {
        required,
      },
      username: {
        required,
      },
      email: {
        required,
      },
      company: {
        required,
      },
      addresses: {
        country: {
          required,
        },
        postalCode: {
          required,
        },
      },
      jobTitle: {
        required,
      },
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

      // buefy override
      ::v-deep .field {
        margin-bottom: 0
      }
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
