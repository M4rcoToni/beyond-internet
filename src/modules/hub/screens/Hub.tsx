import React from 'react'
import { useAuth } from '@shared/hooks/useAuth'
import { ClassCard } from '../components/ClassCard/ClassCard'
import { Container, ScrollViewStyled } from './styles'

export function Hub() {
  const { signOut, user } = useAuth()

  async function login() {
    await signOut(user?.cpf || '')
  }

  return (
    <ScrollViewStyled>
      <Container>
        <ClassCard
          title="Empreendedorismo"
          subTitle="6 semestre"
          onPress={login}
        />
        <ClassCard title="Empreendedorismo" subTitle="6 semestre" />
      </Container>
    </ScrollViewStyled>
  )
}
