import { Content, Logo, Title } from './styles'

import { useNavigation } from '@react-navigation/native'
import { Button, Container, Input, SubTitle, Link } from '@shared/components'
import { User } from 'databases/modules/users/model/User'
import { getUserByCPF } from 'databases/modules/users/repository/UserRepository'

export function SignIn() {
  const navigation = useNavigation()
  async function handleSignIn() {
    const callback = (user: User | boolean) => {
      if (user !== false) console.log(user)
      else console.log('Usuário não encontrado')
    }

    getUserByCPF('047.196.130-2', callback)
  }
  return (
    <Container>
      <Title>Além da Internet</Title>
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
      <Logo source={require('../../../shared/assets/logo_ifsul.png')} />
    </Container>
  )
}
