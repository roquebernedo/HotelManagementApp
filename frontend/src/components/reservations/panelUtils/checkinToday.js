export const checkinToday = (date, IN, startDate) => {
    const X = new Date(date),
        A = new Date(IN),
        today = new Date(startDate)

    if (A < today && X.getTime() === today.getTime()) {
        return 'pre'
    } else if (X.getTime() === A.getTime()) {
        return true
    } else return false
}