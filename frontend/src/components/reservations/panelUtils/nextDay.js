export const nextDay = (i) => {
    const d = new Date(i)
    return new Date(new Date(d).setDate(d.getDate() + 1))
}