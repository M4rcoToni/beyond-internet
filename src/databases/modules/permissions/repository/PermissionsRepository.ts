import { db } from 'databases'
import { Courses } from '../model/Permissions'

export async function createCourse({
  courseId,
  directoryName,
  uri,
  files,
  granted,
}: Courses): Promise<Courses | null> {
  try {
    return new Promise((resolve) => {
      db.transaction((tx) => {
        tx.executeSql(
          'INSERT INTO course (courseId, directoryName, uri, files, granted) VALUES (?, ?, ?, ?, ?)',
          [courseId, directoryName, uri, files, granted ? 1 : 0],
          (_, result) => {
            if (result.rowsAffected > 0) {
              resolve({ courseId, directoryName, uri, files, granted })
            } else {
              resolve(null)
            }
          },
          (_, error) => {
            throw new Error(`Error creating permission: ${error}`)
          },
        )
      })
    })
  } catch (error) {
    throw new Error(`Error creating permission: ${error}`)
  }
}

export async function listGrantedCourses(): Promise<Courses[] | null> {
  try {
    return new Promise((resolve) => {
      db.transaction((tx) => {
        tx.executeSql(
          'SELECT * FROM course WHERE granted = 1',
          [],
          (_, result) => {
            const course = []
            for (let i = 0; i < result.rows.length; i++) {
              const { id, courseId, directoryName, uri, files, granted } =
                result.rows.item(i)

              const fileParsed = JSON.parse(files)
              course.push({
                id,
                courseId,
                directoryName,
                uri,
                files: fileParsed,
                granted,
              })
            }
            console.log(result, 'result SELECT * FROM course WHERE granted = 1')
            if (course.length > 0) {
              resolve(course)
            } else {
              resolve(null)
            }
          },
          (_, error) => {
            throw new Error(`Error listing course: ${error}`)
          },
        )
      })
    })
  } catch (error) {
    throw new Error(`Error listing course: ${error}`)
  }
}

export async function updateCourse(
  courseId: string,
  granted: boolean,
): Promise<string | null> {
  try {
    return new Promise((resolve) => {
      db.transaction((tx) => {
        tx.executeSql(
          'UPDATE course SET granted = ? WHERE courseId = ?',
          [granted ? 1 : 0, courseId],
          (_, result) => {
            if (result.rowsAffected > 0) {
              resolve(courseId.toString())
            } else {
              resolve(null)
            }
          },
          (_, error) => {
            throw new Error(`Error updating course: ${error}`)
          },
        )
      })
    })
  } catch (error) {
    throw new Error(`Error updating course: ${error}`)
  }
}

export async function checkCourseGranted(courseId: string): Promise<boolean> {
  try {
    return new Promise((resolve) => {
      db.transaction((tx) => {
        tx.executeSql(
          'SELECT * FROM course WHERE courseId = ? and granted = 1',
          [courseId],
          (_, result) => {
            if (result.rows.length > 0) {
              const { granted } = result.rows.item(0)

              resolve(granted === 1) // Retorna true se a permissão estiver concedida
            } else {
              resolve(false) // Permissão não encontrada, considera como não concedida
            }
          },
          (_, error) => {
            throw new Error(`Error checking permission: ${error}`)
          },
        )
      })
    })
  } catch (error) {
    throw new Error(`Error checking permission: ${error}`)
  }
}
