import {
  FlatList,
  SafeAreaView,
  StyleSheet,
  TouchableOpacity,
} from 'react-native'
import { DrawerContentComponentProps } from '@react-navigation/drawer'
import { Button, Photo, SubTitle } from '@shared/components'
import { Separator } from '@shared/components/Separator/Separator'
import { useAuth } from '@shared/hooks/useAuth'
import { DrawerHeader } from './DrawerHeader/DrawerHeader'
import { Feather } from '@expo/vector-icons'

interface DrawerContentProps {
  item: DrawerContentComponentProps
}

export function DrawerContent({ item }: DrawerContentProps) {
  const { user, signOut } = useAuth()
  console.log(item.state.index)

  return (
    <SafeAreaView style={{ flex: 1 }}>
      {item.state.index === 0 ? (
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
            ]}
            renderItem={({ item }) => (
              <>
                <TouchableOpacity
                  onPress={() => {}}
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
      ) : (
        <Button
          title="Voltar"
          // onPress={signOut}
          style={{
            width: 90,
            height: 50,
            alignSelf: 'center',
            marginBottom: '10%',
          }}
        />
      )}
    </SafeAreaView>
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
