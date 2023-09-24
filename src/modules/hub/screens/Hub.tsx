import React, { useCallback, useEffect, useState } from 'react'
import { Container, Content } from './styles'

import { useDimensions } from '@shared/hooks/useDimensions'
import { ClassList } from '@modules/hub/components/ClassList/ClassList'
import { useStorage } from '@shared/hooks/useStorage'
export type Permissions = {
  id?: string
  courseId: string
  directoryName: string
  uri: string
  files: string
  granted: boolean
}

export function Hub() {
  const [content, setContent] = useState<Permissions[]>([])
  const [refreshing, setRefreshing] = useState(false)

  const { getDirectoryUri, listPermissions } = useStorage()
  const { width } = useDimensions()
  async function getCourse() {
    await getDirectoryUri()
  }

  const checkStoragePermission = useCallback(async () => {
    const permissions = await listPermissions()

    if (permissions) {
      setContent(permissions)
      setRefreshing(false)
    }
  }, [listPermissions])

  useEffect(() => {
    checkStoragePermission()
  }, [checkStoragePermission])

  return (
    <Content>
      <Container
        style={
          width > 700 ?? {
            flexDirection: 'row',
          }
        }
      >
        <ClassList
          data={content}
          refreshing={refreshing}
          onRefresh={checkStoragePermission}
          getCourse={getCourse}
        />
      </Container>
    </Content>
  )
}
