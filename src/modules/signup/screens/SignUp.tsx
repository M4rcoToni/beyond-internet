import React from 'react'
import { useNavigation } from '@react-navigation/native'

import { Button, Container, Input, SubTitle, Link } from '@shared/components'

import { Content, Logo, Title } from './styles'

export function SignUp() {
  const navigation = useNavigation()
  return (
    <Container>
      <Title>Além da Internet</Title>
      <Content>
        <SubTitle>Entre com seu CPF e Senha</SubTitle>
        <Input placeholder="CPF" />
        <Input placeholder="Senha" />
        <Button title="Entrar" type="PRIMARY" />
        <Link title="Volar para o login" onPress={() => navigation.goBack()} />
      </Content>
      <Logo source={require('../../../shared/assets/logo_ifsul.png')} />
    </Container>
  )
}
