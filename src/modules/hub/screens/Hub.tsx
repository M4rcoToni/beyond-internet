import { ScrollView, View } from 'react-native'
import { ClassCard } from '../components/ClassCard/ClassCard'
import React from 'react'
import { Container, ScrollViewStyled } from './styles'
import { getUserByCPFController } from 'databases/modules/users/controller/UserController'

export function Hub() {
  async function login() {
    const res = await getUserByCPFController('047.196.130-20')
    console.log(res)
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
