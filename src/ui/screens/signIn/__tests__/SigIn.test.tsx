import React from 'react'
import { SignIn } from '@screens/signIn/SignIn'
import { fireEvent, render, screen } from '@testing-library/react-native'
import { NavigationContainer } from '@react-navigation/native'
import { SignUp } from '@screens/signUp/SignUp'

describe('SignIn', () => {
  it('render screen', () => {
    render(
      <NavigationContainer>
        <SignIn />
      </NavigationContainer>,
    )

    expect(screen).toMatchSnapshot()
  })

  it('should type cpf on input', () => {
    render(
      <NavigationContainer>
        <SignIn />
      </NavigationContainer>,
    )

    const input = screen.getByTestId('cpf-input')

    fireEvent.changeText(input, '047.196.130-20')
    expect(input.props.value).toBe('047.196.130-20')
  })

  it('should type password on input', () => {
    render(
      <NavigationContainer>
        <SignIn />
      </NavigationContainer>,
    )

    const input = screen.getByTestId('sigin-password-input')

    fireEvent.changeText(input, '123456')

    expect(input.props.value).toBe('123456')
  })

  it('should show error message when cpf is invalid', async () => {
    render(
      <NavigationContainer>
        <SignIn />
      </NavigationContainer>,
    )

    const input = screen.getByTestId('cpf-input')
    const button = screen.getByTestId('signin-button')

    fireEvent.changeText(input, '123')
    fireEvent.press(button)

    expect(await screen.findByText('CPF inválido')).toBeTruthy()
  })

  it('should show error message when password is short', async () => {
    render(
      <NavigationContainer>
        <SignIn />
      </NavigationContainer>,
    )

    const input = screen.getByTestId('sigin-password-input')
    const button = screen.getByTestId('signin-button')

    fireEvent.changeText(input, '123')

    fireEvent.press(button)

    expect(
      await screen.findByText('A senha deve ter no mínimo 6 dígitos.'),
    ).toBeTruthy()
  })

  it('should navigate to SignUp screen', async () => {
    render(
      <NavigationContainer>
        <SignIn />
        <SignUp />
      </NavigationContainer>,
    )

    const button = screen.getByTestId('signup-button')

    fireEvent.press(button)

    expect(await screen.findAllByText('Cadastro')).toBeTruthy()
  })
})
