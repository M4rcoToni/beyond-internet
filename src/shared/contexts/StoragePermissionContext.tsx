import React, { createContext, useState, ReactNode } from 'react'
import * as FileSystem from 'expo-file-system'
import {
  checkPermissionGrantedController,
  createPermissionController,
  updateGrantedPermissionController,
  listGrantedPermissionsController,
} from 'databases/modules/permissions/controller/PermissionsController'
import { Permissions } from 'databases/modules/permissions/model/Permissions'
type StoragePermissionContextProps = {
  storagePermissionGranted: boolean | null
  getDirectoryUri: () => Promise<void>
  checkStoragePermission: () => Promise<void>
  listPermissions: () => Promise<Permissions[] | null>
  permission: Permissions
}

type StoragePermissionContextProviderProps = {
  children: ReactNode
}

export const StoragePermissionContext =
  createContext<StoragePermissionContextProps>(
    {} as StoragePermissionContextProps,
  )

export function StoragePermissionContextProvider({
  children,
}: StoragePermissionContextProviderProps) {
  const [storagePermissionGranted, setStoragePermissionGranted] = useState<
    boolean | null
  >(null)
  const [permission, setPermission] = useState<Permissions>({} as Permissions)

  async function getDirectoryUri() {
    try {
      const permissions =
        await FileSystem.StorageAccessFramework.requestDirectoryPermissionsAsync()

      if (permissions.granted) {
        const uri = permissions.directoryUri

        const files =
          await FileSystem.StorageAccessFramework.readDirectoryAsync(uri)
        console.log(files, 'files', typeof files)

        const filesContent = await FileSystem.getInfoAsync(files[2])

        if (filesContent.exists) {
          const content = await FileSystem.readAsStringAsync(filesContent.uri)

          const contentJson = JSON.parse(content)

          // Verifique se já existe uma permissão no SQLite para este diretório
          const isGranted = await checkPermissionGrantedController(
            contentJson.id,
          )

          if (!isGranted) {
            // Se não houver permissão no SQLite, crie uma nova
            const filesJson = JSON.stringify(files)

            const result = await createPermissionController({
              courseId: contentJson.id,
              directoryName: contentJson.name,
              uri,
              files: filesJson,
              granted: true,
            })

            setPermission({
              courseId: contentJson.id,
              directoryName: contentJson.name,
              uri,
              files: filesJson,
              granted: true,
            })

            console.log(result, 'createPermissionController')
          }

          setStoragePermissionGranted(isGranted)
        }
      } else {
        setStoragePermissionGranted(false)
      }
    } catch (error) {
      console.error('Error getting directory uri: ' + error)
      setStoragePermissionGranted(false)
    }
  }

  async function checkStoragePermission() {
    // try {
    //   if (id !== null) {
    //     const isGranted = await checkPermissionGrantedController(id)
    //     if (isGranted !== null) {
    //       setStoragePermissionGranted(isGranted)
    //     } else {
    //       const isUpdated = await updatePermissionController(id, true)
    //       if (isUpdated !== null) {
    //         setStoragePermissionGranted(true)
    //       }
    //     }
    //   } else {
    //     setStoragePermissionGranted(false)
    //   }
    // } catch (error) {
    //   console.error('Error checking storage permission:', error)
    //   setStoragePermissionGranted(false)
    // }
  }

  async function listPermissions() {
    try {
      const permissions = await listGrantedPermissionsController()

      if (permissions === null) {
        console.error('Zero permissions')
        return []
      }

      return permissions
    } catch (error) {
      console.error('Error listing permissions:', error)
    }
  }

  return (
    <StoragePermissionContext.Provider
      value={{
        storagePermissionGranted,
        getDirectoryUri,
        checkStoragePermission,
        listPermissions,
        permission,
      }}
    >
      {children}
    </StoragePermissionContext.Provider>
  )
}
