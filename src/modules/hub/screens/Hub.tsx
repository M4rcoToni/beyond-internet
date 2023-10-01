import React, { useCallback, useEffect, useState } from 'react'
import { Container, Content } from './styles'

import { useDimensions } from '@shared/hooks/useDimensions'
import { useStorage } from '@shared/hooks/useStorage'
import { CourseList } from '../components/CourseList/CourseList'
import { CourseType, Section } from '@modules/course/screens/CourseType'
import { useSection } from '@shared/hooks/useSection'
import { useNavigation } from '@react-navigation/native'

export type Courses = {
  id?: string
  courseId: string
  directoryName: string
  uri: string
  files: string
  granted: boolean
  index: CourseType
}

export function Hub() {
  const [content, setContent] = useState<Courses[]>([])
  const [refreshing, setRefreshing] = useState(false)
  const { handleSelectSection } = useSection()
  const { navigate } = useNavigation()
  const { getDirectoryUri, listCourses } = useStorage()
  const { width } = useDimensions()

  async function getCourse() {
    await getDirectoryUri()
  }

  const checkStorageCourse = useCallback(async () => {
    const permissions = await listCourses()

    if (permissions) {
      setContent(permissions)
      setRefreshing(false)
    }
  }, [listCourses])

  async function onCoursePress(course: Section) {
    await handleSelectSection(course)
    navigate('Course')
  }
  console.log(content, 'content')

  useEffect(() => {
    checkStorageCourse()
    console.log(' useEffect')
  }, [])

  return (
    <Content>
      <Container
        style={
          width > 700 ?? {
            flexDirection: 'row',
          }
        }
      >
        <CourseList
          data={content}
          refreshing={refreshing}
          onRefresh={checkStorageCourse}
          getCourse={getCourse}
          onCoursePress={onCoursePress}
        />
      </Container>
    </Content>
  )
}
