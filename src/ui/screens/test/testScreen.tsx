import React from 'react'
import { View, Text, ScrollView } from 'react-native'
import { useNavigation, useRoute } from '@react-navigation/native'
import { Button, Container } from '@ui/components'
import { TestsDTO } from '@sqlite/modules/tests/interfaces/ITestInterface'
// import { useTestViewModel } from '@screens/test/useTestViewModel'
// import { QuestionsSerivce } from '@data/services/questions'
// import { OptionService } from '@data/services/options'
// import { TestsRepository } from '@data/repositories/tests'
// import { TestsService } from '@data/services/tests'

export function TestScreen() {
  // get header params
  const route = useRoute()
  const { params } = route as { params: { test: TestsDTO } }
  // const { handleOnGetTest } = useTestViewModel(
  //   new TestsRepository(
  //     new TestsService(new QuestionsSerivce(new OptionService())),
  //   ),
  // )
  const test = params?.test
  const { goBack } = useNavigation()

  return (
    <ScrollView>
      <Container>
        <Text>{test?.title}</Text>
        <View>
          {test.questions?.map((question) => (
            <>
              <Text
                key={question.id}
                style={{
                  textAlign: 'center',
                  fontSize: 24,
                  fontWeight: 'bold',
                  marginVertical: 20,
                }}
              >
                {question.description}
              </Text>

              {question.options?.map((option, index) => (
                <View key={index}>
                  <Text key={option.id}>- {option.description}</Text>
                </View>
              ))}
            </>
          ))}
        </View>
        <Button title={'Go back'} onPress={goBack} />
      </Container>
    </ScrollView>
  )
}
