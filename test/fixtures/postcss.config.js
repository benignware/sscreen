module.exports = {
  plugins: [
    require('postcss-custom-media')({
      preserve: true
    }),
    require('postcss-prettify')()
  ],
};
