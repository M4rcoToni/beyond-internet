import React from 'react'
import { useNavigation } from '@react-navigation/native'

import { Button, Container, Input, SubTitle, Link } from '@shared/components'
import { useForm, Controller } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import Toast from 'react-native-toast-message'

import { Content, Logo } from './styles'
import { CPFMask } from '@shared/helpers/CpfMask'
import { useAuth } from '@shared/hooks/useAuth'
import { FormDataProps, signUpSchema } from '@modules/login/utils/FormValidator'

export function SignUp() {
  const navigation = useNavigation()
  const { signUp } = useAuth()
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<FormDataProps>({
    resolver: yupResolver(signUpSchema),
  })

  async function handleSignUp({
    cpf,
    name,
    password,
    passwordConfirm,
  }: FormDataProps) {
    try {
      await signUp({ cpf, name, password, passwordConfirm })
    } catch (error) {
      Toast.show({
        type: 'error',
        text1:
          error instanceof Error ? error.message : 'Erro ao realizar cadastro',
      })
    }
  }

  return (
    <Container>
      {/* <Title>Além da Internet</Title> */}
      <Content>
        <SubTitle>Realize seu cadastro</SubTitle>
        <Controller
          control={control}
          name="name"
          render={({ field: { onChange, value } }) => (
            <Input
              placeholder="Nome Completo"
              onChangeText={onChange}
              value={value}
              errorMessage={errors.name?.message}
            />
          )}
        />
        <Controller
          control={control}
          name="cpf"
          render={({ field: { onChange, value } }) => (
            <Input
              placeholder="Informe seu CPF"
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
              errorMessage={errors.password?.message}
            />
          )}
        />

        <Controller
          control={control}
          name="passwordConfirm"
          render={({ field: { onChange, value } }) => (
            <Input
              placeholder="Confirme sua senha"
              onChangeText={onChange}
              value={value}
              errorMessage={errors.passwordConfirm?.message}
            />
          )}
        />

        <Button
          title="Cadastre-se"
          type="PRIMARY"
          onPress={handleSubmit(handleSignUp)}
        />
        <Link title="Voltar para o login" onPress={() => navigation.goBack()} />
        <Toast />
      </Content>
      {/* <Logo source={require('../../../shared/assets/logo_ifsul.png')} /> */}
    </Container>
  )
}
