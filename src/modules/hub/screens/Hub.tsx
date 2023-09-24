import React, { useCallback, useEffect, useState } from 'react'
import { Container, Content } from './styles'
import { useStorage } from '../../../shared/hooks/useStorage'
import { Permissions } from '../../../databases/modules/permissions/model/Permissions'
import { ClassList } from '../components/ClassList/ClassList'
import { useDimensions } from '@shared/hooks/useDimensions'

type Content = {
  name: string
  classes: number
  image: string
}

export function Hub() {
  const [content, setContent] = useState<Permissions[]>([] as Permissions[])
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
          data={[
            {
              id: '1',
              courseId: '4',
              directoryName: 'teste',
              uri: 'teste',
              files: 'teste',
              granted: true,
            },
          ]}
          refreshing={refreshing}
          onRefresh={checkStoragePermission}
          getCourse={getCourse}
        />
      </Container>
    </Content>
  )
}
