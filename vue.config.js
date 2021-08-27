module.exports = {
  css: {
    extract: {
      // This is to avoid warnings on build.
      // Since we use scoped styling, we should be fine to do this.
      ignoreOrder: true,
    },
    loaderOptions: {
      sass: {
        prependData: '@import "@/scss/global.scss";',
      },
    },
  },
};
