import { db } from 'databases'
import { Courses } from '../model'

export async function createCourse({
  courseId,
  directoryName,
  uri,
  files,
  index,
  granted,
}: Courses): Promise<Courses | null> {
  try {
    return new Promise((resolve) => {
      db.transaction((tx) => {
        tx.executeSql(
          `INSERT INTO course (courseId, directoryName, uri, files, indexFile, granted) VALUES (?, ?, ?, ?, ?, ?)`,
          [courseId, directoryName, uri, files, index, granted ? 1 : 0],
          (_, result) => {
            if (result.rowsAffected > 0) {

              resolve({
                courseId,
                directoryName,
                uri,
                files: JSON.parse(files),
                granted,
                index,
              })

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
              const {
                id,
                courseId,
                directoryName,
                uri,
                files,
                granted,
                indexFile,
              } = result.rows.item(i)

              const fileParsed = JSON.parse(files)
              const indexParsed = JSON.parse(indexFile)
              course.push({
                id,
                courseId,
                directoryName,
                uri,
                files: fileParsed,
                granted,
                index: indexParsed,
              })
            }

            if (course.length > 0) {
              resolve(course)
            } else {
              resolve(null)
            }
          },
          (_, error) => {
            throw new Error(`Error listing course in repository: ${error}`)
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
// create deleteCourseById

export async function deleteCourseById(
  courseId: string,
): Promise<string | null> {
  try {
    return new Promise((resolve) => {
      db.transaction((tx) => {
        tx.executeSql(
          'DELETE FROM course WHERE courseId = ?',
          [courseId],
          (_, result) => {
            if (result.rowsAffected > 0) {
              resolve(courseId.toString())
            } else {
              resolve(null)
            }
          },
          (_, error) => {
            throw new Error(`Error deleting course: ${error}`)
          },
        )
      })
    })
  } catch (error) {
    throw new Error(`Error deleting course: ${error}`)
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
