export function formatStudyTime(milliseconds: number) {
  const totalSeconds = Math.floor(milliseconds / 1000)
  const totalMinutes = Math.floor(totalSeconds / 60)
  const totalHours = Math.floor(totalMinutes / 60)

  const seconds = totalSeconds % 60
  const minutes = totalMinutes % 60
  const hours = totalHours

  const formattedTime = `${hours}h ${minutes}m ${seconds}s`

  return formattedTime
}
