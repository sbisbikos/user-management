<template>
  <div v-if="userInfo" class="user">
    <div class="user__select">
      <b-field>
        <b-checkbox @input="sendUserEvent($event)"/>
      </b-field>
    </div>
    <div class="user_active active-column">
      <b-field>
        <b-switch :value="userInfo.isActive" @input="changeActive($event)"/>
      </b-field>
    </div>
    <div class="user__name column-stretch">
      {{ `${userInfo.firstName} ${userInfo.lastName}` }}
    </div>
    <div class="user__email column-stretch">
      {{ userInfo.email }}
    </div>
    <div class="user__company column-stretch">
      {{ userInfo.company }}
    </div>
    <div class="user__country country-column">
      {{ userInfo.countryCode }}
    </div>
    <div class="user__created created-column">
      {{ userInfo.created }}
    </div>
    <div class="user__edit edit-column">
      <font-awesome-icon @click="$emit('user-edit', index)" icon="edit"/>
    </div>
  </div>
</template>

<script>
import extensions from '@/extensions';

export default {
  props: {
    userInfo: {
      type: Object,
      required: true,
    },
    index: {
      type: Number,
      required: true,
    },
  },
  methods: {
    changeActive(value) {
      debugger;
      const user = extensions.DeepCopy(this.userInfo);
      this.updateUser({ ...user, isActive: value });
    },
    updateUser(user) {
      this.$emit('update-user', user);
    },
    sendUserEvent(value) {
      const eventData = {
        checked: value,
        index: this.index,
      };
      this.$emit('user-selected', eventData);
    },
  },
};
</script>

<style lang="scss" scoped>
  .user {
    background-color: white;
    display: flex;
    align-items: center;
    padding: $spacing-unit-lg;
    text-align: center;

    &__select {
      // buefy spacing overrides
      ::v-deep .b-checkbox.checkbox:not(.button){
        margin-right: 0;
      }
      ::v-deep .b-checkbox.checkbox .control-label {
        padding-left: 0;
      }
    }

    &__edit {
      transform: scale(1.5);
      color: $blue-accent;
      cursor: pointer;

      &:hover {
        color: $buefy-accent;
      }
    }
  }
</style>
