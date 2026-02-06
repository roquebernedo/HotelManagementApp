export const getDay = (day, data) => {
    const date = Object.keys(data).find(k => new Date(k).getDay() === day)

    let currency = false
    data[date] && data[date].forEach(e => {
        if (e.currency !== 'Soles') {
            currency = true
        }
    })

    return {
        data: data[date] || [],
        date,
        currency
    }
}