module.exports = function (api) {
  api.cache(true)
  return {
    presets: ['babel-preset-expo'],
    plugins: [
      'react-native-reanimated/plugin',
      [
        'module-resolver',
        {
          extensions: ['.ts', '.tsx'],
          root: ['./src'],
          alias: {
            '@shared': './src/shared',
            '@config': './src/config',
            '@modules': './src/modules',
            '@database': './src/database/modules',
          },
        },
      ],
    ],
  }
}
