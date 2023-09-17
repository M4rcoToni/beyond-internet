import React, { useCallback, useEffect, useState } from 'react'
import { ClassCard } from '../components/ClassCard/ClassCard'
import { Container, FlatListStyled } from './styles'
import { ActivityIndicator, FlatList, RefreshControl } from 'react-native'
import { Button } from '@shared/components'
import { useStorage } from '../../../shared/hooks/useStorage'
import { Permissions } from '../../../databases/modules/permissions/model/Permissions'
import { loadUserData } from 'databases/modules/users/repository/UserRepository'

type Content = {
  name: string
  classes: number
  image: string
}

export function Hub() {
  const [content, setContent] = useState<Permissions[]>([] as Permissions[])
  const [refreshing, setRefreshing] = useState(true)
  const { getDirectoryUri, listPermissions } = useStorage()

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
    <Container>
      <Button title="Abrir um Curso" onPress={getCourse}>
        Sair
      </Button>
      {content ? (
        <FlatList
          data={content}
          refreshControl={
            <RefreshControl
              refreshing={refreshing}
              onRefresh={checkStoragePermission}
            />
          }
          keyExtractor={(item) => item.courseId}
          renderItem={({ item }) => (
            <ClassCard
              title={item.directoryName}
              subTitle={`${item.id} aulas`}
              image={item.files[4]}
            />
          )}
        />
      ) : (
        <ActivityIndicator size="large" color="#4445" />
      )}
    </Container>
  )
}
