import Room from "./model.js";
import Reservation from "../reservation/model.js"
import { dateSort } from "../../utils/sorter.js";

//? update room's current reservation
export const updateRoomReservs = async (room_id) => {
    const room = await Room.findById(room_id),
        today = new Date(new Date().toLocaleDateString('en'))

    if (!room) return { error: 'No rooms with that ID' }

    if (room.current_guest) {
        // current_guest es una ID de reserva
        const reservation = await Reservation.findById(room.current_guest)
        if (!reservation) {
            room.current_guest = null
        } else if (reservation.room !== room_id) {
            room.current_guest = null
        } else {
            // checkear las fechas de la reserva actual
            const checkin = new Date(reservation.checkin),
                checkout = new Date(reservation.checkout)

            // si in es > a hoy o out es < a hoy, eliminar current_guest
            if (checkin > today || checkout < today) {
                room.current_guest = null
            }
        }
    }
    if (!!room.reservations.length) {
        // checkear todas las reservas buscando una reserva actual
        // si el checkin es <= a hoy && checkout es > a hoy, agregar a current_guest
        const newReservations = []
        for (let i = 0; i < room.reservations.length; i++) {
            const r = room.reservations[i],
                checkin = new Date(r.in),
                checkout = new Date(r.out)

            // filtrar reservas pasadas
            if (checkout >= today) {
                // checkear que la reserva exista
                const reserv = await Reservation.findById(r.reservation_id)
                if (reserv) {
                    if (checkin <= today && checkout > today) {
                        room.current_guest = r.reservation_id
                    }
                    newReservations.push(r)
                }
            }
        }
        room.reservations = newReservations.sort(dateSort)
    }

    await room.save()

    return { error: false }
}

