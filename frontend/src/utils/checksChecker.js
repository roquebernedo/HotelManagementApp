import { formatDate } from "./formatDate"

export const checksChecker = (checkin, checkout) => {
    const IN = formatDate(checkin),
        OUT = formatDate(checkout),
        inDate = new Date(IN).getTime(),
        outDate = new Date(OUT).getTime(),
        Today = new Date(new Date().toLocaleDateString('en')).getTime(),
        inToday = inDate === Today,
        outToday = outDate === Today

    return { inToday, outToday }
}