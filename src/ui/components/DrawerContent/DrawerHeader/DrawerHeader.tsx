import { Separator } from '@ui/components'
import { Container, Title, SubTitle, PictureContainer } from './styles'
import { UserDTO } from '@sqlite/modules/users/interfaces/IUserInterface'
import { Feather } from '@expo/vector-icons'

interface DrawerHeaderProps {
  user: UserDTO | null
}

export function DrawerHeader({ user }: DrawerHeaderProps) {
  return (
    <>
      <Container>
        <PictureContainer>
          <Feather name="user" size={80} color="black" />
        </PictureContainer>
        <Title>{user?.name}</Title>
        <SubTitle>{user?.cpf}</SubTitle>
      </Container>
      <Separator />
    </>
  )
}
