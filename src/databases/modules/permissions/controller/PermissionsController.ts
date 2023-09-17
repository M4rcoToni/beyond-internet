import {
  createPermission,
  updatePermission,
  checkPermissionGranted,
  listGrantedPermissions,
} from '../repository/PermissionsRepository'

export const createPermissionController: typeof createPermission = async ({
  courseId,
  directoryName,
  uri,
  files,
  granted,
}) => {
  const response = await createPermission({
    courseId,
    directoryName,
    uri,
    files,
    granted,
  })

  if (response === null) {
    return null
  }
  return response
}

export const listGrantedPermissionsController: typeof listGrantedPermissions =
  async () => {
    try {
      const permission = await listGrantedPermissions()

      if (permission === null) {
        throw new Error(`No permission found for courseId`)
      }
      console.log(permission, 'permission listGrantedPermissions')

      return permission
    } catch (error) {
      throw new Error(`Error in listGrantedPermissions: ${error}`)
    }
  }

export const updateGrantedPermissionController: typeof updatePermission =
  async (courseId, granted) => {
    try {
      const updatedCourseId = await updatePermission(courseId, granted)

      if (updatedCourseId === null) {
        throw new Error(`No permission found for courseId: ${courseId}`)
      }

      return updatedCourseId
    } catch (error) {
      throw new Error(`Error in updatePermissionController: ${error}`)
    }
  }

export const checkPermissionGrantedController: typeof checkPermissionGranted =
  async (courseId) => {
    try {
      const isGranted = await checkPermissionGranted(courseId)

      return isGranted
    } catch (error) {
      throw new Error(`Error in checkPermissionGrantedController: ${error}`)
    }
  }
