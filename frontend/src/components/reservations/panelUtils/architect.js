import { formatDate } from "@/utils/formatDate"
import { baseDates } from "./baseDates"
import { checkinToday } from "./checkinToday"
import { nextDay } from "./nextDay"
import { overlaped } from "./overlaped"
import { templateMaker } from "./templateMaker"

export const architect = (rooms, reservations, START, DAYS) => {
    console.log(rooms)
    const { startDate, finalDate } = baseDates(START, DAYS)
    const template = templateMaker(rooms)
    let dates = []
    console.log(reservations)
    for (let i = new Date(startDate); i < finalDate; i = nextDay(i)) {
        //: guardo fechas de la cabecera
        const date = formatDate(i)
        dates.push(i)

        //: en cada cabaña del objeto base, agrego la fecha del día
        for (const key in template) {
            if (Object.hasOwnProperty.call(template, key)) {
                const prop = template[key];
                let aux = { date: i }

                //: busca una reserva que coincida con la fecha actual (i)
                //: y ID de cabaña (key)
                const R = reservations.find(r => r.room?.id === key && overlaped(date, r.checkin, r.checkout))
                if (R) {
                    let reserv = {
                        id: R.id,
                        nights: R.nights,
                        pax: R.persons,
                        name: R?.client?.name,
                        country_code: R?.client?.country_code,
                        checkin: checkinToday(date, R.checkin, startDate),
                        checkout: false,
                        paymentStatus: R?.paymentStatus
                    }

                    if (reserv.checkin === 'pre') {
                        // checkout - hoy = dias restantes (en MiliSegundos)
                        // si usaba fechas, se rompía la logica cuando cambiaba de mes
                        const OUT = new Date(R.checkout).getTime(),
                            today = i.getTime(),
                            nightsLeft = ((OUT - today) / 1000 / 60 / 60 / 24) + 0.5
                        reserv.nights = nightsLeft
                    }

                    aux = { ...aux, reserv }
                }
                prop.push(aux)
            }
        }
    }
    return {
        dates,
        template
    }
}