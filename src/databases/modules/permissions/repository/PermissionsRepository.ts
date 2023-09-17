import { db } from 'databases'
import { Permissions } from '../model'

export async function createPermission({
  courseId,
  directoryName,
  uri,
  files,
  granted,
}: Permissions): Promise<Permissions | null> {
  try {
    return new Promise((resolve) => {
      db.transaction((tx) => {
        tx.executeSql(
          'INSERT INTO permissions (courseId, directoryName, uri, files, granted) VALUES (?, ?, ?, ?, ?)',
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

export async function listGrantedPermissions(): Promise<Permissions[] | null> {
  try {
    return new Promise((resolve) => {
      db.transaction((tx) => {
        tx.executeSql(
          'SELECT * FROM permissions WHERE granted = 1',
          [],
          (_, result) => {
            const permissions = []
            for (let i = 0; i < result.rows.length; i++) {
              const { id, courseId, directoryName, uri, files, granted } =
                result.rows.item(i)

              const fileParsed = JSON.parse(files)
              permissions.push({
                id,
                courseId,
                directoryName,
                uri,
                files: fileParsed,
                granted,
              })
            }
            console.log(
              result,
              'result SELECT * FROM permissions WHERE granted = 1',
            )
            if (permissions.length > 0) {
              resolve(permissions)
            } else {
              resolve(null)
            }
          },
          (_, error) => {
            throw new Error(`Error listing permissions: ${error}`)
          },
        )
      })
    })
  } catch (error) {
    throw new Error(`Error listing permissions: ${error}`)
  }
}

export async function updatePermission(
  courseId: string,
  granted: boolean,
): Promise<string | null> {
  try {
    return new Promise((resolve) => {
      db.transaction((tx) => {
        tx.executeSql(
          'UPDATE permissions SET granted = ? WHERE courseId = ?',
          [granted ? 1 : 0, courseId],
          (_, result) => {
            if (result.rowsAffected > 0) {
              resolve(courseId.toString())
            } else {
              resolve(null)
            }
          },
          (_, error) => {
            throw new Error(`Error updating permission: ${error}`)
          },
        )
      })
    })
  } catch (error) {
    throw new Error(`Error updating permission: ${error}`)
  }
}

export async function checkPermissionGranted(
  courseId: string,
): Promise<boolean> {
  try {
    return new Promise((resolve) => {
      db.transaction((tx) => {
        tx.executeSql(
          'SELECT * FROM permissions WHERE courseId = ? and granted = 1',
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
