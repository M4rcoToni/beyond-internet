import { View, Text } from 'react-native'
import { useNavigation, useRoute } from '@react-navigation/native'
import { Button, Container } from '@ui/components'
import { TestsDTO } from '@sqlite/modules/tests/interfaces/ITestInterface'
import { useTestViewModel } from '@screens/test/useTestViewModel'
import { QuestionsSerivce } from '@data/services/questions'
import { OptionService } from '@data/services/options'
import { TestsRepository } from '@data/repositories/tests'
import { TestsService } from '@data/services/tests'
import { useEffect } from 'react'
import { QuestionsRepository } from '@data/repositories/questions'
import { OptionsRepository } from '@data/repositories/options'

export function TestScreen() {
  // get header params
  const route = useRoute()
  const { params } = route as { params: { test: TestsDTO } }
  const { handleOnGetTest, questions, options } = useTestViewModel(
    new TestsRepository(
      new TestsService(new QuestionsSerivce(new OptionService())),
    ),
    new QuestionsRepository(new QuestionsSerivce(new OptionService())),
    new OptionsRepository(new OptionService()),
  )
  const test = params.test

  const { navigate, goBack } = useNavigation()
  console.log(options, 'options')

  useEffect(() => {
    ;(async () => {
      await handleOnGetTest(test.testId || 0)
    })()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <Container>
      <Text>{test.title}</Text>
      <View>
        {questions.map((question) => (
          <>
            <Text key={question.questionId}>{question.description}</Text>

            {options.map((option) => (
              <Text key={option.id}>{option.description}</Text>
            ))}
          </>
        ))}
      </View>
      <Button title={'Go back'} onPress={goBack} />
    </Container>
  )
}
