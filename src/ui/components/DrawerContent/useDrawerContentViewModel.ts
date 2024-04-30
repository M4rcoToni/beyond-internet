import { Result } from '@data/result'
import { AuthRepository } from '@data/repositories/auth'
import Toast from 'react-native-toast-message'
import { useAuth } from '@data/contexts/AuthContext'
import { CoursesRepository } from '@data/repositories/course'
import { DrawerActions, useNavigation } from '@react-navigation/native'
import { useCourse } from '@data/contexts/CourseContext'
import { useMemo } from 'react'
import { CourseDTO } from '@sqlite/modules/course/interfaces/ICourseInterfaces'

export function useDrawerContentViewModel(
  authRepository?: AuthRepository,
  courseRepository?: CoursesRepository,
) {
  const { user, setUserData } = useAuth()
  const { courses, index, handleSetCourses, courseId, sections } = useCourse()
  const navigation = useNavigation()

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
      navigation.dispatch(DrawerActions.closeDrawer())
      await courseRepository?.createCourse()
      const courses = await courseRepository?.listCourses()

      if (courses) {
        handleSetCourses(courses)
      }
    } catch (error) {
      console.log('error', error)

      Toast.show({
        type: 'error',
        text1: error instanceof Result ? error.getError()?.message : 'Erro',
      })
    }
  }

  const course = useMemo(() => {
    return courses.find(
      (course: CourseDTO) => Number(course.courseId) === Number(courseId),
    )
  }, [courses, courseId])

  return {
    handleLogout,
    handleOnGetCourse,
    user,
    course,
    sections,
    index,
  }
}
