import { Separator, Button, SubTitle } from '@ui/components'
import React from 'react'
import { FlatList, TouchableOpacity, StyleSheet } from 'react-native'
import { DrawerHeader } from '../DrawerHeader/DrawerHeader'
import { User } from '../../../../../sqlite/modules/users/model'
import { Feather } from '@expo/vector-icons'
import { useStorage } from '@shared/hooks/useStorage'

interface HubContentProps {
  signOut: () => void
  user: User | null
}

export function HubContent({ signOut, user }: HubContentProps) {
  const { getDirectoryUri } = useStorage()

  return (
    <>
      <FlatList
        style={styles.container}
        ListHeaderComponent={() => <DrawerHeader user={user} />}
        data={[
          {
            name: 'Cursos',
            icon: 'folder',
          },
          {
            name: 'Perfil',
            icon: 'user',
          },
          {
            name: 'Provas',
            icon: 'file-text',
          },
          {
            name: 'Certificados',
            icon: 'check-square',
          },
          {
            name: 'Abrir um curso',
            icon: 'plus-square',
            onPress: () => getDirectoryUri(),
          },
        ]}
        renderItem={({ item }) => (
          <>
            <TouchableOpacity
              onPress={item.onPress}
              style={{
                flex: 1,
                flexDirection: 'row',
                justifyContent: 'flex-start',
                alignItems: 'center',
                paddingVertical: 16,
                paddingLeft: 14,
              }}
            >
              <Feather
                name={item.icon}
                size={24}
                color={'#000'}
                style={{ paddingHorizontal: 14 }}
              />
              <SubTitle size={18} text={item.name} />
            </TouchableOpacity>
          </>
        )}
        keyExtractor={(item) => item.name}
        ItemSeparatorComponent={Separator}
        ListFooterComponentStyle={styles.footer}
      />
      <Button
        title="Sair"
        onPress={signOut}
        style={{
          width: 90,
          height: 50,
          alignSelf: 'center',
          marginBottom: '10%',
        }}
      />
    </>
  )
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  footer: {
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
})
