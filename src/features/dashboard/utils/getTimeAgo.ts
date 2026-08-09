export function getTimeAgo(timestamp: Date | number): string {
  const now = Date.now()
  const time = typeof timestamp === "number" ? timestamp : timestamp.getTime()
  const diffInSeconds = Math.floor((now - time) / 1000)

  if (diffInSeconds < 60) {
    return "hace un momento"
  }

  const diffInMinutes = Math.floor(diffInSeconds / 60)
  if (diffInMinutes < 60) {
    return `hace ${diffInMinutes} min`
  }

  const diffInHours = Math.floor(diffInMinutes / 60)
  if (diffInHours < 24) {
    return `hace ${diffInHours} horas`
  }

  const diffInDays = Math.floor(diffInHours / 24)
  if (diffInDays < 30) {
    return `hace ${diffInDays} días`
  }

  const diffInMonths = Math.floor(diffInDays / 30)
  return `hace ${diffInMonths} meses`
}