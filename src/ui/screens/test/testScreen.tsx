import React, { useCallback, useRef, useState } from 'react'
import { View, ScrollView, BackHandler } from 'react-native'
import { useNavigation, useRoute } from '@react-navigation/native'
import Toast from 'react-native-toast-message'
import PagerView from 'react-native-pager-view'
import {
  TestScreenContainer,
  TestScreenTitle,
  TestScreenSubtitle,
  QuestionContainer,
  QuestionDescription,
} from './styles'
import { QuestionButton } from '@components/QuestionButton/QuestionButton'
import { TestNextButton } from '@components/TestNextButton/TestNextButton'

import { OptionsDTO } from '@sqlite/modules/options/interfaces/IOptionsInterface'
import { TestsDTO } from '@sqlite/modules/tests/interfaces/ITestInterface'

import { QuestionsSerivce } from '@data/services/questions'
import { OptionService } from '@data/services/options'
import { SectionsService } from '@data/services/sections'
import { AuthService } from '@data/services/auth'
import { AuthRepository } from '@data/repositories/auth'
import { TestsRepository } from '@data/repositories/tests'
import { TestsService } from '@data/services/tests'
import { CoursesRepository } from '@data/repositories/course'
import { CoursesService } from '@data/services/course'
import { NotificationsRepository } from '@data/repositories/notifications'
import { NotificationsService } from '@data/services/notifications'

import { useTestViewModel } from './useTestViewModel'

export function TestScreen() {
  const route = useRoute()
  const { goBack } = useNavigation()
  const { params } = route as { params: { test: TestsDTO } }
  const test = params?.test
  const { handleCompleteTest } = useTestViewModel(
    new AuthRepository(new AuthService()),
    new CoursesRepository(
      new CoursesService(
        new SectionsService(
          new TestsService(new QuestionsSerivce(new OptionService())),
        ),
      ),
    ),
    new TestsRepository(
      new TestsService(new QuestionsSerivce(new OptionService())),
    ),
    new NotificationsRepository(new NotificationsService()),
  )
  const ref = useRef<PagerView>(null)

  const [selectedOptions, setSelectedOptions] = useState<OptionsDTO[]>([])
  const [currentQuestion, setCurrentQuestion] = useState(0)
  const [currentOptionId, setCurrentOptionId] = useState<number>(0)
  const [isFinished, setIsFinished] = useState(false)

  const handleSelectOption = useCallback(
    (option: OptionsDTO) => {
      setSelectedOptions((prev) => {
        const newOptions = [...prev]
        newOptions[currentQuestion] = option
        return newOptions
      })
      setCurrentOptionId(0)
    },
    [currentQuestion],
  )

  const handleVerifyOption = useCallback(() => {
    const currentOption = selectedOptions[currentQuestion]

    if (!currentOption || !test?.questions) {
      return
    }

    if (currentOption.description !== test.questions[currentQuestion].answer) {
      console.log('Resposta errada!')
      setCurrentOptionId(-1)
      return
    }

    setCurrentOptionId(currentOption.id as number)

    if (selectedOptions.length === test.questions.length) {
      setIsFinished(true)
    }
  }, [currentQuestion, selectedOptions, test?.questions])

  const handleNextQuestion = useCallback(() => {
    ref.current?.setPage(currentQuestion + 1)
    setCurrentOptionId(0)
    setCurrentQuestion(0)
  }, [currentQuestion])

  const handleFinishTest = useCallback(async () => {
    await handleCompleteTest(test)
    setTimeout(() => {
      goBack()
    }, 600)
  }, [goBack, handleCompleteTest, test])

  BackHandler.addEventListener('hardwareBackPress', () => {
    return true
  })

  return (
    <TestScreenContainer>
      <ScrollView contentContainerStyle={{ flex: 1 }}>
        <TestScreenTitle>{test?.title}</TestScreenTitle>
        <TestScreenSubtitle>
          Questão {currentQuestion + 1} de {test?.questions?.length}
        </TestScreenSubtitle>
        <PagerView
          style={{ flex: 1 }}
          initialPage={0}
          ref={ref}
          scrollEnabled={false}
          onPageSelected={(e) => setCurrentQuestion(e.nativeEvent.position)}
        >
          {test.questions?.map((question, index) => (
            <QuestionContainer
              key={index}
              style={{
                flex: 1,
                justifyContent: 'space-between',
              }}
            >
              <View>
                <QuestionDescription key={question.id}>
                  {question.description}
                </QuestionDescription>

                {question.options?.map((option) => (
                  <QuestionButton
                    key={option.id}
                    isSelected={
                      selectedOptions[currentQuestion]?.id === option.id
                    }
                    isCorrect={currentOptionId === option.id}
                    isIncorrect={currentOptionId === -1}
                    onPress={() => handleSelectOption(option)}
                    description={option.description}
                  />
                ))}
              </View>
              <TestNextButton
                onVerifyOption={handleVerifyOption}
                onGoToNextQuestion={handleNextQuestion}
                onFinished={handleFinishTest}
                isFinished={isFinished}
                isCorrect={
                  currentOptionId === selectedOptions[currentQuestion]?.id
                }
                isSelected={currentOptionId !== 0}
                disabled={
                  currentOptionId === -1 ||
                  selectedOptions[currentQuestion]?.id === undefined
                }
              />
            </QuestionContainer>
          ))}
        </PagerView>
      </ScrollView>
      <Toast />
    </TestScreenContainer>
  )
}
