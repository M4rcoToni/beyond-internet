import React, {
  createContext,
  useState,
  ReactNode,
  useEffect,
  useCallback,
  useContext,
} from 'react'
import * as FileSystem from 'expo-file-system'
import {
  checkCourseGrantedController,
  createCourseController,
  deleteCourseController,
  listGrantedCoursesController,
} from '../../../sqlite/modules/course/controller/CourseController'
import { useNavigation } from '@react-navigation/native'
import { Section } from '@ui/screens/course/CourseType'
import { Courses } from '../../../sqlite/modules/course/model'
import { useSection } from '../hooks/useSection'

type StorageCourseContextProps = {
  storageCourseGranted: boolean | null
  getDirectoryUri: () => Promise<void>
  checkStorageCourse: () => Promise<void>
  deleteCourse: (id: string) => Promise<void>
  listCourses: () => Promise<Courses[] | null>
  course: Courses[]
  index: number
  setPermissionIndex: (index: number) => void
  isLoading: boolean
  onCoursePress: (course: Section, index: number) => void
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
  const [course, setCourse] = useState<Courses[]>([] as Courses[])
  const [index, setIndex] = useState<number>(0)
  const [isLoading, setIsLoading] = useState(false)

  const { handleSelectSection } = useSection()
  const navigation = useNavigation()

  async function getDirectoryUri() {
    try {
      const permissions =
        await FileSystem.StorageAccessFramework.requestDirectoryPermissionsAsync()

      if (permissions.granted) {
        const uri = permissions.directoryUri

        const files =
          await FileSystem.StorageAccessFramework.readDirectoryAsync(uri)

        const index = files.find((file) => {
          console.log(file.indexOf('.json'))
          if (file.indexOf('.json') !== -1) {
            return file
          }
          return null
        })
        console.log(index)

        if (index) {
          const filesContent = await FileSystem.getInfoAsync(index)
          console.log(filesContent.exists)

          if (filesContent.exists) {
            const content = await FileSystem.readAsStringAsync(filesContent.uri)

            const contentJson = JSON.parse(content)

            // Verifique se já existe uma permissão no SQLite para este diretório
            const isGranted = await checkCourseGrantedController(contentJson.id)
            console.log(isGranted, 'isGRANTED')

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

              setCourse([
                {
                  courseId: contentJson.id,
                  directoryName: contentJson.name,
                  uri,
                  files: filesJson,
                  granted: true,
                  index: contentJson,
                },
              ])
            }

            setStorageCourseGranted(isGranted)
          }
        }
      } else {
        console.log('index not found')

        setStorageCourseGranted(false)
      }
    } catch (error) {
      console.error('Error getting directory uri: ' + error)
      setStorageCourseGranted(false)
    }
  }

  const listCourses = useCallback(async () => {
    try {
      const storageCourses = await listGrantedCoursesController()

      if (storageCourses === null) {
        console.log('zero courses to list')
      }
      if (course) {
        setCourse(storageCourses)
      }
      return storageCourses
    } catch (error) {
      console.error('Error listing permissions in context:', error)
      return null
    }
  }, [course])

  const checkStorageCourse = useCallback(async () => {
    const permissions = await listCourses()
    console.log(permissions, 'permissions')

    if (permissions) {
      const courseAlreadySaved = permissions.find((permission) => {
        if (course.includes(permission)) {
          return permission
        }
      })
      if (!courseAlreadySaved) {
        setCourse(permissions)
      }
    }
  }, [course, listCourses])

  // delete course
  async function deleteCourse(id: string) {
    try {
      setCourse(null)
      const res = await deleteCourseController(id, false)

      if (res === null) {
        console.error('Zero permissions')
      }
    } catch (error) {
      console.error('Error listing permissions:', error)
    }
  }

  // setpermission index
  function setPermissionIndex(index: number) {
    setIndex(index)
  }

  function onCoursePress(course: Section, index: number) {
    setIsLoading(true)
    console.log(course, 'onCoursePress')

    handleSelectSection(course)
    setIsLoading(false)
    setPermissionIndex(index)
    navigation.navigate('Course', { index })
  }

  // useEffect(() => {
  //   checkStorageCourse()
  // }, [])

  return (
    <StorageCourseContext.Provider
      value={{
        storageCourseGranted,
        getDirectoryUri,
        checkStorageCourse,
        listCourses,
        isLoading,
        course,
        deleteCourse,
        index,
        setPermissionIndex,
        onCoursePress,
      }}
    >
      {children}
    </StorageCourseContext.Provider>
  )
}

export function useStorage() {
  const context = useContext(StorageCourseContext)

  return context
}
