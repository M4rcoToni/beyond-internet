import { useContext } from 'react'
import { StoragePermissionContext } from '@shared/contexts/StoragePermissionContext'

export function useStorage() {
  const context = useContext(StoragePermissionContext)

  return context
}
