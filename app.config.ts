import { ConfigContext, ExpoConfig } from '@expo/config'

export default ({ config }: ConfigContext): Partial<ExpoConfig> => ({
  ...config,
  plugins: [
    [
      'expo-build-properties',
      {
        android: {
          extraMavenRepos: [
            '../../node_modules/@notifee/react-native/android/libs',
          ],
        },
      },
    ],
  ],
})
