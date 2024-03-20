import {
  listGrantedCourses,
  updateCourse,
  checkCourseGranted,
  deleteCourseById,
  createCourse,
} from '../repository/CourseRepository'

export const createCourseController: typeof createCourse = async ({
  courseId,
  directoryName,
  uri,
  files,
  index,
  granted,
}) => {
  const response = await createCourse({
    courseId,
    directoryName,
    uri,
    files,
    granted,
    index,
  })

  if (response === null) {
    throw new Error(`Failed to create course: ${courseId}`)
  }

  return response
}

export const listGrantedCoursesController: typeof listGrantedCourses =
  async () => {
    try {
      const permission = await listGrantedCourses()

      if (permission === null) {
        throw new Error(`No permission found for courseId`)
      }

      return permission
    } catch (error) {
      throw new Error(`Error in listGrantedCourses: ${error}`)
    }
  }

export const updateGrantedCourseController: typeof updateCourse = async (
  courseId,
  granted,
) => {
  try {
    const updatedCourseId = await updateCourse(courseId, granted)

    if (updatedCourseId === null) {
      throw new Error(`No permission found for courseId: ${courseId}`)
    }

    return updatedCourseId
  } catch (error) {
    throw new Error(`Error in updateCourseController: ${error}`)
  }
}

export const deleteCourseController: typeof updateCourse = async (courseId) => {
  try {
    const updatedCourseId = await deleteCourseById(courseId)

    if (updatedCourseId === null) {
      throw new Error(`No permission found for courseId: ${courseId}`)
    }

    return updatedCourseId
  } catch (error) {
    throw new Error(`Error in updateCourseController: ${error}`)
  }
}

export const checkCourseGrantedController: typeof checkCourseGranted = async (
  courseId,
) => {
  try {
    const isGranted = await checkCourseGranted(courseId)

    return isGranted
  } catch (error) {
    throw new Error(`Error in checkCourseGrantedController: ${error}`)
  }
}
