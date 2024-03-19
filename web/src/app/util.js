export const formatDateDifference = (scheduledDate) => {
    const currentDate = new Date()
    const scheduledDateTime = new Date(scheduledDate)
    const timeDifference = scheduledDateTime.getTime() - currentDate.getTime()
    const daysDifference = Math.ceil(timeDifference / (1000 * 3600 * 24))

    if (daysDifference === 0) {
        return 'today'
    } else if (daysDifference === 1) {
        return 'tomorrow'
    } else if (daysDifference > 1 && daysDifference < 7) {
        return `in ${daysDifference} days`
    } else {
        const monthsDifference = Math.ceil(daysDifference / 30)
        return `in ${monthsDifference} months`
    }
}