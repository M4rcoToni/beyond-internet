import { Content, Logo, Title } from './styles'

import { useNavigation } from '@react-navigation/native'
import { Button, Container, Input, SubTitle, Link } from '@shared/components'

export function SignIn() {
  const navigation = useNavigation()
  return (
    <Container>
      <Title>Além da Internet</Title>
      <Content>
        <SubTitle>Entre com seu CPF e Senha</SubTitle>
        <Input placeholder="CPF" />
        <Input placeholder="Senha" />
        <Button title="Entrar" type="PRIMARY" />
        <Link
          title="Cadastre-se"
          onPress={() => navigation.navigate('signUp')}
        />
      </Content>
      <Logo source={require('../../../shared/assets/logo_ifsul.png')} />
    </Container>
  )
}
