import React, { useCallback, useEffect, useState } from 'react'
import { Container, Content } from './styles'

import { useDimensions } from '@shared/hooks/useDimensions'
import { useStorage } from '@shared/hooks/useStorage'
import { CourseList } from '../components/CourseList/CourseList'

export type Courses = {
  id?: string
  courseId: string
  directoryName: string
  uri: string
  files: string
  granted: boolean
}

export function Hub() {
  const [content, setContent] = useState<Courses[]>([])
  const [refreshing, setRefreshing] = useState(false)

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

  useEffect(() => {
    checkStorageCourse()
  }, [checkStorageCourse])

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
        />
      </Container>
    </Content>
  )
}
