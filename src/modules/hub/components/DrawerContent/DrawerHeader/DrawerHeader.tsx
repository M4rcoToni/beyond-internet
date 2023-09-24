import { Photo, Separator } from '@shared/components'
import { User } from 'databases/modules/users/model'
import { Container, Title, SubTitle } from './styles'

interface DrawerHeaderProps {
  user: User | null
}

export function DrawerHeader({ user }: DrawerHeaderProps) {
  return (
    <>
      <Container>
        <Photo
          size={140}
          uri={
            'https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png'
          }
        />
        <Title>{user?.name}</Title>
        <SubTitle>{user?.cpf}</SubTitle>
      </Container>
      <Separator />
    </>
  )
}
