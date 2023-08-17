import { ScrollView, View } from 'react-native'
import { ClassCard } from '../components/ClassCard/ClassCard'
import React from 'react'
import { Container, ScrollViewStyled } from './styles'

export function Hub() {
  return (
    <ScrollViewStyled>
      <Container>
        <ClassCard title="Empreendedorismsadasdsaodsdsdsds" />
        <ClassCard title="Empreendedorismsadasdsaodsdsdsds" />

        <ClassCard title="Empreendedorismsadasdsaodsdsdsds" />
        <ClassCard title="Empreendedorismsadasdsaodsdsdsds" />
        <ClassCard title="Empreendedorismsadasdsaodsdsdsds" />
        <ClassCard title="Empreendedorismsadasdsaodsdsdsds" />

        <ClassCard title="Empreendedorismsadasdsaodsdsdsds" />
      </Container>
    </ScrollViewStyled>
  )
}
