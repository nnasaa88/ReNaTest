module.exports = function (api) {
  api.cache(true);
  return {
    presets: ['babel-preset-expo'],
<<<<<<< HEAD
    plugins: [
      [
        'module-resolver',
        {
          extensions: ['.tsx', '.ts', '.js', '.json']
        },
      ],
      'react-native-reanimated/plugin'
    ]
=======
    plugins: ['react-native-reanimated/plugin'],
>>>>>>> 4ebae357f1484f51da9a2b6f4944a5505975e29a
  };
};