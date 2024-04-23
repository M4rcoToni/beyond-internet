jest.mock('@react-navigation/native', () => {
  return {
    useNavigation: () => ({
      navigate: jest.fn(),
      dispatch: jest.fn(),
    }),
    NavigationContainer: ({ children }: { children: React.ReactNode }) =>
      children,
  }
})
