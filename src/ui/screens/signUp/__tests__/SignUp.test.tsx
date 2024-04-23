import React from 'react'
import { SignUp } from '@screens/signUp/SignUp'
import { fireEvent, render, screen } from '@testing-library/react-native'
import { NavigationContainer } from '@react-navigation/native'

describe('SignUp', () => {
  it('renders screen', () => {
    render(
      <NavigationContainer>
        <SignUp />
      </NavigationContainer>,
    )
    expect(screen).toMatchSnapshot()
  })

  it('should type name on input', () => {
    render(
      <NavigationContainer>
        <SignUp />
      </NavigationContainer>,
    )
    const input = screen.getByTestId('name-input')
    fireEvent.changeText(input, 'John Doe')
    expect(input.props.value).toBe('John Doe')
  })

  it('should type cpf on input', () => {
    render(
      <NavigationContainer>
        <SignUp />
      </NavigationContainer>,
    )
    const input = screen.getByTestId('cpf-input')

    fireEvent.changeText(input, '047.196.130-20')
    expect(input.props.value).toBe('047.196.130-20')
  })

  it('should type password on input', () => {
    render(
      <NavigationContainer>
        <SignUp />
      </NavigationContainer>,
    )
    const input = screen.getByTestId('password-input')
    fireEvent.changeText(input, '123456')
    expect(input.props.value).toBe('123456')
  })

  it('should type password confirm on input', () => {
    render(
      <NavigationContainer>
        <SignUp />
      </NavigationContainer>,
    )
    const input = screen.getByTestId('password-confirm-input')
    fireEvent.changeText(input, '123456')
    expect(input.props.value).toBe('123456')
  })

  it('should show error in all inputs', async () => {
    render(
      <NavigationContainer>
        <SignUp />
      </NavigationContainer>,
    )

    const passwordInput = screen.getByTestId('password-input')
    const passwordConfirmInput = screen.getByTestId('password-confirm-input')
    const button = screen.getByTestId('signup-button')

    fireEvent.press(button)

    expect(await screen.findByText('Informe o nome.')).toBeTruthy()
    expect(await screen.findByText('Informe o CPF.')).toBeTruthy()
    expect(await screen.findByText('Informe a senha.')).toBeTruthy()
    expect(
      await screen.findByText('Informe a confirmação da senha.'),
    ).toBeTruthy()

    fireEvent.changeText(passwordInput, '123')
    fireEvent.changeText(passwordConfirmInput, '321')

    fireEvent.press(button)

    expect(
      await screen.findByText('A senha deve ter no mínimo 6 dígitos.'),
    ).toBeTruthy()

    expect(await screen.findByText('As senhas devem ser iguais.')).toBeTruthy()
  })
})
