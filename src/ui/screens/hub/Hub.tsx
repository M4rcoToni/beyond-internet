import React, { useEffect } from 'react'
import { Container, Content } from './styles'

import { CourseList } from '@ui/components/CourseList/CourseList'
import { CourseType } from '../course/CourseType'
import { useDimensions } from '../../../data/hooks/useDimensions'
import { useStorage } from '@data/contexts/StoragePermissionContext'
import { useHubViewModel } from './useHubViewModel'
import { CoursesService } from '@data/services/course'
import { CoursesRepository } from '@data/repositories/course'
import Toast from 'react-native-toast-message'

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

  // const { handleSignIn, loading } = useSignInViewModel(
  //   new AuthRepository(new AuthService()),
  // )
  const { handleOnGetCourse } = useHubViewModel(
    new CoursesRepository(new CoursesService()),
  )

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
            getCourse={handleOnGetCourse}
            onCoursePress={onCoursePress}
            deleteCourse={deleteCourse}
          />
        </Container>
      </Content>
      <Toast />
    </>
  )
}
