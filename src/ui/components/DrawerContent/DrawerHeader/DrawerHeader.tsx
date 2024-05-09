import { Separator } from '@ui/components'
import { Container, Title, SubTitle, PictureContainer } from './styles'
import { UserDTO } from '@sqlite/modules/users/interfaces/IUserInterface'
import { Feather } from '@expo/vector-icons'
import { formatStudyTime } from '@data/utils/formatTime'

interface DrawerHeaderProps {
  user: UserDTO | null
}

export function DrawerHeader({ user }: DrawerHeaderProps) {
  const formattedStudyTime = formatStudyTime(user?.totalStudyTime || 0)
  return (
    <>
      <Container>
        <PictureContainer>
          <Feather name="user" size={80} color="black" />
        </PictureContainer>
        <Title>{user?.name}</Title>
        <SubTitle>{user?.cpf}</SubTitle>
        <SubTitle>{formattedStudyTime}</SubTitle>
      </Container>
      <Separator />
    </>
  )
}
