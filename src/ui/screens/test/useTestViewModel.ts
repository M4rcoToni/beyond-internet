import { TestsRepository } from '@data/repositories/tests'
import Toast from 'react-native-toast-message'
import { Result } from '@data/result'
import { useState } from 'react'
import { TestsDTO } from '@sqlite/modules/tests/interfaces/ITestInterface'

export function useTestViewModel(testRepository: TestsRepository) {
  const [test, setTest] = useState<TestsDTO | null>(null)

  const handleOnGetTest = async (sectionId: number) => {
    try {
      const test = await testRepository.listTest(sectionId)

      setTest(test)
    } catch (error) {
      console.error('error', error)
      Toast.show({
        type: 'error',
        text1: error instanceof Result ? error.getError()?.message : 'Erro',
      })
    }
  }

  return {
    handleOnGetTest,
    test,
  }
}
