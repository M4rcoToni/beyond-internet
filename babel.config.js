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
            // "@ui/*": [
            //   "ui/*"
            // ],
            // "@screens/*": [
            //   "ui/screens/*"
            // ],
            // "@routes/*": [
            //   "ui/routes/*"
            // ],
            // "@components/*": [
            //   "ui/components/*"
            // ],
            // "@database/*": [
            //   "database/modules/*"
            // ],
            // "@assets/*": [
            //   "ui/assets/*"
            // ],
            '@ui': './src/ui',
            '@screens': './src/ui/screens',
            '@routes': './src/ui/routes',
            '@components': './src/ui/components',
            '@database': './src/database/modules',
            '@assets': './src/ui/assets',
            '@data': './src/data',
            '@sqlite': './sqlite',
          },
        },
      ],
    ],
  }
}
