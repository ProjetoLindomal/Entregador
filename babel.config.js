module.exports = function(api) {
  api.cache(true);
  return {
    presets: ['babel-preset-expo', 'module:metro-react-native-babel-preset'],
    plugins: ["nativewind/babel"],
  };
};
// module.exports = {
//   presets: ['babel-preset-expo'],
//   plugins: ["nativewind/babel"],
//   };
