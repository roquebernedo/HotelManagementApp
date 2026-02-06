export const baseDates = (START, DAYS) => {
    // startDate define donde comienza la tabla
    // finalDate define hasta donde va a llegar la tabla
    // const finalDate = new Date(new Date().setDate(new Date().getDate() + DAYS))
    const startDate = START || new Date().toLocaleDateString('en'), // <== STRING
        finalDate = new Date(new Date(startDate).setDate(new Date(startDate).getDate() + DAYS))

    return { startDate, finalDate }
}