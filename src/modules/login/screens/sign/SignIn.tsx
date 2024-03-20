import { useNavigation } from '@react-navigation/native'
import { yupResolver } from '@hookform/resolvers/yup'
import Toast from 'react-native-toast-message'
import { Controller, useForm } from 'react-hook-form'

import { CPFMask } from '@shared/helpers/CpfMask'
import { useAuth } from '@shared/hooks/useAuth'
import {
  LoginFormDataProps,
  signInSchema,
} from '@modules/login/utils/FormValidator'
import { Button, Container, Input, SubTitle, Link } from '@shared/components'
import { Content } from './styles'

export function SignIn() {
  const navigation = useNavigation()
  const { signIn } = useAuth()

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormDataProps>({
    resolver: yupResolver(signInSchema),
  })

  async function handleSignIn({ cpf, password }: LoginFormDataProps) {
    try {
      await signIn(cpf, password)
    } catch (error) {
      Toast.show({
        type: 'error',
        text1:
          error instanceof Error ? error.message : 'Erro ao realizar login',
      })
    }
  }

  return (
    <Container>
      {/* <Title>Além da Internet</Title>ß */}
      <Content>
        <SubTitle text="Entre com seu CPF e Senha" />

        <Controller
          control={control}
          name="cpf"
          render={({ field: { onChange, value } }) => (
            <Input
              placeholder="Informe o CPF"
              onChangeText={(text) => {
                const maskedText = CPFMask(text)
                onChange(maskedText)
              }}
              maxLength={14}
              value={value}
              errorMessage={errors.cpf?.message}
            />
          )}
        />

        <Controller
          control={control}
          name="password"
          render={({ field: { onChange, value } }) => (
            <Input
              placeholder="Senha"
              onChangeText={onChange}
              value={value}
              secureTextEntry
              errorMessage={errors.password?.message}
            />
          )}
        />

        <Button
          title="Entrar"
          type="PRIMARY"
          style={{ height: 56 }}
          onPress={handleSubmit(handleSignIn)}
        />
        <Link
          title="Cadastre-se"
          onPress={() => navigation.navigate('signUp')}
        />
      </Content>
      {/* <Logo source={require('../../../shared/assets/logo_ifsul.png')} /> */}
      <Toast />
    </Container>
  )
}
