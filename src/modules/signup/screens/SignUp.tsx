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
        <SubTitle>Realize seu cadastro</SubTitle>
        <Input placeholder="Nome Completo" />
        <Input placeholder="CPF" />
        <Input placeholder="Senha" />
        <Input placeholder="Confirme sua senha" />
        <Button title="Cadastre-se" type="PRIMARY" />
        <Link title="Volar para o login" onPress={() => navigation.goBack()} />
      </Content>
      <Logo source={require('../../../shared/assets/logo_ifsul.png')} />
    </Container>
  )
}
