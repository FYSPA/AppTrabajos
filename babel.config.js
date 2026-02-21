module.exports = function (api) {
  api.cache(true);
  return {
    presets: ["babel-preset-expo"],
    // QUITA el bloque de plugins que añadiste
    plugins: [],
  };
};
