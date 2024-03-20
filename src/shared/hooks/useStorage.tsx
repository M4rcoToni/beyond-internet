import { useContext } from 'react'
import { StorageCourseContext } from '@shared/contexts/StoragePermissionContext'

export function useStorage() {
  const context = useContext(StorageCourseContext)

  return context
}
