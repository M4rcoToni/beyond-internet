import React, { createContext, useState, ReactNode, useEffect } from 'react'
import * as FileSystem from 'expo-file-system'
import { Courses } from '@modules/hub/screens/Hub'
import {
  checkCourseGrantedController,
  createCourseController,
  deleteCourseController,
  listGrantedCoursesController,
} from 'databases/modules/course/controller/CourseController'

type StorageCourseContextProps = {
  storageCourseGranted: boolean | null
  getDirectoryUri: () => Promise<void>
  checkStorageCourse: () => Promise<void>
  deleteCourse: (id: string) => Promise<void>
  listCourses: () => Promise<Courses[] | null>
  permission: Courses
}

type StorageCourseContextProviderProps = {
  children: ReactNode
}

export const StorageCourseContext = createContext<StorageCourseContextProps>(
  {} as StorageCourseContextProps,
)

export function StorageCourseContextProvider({
  children,
}: StorageCourseContextProviderProps) {
  const [storageCourseGranted, setStorageCourseGranted] = useState<
    boolean | null
  >(null)
  const [permission, setCourse] = useState<Courses>({} as Courses)

  async function getDirectoryUri() {
    try {
      const permissions =
        await FileSystem.StorageAccessFramework.requestDirectoryPermissionsAsync()

      if (permissions.granted) {
        const uri = permissions.directoryUri

        const files =
          await FileSystem.StorageAccessFramework.readDirectoryAsync(uri)

        const filesContent = await FileSystem.getInfoAsync(files[2])

        if (filesContent.exists) {
          const content = await FileSystem.readAsStringAsync(filesContent.uri)

          const contentJson = JSON.parse(content)

          // Verifique se já existe uma permissão no SQLite para este diretório
          const isGranted = await checkCourseGrantedController(contentJson.id)

          if (!isGranted) {
            // Se não houver permissão no SQLite, crie uma nova
            const filesJson = JSON.stringify(files)

            await createCourseController({
              courseId: contentJson.id,
              directoryName: contentJson.name,
              uri,
              files: filesJson,
              granted: true,
              index: JSON.stringify(contentJson),
            })

            setCourse({
              courseId: contentJson.id,
              directoryName: contentJson.name,
              uri,
              files: filesJson,
              granted: true,
              index: contentJson,
            })
          }

          setStorageCourseGranted(isGranted)
        }
      } else {
        setStorageCourseGranted(false)
      }
    } catch (error) {
      console.error('Error getting directory uri: ' + error)
      setStorageCourseGranted(false)
    }
  }

  async function checkStorageCourse() {
    // try {
    //   if (id !== null) {
    //     const isGranted = await checkCourseGrantedController(id)
    //     if (isGranted !== null) {
    //       setStorageCourseGranted(isGranted)
    //     } else {
    //       const isUpdated = await updateCourseController(id, true)
    //       if (isUpdated !== null) {
    //         setStorageCourseGranted(true)
    //       }
    //     }
    //   } else {
    //     setStorageCourseGranted(false)
    //   }
    // } catch (error) {
    //   console.error('Error checking storage permission:', error)
    //   setStorageCourseGranted(false)
    // }
  }

  async function listCourses() {
    try {
      const permissions = await listGrantedCoursesController()

      if (permissions === null) {
        console.log('zero courses to list')
      }

      setCourse(permissions[0])
      return permissions
    } catch (error) {
      console.error('Error listing permissions in context:', error)
      return null
    }
  }

  // delete course
  async function deleteCourse(id: string) {
    try {
      const res = await deleteCourseController(id, false)

      if (res === null) {
        console.error('Zero permissions')
      }
      setCourse({} as Courses)
    } catch (error) {
      console.error('Error listing permissions:', error)
    }
  }

  return (
    <StorageCourseContext.Provider
      value={{
        storageCourseGranted,
        getDirectoryUri,
        checkStorageCourse,
        listCourses,
        permission,
        deleteCourse,
      }}
    >
      {children}
    </StorageCourseContext.Provider>
  )
}
