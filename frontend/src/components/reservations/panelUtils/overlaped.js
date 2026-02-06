export const overlaped = (date, IN, OUT) => {
    const X = new Date(date),
        A = new Date(IN),
        B = new Date(OUT)

    if (X >= A && X < B) {
        return true
    } else return false
}