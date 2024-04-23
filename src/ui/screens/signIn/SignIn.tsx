import React from 'react'
import { useNavigation } from '@react-navigation/native'
import { yupResolver } from '@hookform/resolvers/yup'
import Toast from 'react-native-toast-message'
import { Controller, useForm } from 'react-hook-form'
import { Image } from 'expo-image'
import { Content } from './styles'
import { Button, Container, Input, Link, SubTitle } from '@ui/components'
import { LoginFormDataProps, signInSchema } from 'data/utils/FormValidator'
import { ScrollView } from 'react-native'
import { useSignInViewModel } from './useSignInViewModel'
import { AuthService } from '@data/services/auth'
import { AuthRepository } from '@data/repositories/auth'
import { CPFMask } from '@data/utils/CpfMask'

export function SignIn() {
  const { navigate } = useNavigation()

  const { handleSignIn, loading } = useSignInViewModel(
    new AuthRepository(new AuthService()),
  )

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormDataProps>({
    resolver: yupResolver(signInSchema),
  })

  return (
    <Container>
      <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
        <Content>
          <Image
            source={require('../../assets/AppIcon.png')}
            style={{ width: 120, height: 100 }}
            transition={600}
            responsivePolicy="live"
            alt="Logo do IFSUL"
          />
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
                keyboardType="numeric"
                errorMessage={errors.cpf?.message}
                testID="cpf-input"
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
                testID="sigin-password-input"
              />
            )}
          />

          <Button
            title="Entrar"
            type="PRIMARY"
            isLoading={loading}
            style={{ height: 56 }}
            onPress={handleSubmit(handleSignIn)}
            testID="signin-button"
          />
          <Link
            title="Cadastre-se"
            testID="signup-link"
            onPress={() => navigate('signUp')}
          />
        </Content>
      </ScrollView>

      <Toast />
    </Container>
  )
}
