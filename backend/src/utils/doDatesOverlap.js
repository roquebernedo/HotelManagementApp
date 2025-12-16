export const doDatesOverlap = (a1, a2, b1, b2) => {
    const a = new Date(a1),
        b = new Date(a2),
        x = new Date(b1),
        y = new Date(b2)

    if ((x >= a && x < b) || (x < a && y > a))
        return true
    else
        return false
}