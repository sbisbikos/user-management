<template>
 <section class="app-header">
   <logo />
   <div class="app-header__account">
    <span>Steven Bisbikos</span>
    <div class="app-header__account-img" />
   </div>
 </section>
</template>

<script>
import Logo from '@/assets/logo.svg';

export default {
  components: {
    Logo,
  },
};
</script>

<style lang="scss" scoped>
  .app-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    svg {
      fill: white;
      height: 42px;
      color: white;
      position: relative;
    }

    &__account {
      display: flex;
      align-items: center;

      span {
        color: white;
        margin-right: $spacing-unit-lg;
        font-size: 18px;
      }
    }

    &__account-img {
    width: 50px;
    height: 50px;
    border-radius: 9999px;
    background: center / contain no-repeat url("../assets/steve.jpg");
  }
  }
</style>
