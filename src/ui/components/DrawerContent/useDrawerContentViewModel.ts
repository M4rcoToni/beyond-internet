import { Result } from '@data/result'
import { AuthRepository } from '@data/repositories/auth'
import Toast from 'react-native-toast-message'
import { useAuth } from '@data/contexts/AuthContext'
import { CoursesRepository } from '@data/repositories/course'
import { CourseDTO } from '@sqlite/modules/course/interfaces/ICourseInterfaces'
import { useState } from 'react'
import { useNavigation, DrawerActions } from '@react-navigation/native'

export function useDrawerContentViewModel(
  authRepository?: AuthRepository,
  courseRepository?: CoursesRepository,
) {
  const { user, setUserData } = useAuth()
  const navigation = useNavigation()
  const [courses, setCourses] = useState<CourseDTO[]>([])

  async function handleLogout() {
    try {
      await authRepository?.update(user?.id || 0, { isLogged: 0 })
      setUserData(null)
    } catch (error) {
      Toast.show({
        type: 'error',
        text1: error instanceof Result ? error.getError()?.message : 'Erro',
      })
    }
  }

  const handleOnGetCourse = async () => {
    try {
      await courseRepository?.createCourse()
      navigation.dispatch(DrawerActions.closeDrawer())
    } catch (error) {
      console.log('error', error)

      Toast.show({
        type: 'error',
        text1: error instanceof Result ? error.getError()?.message : 'Erro',
      })
    }
  }

  return {
    handleLogout,
    handleOnGetCourse,
    user,
  }
}
