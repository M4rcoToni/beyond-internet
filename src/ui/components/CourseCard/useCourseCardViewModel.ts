import { SectionsRepository } from '@data/repositories/sections'
import { SectionDTO } from '@sqlite/modules/sections/interfaces/ISectionInterface'
import { useMemo, useState } from 'react'

export function useCourseCardViewModel(section: SectionsRepository) {
  const [sections, setSections] = useState<SectionDTO[]>([])

  const handleListSections = async (courseId: number) => {
    const sections = await section.listSections(courseId)
    setSections(sections)
  }

  const completedSections = useMemo(
    () =>
      sections?.filter((section) => section.tests?.completed === 0).length ||
      10,
    [sections],
  )

  const totalSections = useMemo(() => sections?.length || 10, [sections])

  return {
    handleListSections,
    completedSections,
    totalSections,
  }
}
