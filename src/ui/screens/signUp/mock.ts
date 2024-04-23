// jest.mock('../foo-bar-baz', () => {
//   const originalModule = jest.requireActual('../foo-bar-baz');
//
//   //Mock the default export and named export 'foo'
//   return {
//     __esModule: true,
//     ...originalModule,
//     default: jest.fn(() => 'mocked baz'),
//     foo: 'mocked foo',
//   };
// });

const mockCreateUser = jest
  .fn()
  .mockImplementation(async ({ cpf, name, password }) => {
    return {
      name,
      cpf,
      password,
    }
  })

jest.mock('../../../data/repositories/auth/index', () => {
  const originalModule = jest.requireActual(
    '../../../data/repositories/auth/index',
  )

  return {
    __esModule: true,
    ...originalModule,
    AuthRepository: jest.fn().mockImplementation(() => {
      return {
        createUser: mockCreateUser,
      }
    }),
  }
})

export { mockCreateUser }
