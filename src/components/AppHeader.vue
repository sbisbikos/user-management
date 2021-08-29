<template>
 <section class="app-header">
   <logo />
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
    svg {
      fill: white;
      height: 42px;
      color: white;
      position: relative;
    }
  }
</style>
