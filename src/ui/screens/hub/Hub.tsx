import React, { useLayoutEffect } from 'react'
import { Container, Content } from './styles'

import { CourseList } from '@ui/components/CourseList/CourseList'
import { useHubViewModel } from './useHubViewModel'
import { CoursesService } from '@data/services/course'
import { CoursesRepository } from '@data/repositories/course'
import Toast from 'react-native-toast-message'
import { CourseType } from '@sqlite/modules/course/interfaces/ICourseInterfaces'
import { SectionsRepository } from '@data/repositories/sections'
import { SectionsService } from '@data/services/sections'
import { useDimensions } from '@data/hooks/useDimensions'

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
  const { width } = useDimensions()

  const {
    handleOnGetCourse,
    handleOnListCourses,
    courses,
    handleOnDeleteCourse,
    handleOnCoursePress,
    isLoading,
  } = useHubViewModel(
    new CoursesRepository(new CoursesService(new SectionsService())),
    new SectionsRepository(new SectionsService()),
  )

  useLayoutEffect(() => {
    handleOnListCourses()
    // eslint-disable-next-line react-hooks/exhaustive-deps
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
            data={courses}
            refreshing={false}
            isLoadingCourse={isLoading}
            onRefresh={handleOnListCourses}
            getCourse={handleOnGetCourse}
            onCoursePress={handleOnCoursePress}
            deleteCourse={handleOnDeleteCourse}
          />
        </Container>
      </Content>
      <Toast />
    </>
  )
}
