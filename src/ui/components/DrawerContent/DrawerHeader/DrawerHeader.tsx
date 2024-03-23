import { Photo, Separator } from '@ui/components'
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
          uri={'https://avatars.githubusercontent.com/u/94496614?v=4'}
        />
        <Title>{user?.name}</Title>
        <SubTitle>{user?.cpf}</SubTitle>
      </Container>
      <Separator />
    </>
  )
}
