import { useContext } from 'react'
import { StorageCourseContext } from '../contexts/StoragePermissionContext'

export function useStorage() {
  const context = useContext(StorageCourseContext)

  return context
}
