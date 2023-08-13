import React from 'react'

import { Container } from '../../../shared/styles/Container'

import { Input } from '../components/Input'

import { Content, Logo, Title } from './styles'
import { Button } from '../components/Button'

export function SignIn() {
  return (
    <Container>
      <Content>
        <Title>Entre com seu CPF e Senha</Title>
        <Input placeholder="CPF" />
        <Input placeholder="Senha" />
        <Button title="Entrar" type="PRIMARY" />
      </Content>
      <Logo source={require('../../../shared/assets/logo_ifsul.png')} />
    </Container>
  )
}
