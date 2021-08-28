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
      <!-- add goes here -->
      </div>
      <div class="user-manager__column-titles">
        <div>Title 1</div>
        <div>Title 1</div>
        <div>Title 1</div>
        <div>Title 1</div>
        <div>Title 1</div>
      </div>
      <!-- loading flag -->
      <!-- transition group -->
      <!--  <user v-for="(user, index) in users" :key="index" :user-info="user" index="index" /> user sends emitter to delete  -->
    </section>
  </div>
</template>

<script>
import AppHeader from '@/components/AppHeader';
import SideNav from '@/components/SideNav';

export default {
  name: 'App',
  components: {
    AppHeader,
    SideNav,
  },
};
</script>

<style lang="scss">
#app {
  font-family: 'Roboto', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}

.user-manager {
  display: grid;
  grid-template-areas: 
  "header header"
  "side-nav content";
}
</style>
