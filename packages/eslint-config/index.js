module.exports = {
  extends: ['plugin:vue/vue3-recommended', 'airbnb-base'].concat(
    ['./import', './no', './base'].map(require.resolve)
  ),
  env: {
    browser: true,
    commonjs: true,
    es6: true,
    jest: true,
    node: true,
  },
  globals: {
    __ENV__: true,
  },
  rules: {},
}
