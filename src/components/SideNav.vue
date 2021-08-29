<template>
  <section class="side-nav">
    <ul class="side-nav__links">
      <li class="side-nav__link">
        <font-awesome-icon icon="home" />
        <span>Home</span>
      </li>
      <li class="side-nav__link">
        <font-awesome-icon icon="th-large" />
        <span>Dashboard</span>
      </li>
      <li class="side-nav__link active">
        <font-awesome-icon icon="users" />
        <span>Manage Users</span>
      </li>
      <li class="side-nav__link">
        <font-awesome-icon icon="chart-line" />
        <span>Insights</span>
      </li>
    </ul>
  </section>
</template>

<script>
export default {
  // currently stubbed
};
</script>

<style lang="scss" scoped>
  .side-nav {

    &__links {
      padding: 24px;
    }

    &__link {
      margin-bottom: 40px;
      display: flex;
      align-items: center;
      color: #a3d6fd;;

      svg {
        width: 26px;
        height: 26px;
      }

      span {
        margin-left: 16px;
        font-size: 16px;
      }

      &.active {
        color: #11222f;

        svg {
          filter: drop-shadow(0px 0px 2px #dcefff);
        }

        span {
          text-shadow: 0 0 4px #dcefff;
        }
      }
    }
  }
</style>
