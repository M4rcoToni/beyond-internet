import { TestsRepository } from '@data/repositories/tests'
import Toast from 'react-native-toast-message'
import { TestsDTO } from '@sqlite/modules/tests/interfaces/ITestInterface'
import { useCourse } from '@data/contexts/CourseContext'
import { CoursesRepository } from '@data/repositories/course'

export function useTestViewModel(
  courseRepository: CoursesRepository,
  testRepository: TestsRepository,
) {
  const {
    handleSetIndex,
    index,
    courseScrollViewRef,
    handleSetSection,
    handleSetCourses,
    sections,
  } = useCourse()
  const handleCompleteTest = async (test: TestsDTO) => {
    try {
      if (!test.testId) {
        return
      }

      await testRepository.updateTest(test.testId, {
        testId: test.testId,
        sectionId: test.sectionId,
        title: test.title,
        completed: 1,
      })

      Toast.show({
        type: 'success',
        text1: 'Teste finalizado com sucesso!',
        text2: 'Parabéns!',
      })

      handleSetIndex(index + 1)

      courseScrollViewRef?.current?.scrollTo({
        y: 0,
        animated: true,
      })

      const updatedSections = sections.map((section) => {
        if (section.tests?.sectionId === test.sectionId) {
          return {
            ...section,
            tests: {
              ...section.tests,
              completed: 1,
            },
          }
        }

        return section
      })

      handleSetSection(updatedSections)

      const response = await courseRepository.listCourses()

      if (response) {
        handleSetCourses(response)
      }
    } catch (error) {
      console.log('Erro ao finalizar teste', error)
      Toast.show({
        type: 'error',
        text1: 'Erro ao finalizar teste!',
        text2: 'Tente novamente mais tarde.',
      })
    }
  }

  return {
    handleCompleteTest,
  }
}
