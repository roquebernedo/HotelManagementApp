export const textSort = (a, b) => {
    const A = a.name.toLowerCase(),
        B = b.name.toLowerCase()
    if (A < B) {
        return -1;
    }
    if (A > B) {
        return 1;
    }
    return 0;
}

export const dateSort = (a, b) => {
    const A = new Date(a),
        B = new Date(b)
    if (A < B) {
        return -1;
    }
    if (A > B) {
        return 1;
    }
    return 0;
}