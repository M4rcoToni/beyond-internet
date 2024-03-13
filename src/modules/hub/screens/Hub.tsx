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
  const { getDirectoryUri, listCourses, deleteCourse, setPermissionIndex, onCoursePress, permission } = useStorage()
  const { width } = useDimensions()

  async function getCourse() {
    await getDirectoryUri()
  }


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
            data={permission}
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
