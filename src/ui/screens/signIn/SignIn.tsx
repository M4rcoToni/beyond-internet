import React from 'react'
import { useNavigation } from '@react-navigation/native'
import { yupResolver } from '@hookform/resolvers/yup'
import Toast from 'react-native-toast-message'
import { Controller, useForm } from 'react-hook-form'
import { Image } from 'expo-image'
import { Content, Title } from './styles'
import { SubTitle, Input, Container, Button, Link } from '@ui/components'
import { CPFMask } from 'data/helpers/CpfMask'
import { useAuth } from 'data/hooks/useAuth'
import { LoginFormDataProps, signInSchema } from 'data/utils/FormValidator'
import { ScrollView } from 'react-native'
import { useSignInViewModel } from './useSignInViewModel'
import { AuthService } from '@data/services/auth'
import { AuthRepository } from '@data/repositories/auth'

export function SignIn() {
  const navigation = useNavigation()

  const { handleSignIn } = useSignInViewModel(
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
      </ScrollView>

      <Toast />
    </Container>
  )
}
