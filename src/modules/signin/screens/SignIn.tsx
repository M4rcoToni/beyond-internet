import React from 'react'

import { Container } from '../../../shared/styles/Container'

import { Input } from '../components/Input'

import { Content, Logo, Title } from './styles'
import { Button } from '../components/Button'
import { SubTitle } from '../../../shared/styles/SubTitle'

export function SignIn() {
  return (
    <Container>
      <Title>Além da Internet</Title>
      <Content>
        <SubTitle>Entre com seu CPF e Senha</SubTitle>
        <Input placeholder="CPF" />
        <Input placeholder="Senha" />
        <Button title="Entrar" type="PRIMARY" />
      </Content>
      <Logo source={require('../../../shared/assets/logo_ifsul.png')} />
    </Container>
  )
}
