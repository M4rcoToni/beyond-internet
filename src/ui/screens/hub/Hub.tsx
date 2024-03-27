import React, { useEffect } from 'react'
import { Container, Content } from './styles'

import { CourseList } from '@ui/components/CourseList/CourseList'
import { CourseType } from '../course/CourseType'
import { useDimensions } from '../../../data/hooks/useDimensions'
import { useStorage } from '@data/contexts/StoragePermissionContext'

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
  const {
    getDirectoryUri,
    listCourses,
    deleteCourse,
    setPermissionIndex,
    onCoursePress,
    checkStorageCourse,
    course,
  } = useStorage()
  const { width } = useDimensions()

  async function getCourse() {
    await getDirectoryUri()
  }
  useEffect(() => {
    checkStorageCourse()
  }, [])

  return (
    <>
      <Content>
        <Container
          style={
            width > 700 ?? {
              flexDirection: 'row',
            }
          }
        >
          <CourseList
            data={course}
            refreshing={false}
            onRefresh={listCourses}
            getCourse={getCourse}
            onCoursePress={onCoursePress}
            deleteCourse={deleteCourse}
          />
        </Container>
      </Content>
    </>
  )
}
