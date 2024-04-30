import { TestsRepository } from '@data/repositories/tests'
import Toast from 'react-native-toast-message'
import { Result } from '@data/result'
import { QuestionsRepository } from '@data/repositories/questions'
import { OptionsRepository } from '@data/repositories/options'
import { useState } from 'react'
import { QuestionsDTO } from '@sqlite/modules/questions/interfaces/IQuestionsInterface'
import { OptionsDTO } from '@sqlite/modules/options/interfaces/IOptionsInterface'

export function useTestViewModel(
  testRepository: TestsRepository,
  questionRepository: QuestionsRepository,
  optionRepository: OptionsRepository,
) {
  const [questions, setQuestions] = useState<QuestionsDTO[]>([])
  const [options, setOptions] = useState<OptionsDTO[]>([])
  const handleOnGetTest = async (testId: number) => {
    try {
      console.log('handleOnGetTest')
      const res = await questionRepository.listQuestions(testId)
      if (!res) {
        throw new Result(false, undefined, new Error('Erro ao listar questões'))
      }

      setQuestions(res)
      console.log(res, 'res')
      if (res) {
        const options = await optionRepository.listOptions(
          questions[0].questionId || 0,
        )
      }
      setOptions(options)
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
    questions,
    options,
  }
}
