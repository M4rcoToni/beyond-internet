import { Photo, Separator } from '@ui/components'
import { Container, Title, SubTitle } from './styles'
import { UserDTO } from '@sqlite/modules/users/interfaces/IUserInterface'

interface DrawerHeaderProps {
  user: UserDTO | null
}

export function DrawerHeader({ user }: DrawerHeaderProps) {
  return (
    <>
      <Container>
        <Photo
          size={140}
          uri={'https://avatars.githubusercontent.com/u/94496614?v=4'}
        />
        <Title>{user?.name}</Title>
        <SubTitle>{user?.cpf}</SubTitle>
      </Container>
      <Separator />
    </>
  )
}
