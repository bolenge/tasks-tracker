export const durationBetweenTimestamps = (start: number, end: number) => {
  let seconds = Math.floor ((end / 1000) - (start / 1000))
  let minutes = Math.floor (seconds / 60)
  const hours = Math.floor(minutes / 60)
  
  seconds = seconds % 60
  minutes = minutes % 60

  return `${String(hours).padStart(2, '0')}:${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`
}

export const formatTimestamps = (ts: number) => {
  return Intl.DateTimeFormat('fr-FR', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric'
  }).format(ts)
}
