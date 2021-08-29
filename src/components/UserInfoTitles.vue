<template>
  <div class="info-titles">
    <div class="info-titles__select"></div>
    <div class="info-titles__active active-column">Active</div>
    <div class="info-titles__name column-stretch">Name</div>
    <div class="info-titles__email column-stretch">Email</div>
    <div class="info-titles__company column-stretch">Company</div>
    <div class="info-titles__country country-column">Country</div>
    <div class="info-titles__created created-column">Date Created</div>
    <div class="edit-column" />
  </div>
</template>

<script>
export default {

};
</script>

<style lang="scss" scoped>
  .info-titles {
    display: flex;
    margin: $spacing-unit-lg;
    text-align: center;
    font-weight: bold;

    &__select {
      @include content-auto-size(20px);
    }
  }
</style>
