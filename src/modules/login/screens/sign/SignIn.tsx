import { Content, Logo, Title } from './styles'

import { useNavigation } from '@react-navigation/native'
import { Button, Container, Input, SubTitle, Link } from '@shared/components'
import { User } from 'databases/modules/users/model/User'
import { getUserByCPF } from 'databases/modules/users/repository/UserRepository'

export function SignIn() {
  const navigation = useNavigation()

  async function handleSignIn() {
    const user = await getUserByCPF('047.196.130-2')
    console.log(user)
  }

  return (
    <Container>
      {/* <Title>Além da Internet</Title>ß */}
      <Content>
        <SubTitle>Entre com seu CPF e Senha</SubTitle>
        <Input placeholder="CPF" />
        <Input placeholder="Senha" />
        <Button title="Entrar" type="PRIMARY" onPress={handleSignIn} />
        <Link
          title="Cadastre-se"
          onPress={() => navigation.navigate('signUp')}
        />
      </Content>
      {/* <Logo source={require('../../../shared/assets/logo_ifsul.png')} /> */}
    </Container>
  )
}
