import { registerEntry } from "../../utils/registerEntry.js";
import Reservation from "./model.js";
import { addToRoomList, overlapDetector } from "./util.js";

const getAllReservations = async (req, res, next) => {
    try {
        const allReservations = await Reservation.find({})
            .populate('client')
            .populate('cabin', 'name')
        return res.json({ reservationList: allReservations })

    } catch (error) {
        next(error)
    }
}

const createReservation = async (req, res, next) => {
    try{
        console.log("creating reservation")
        const { user_name } = req.user
        const {
            client,
            checkin,
            checkout,
            nights,
            room,
            persons,
            paymentStatus,
            currency,
            paymentDate,
            paymentType,
            fees,
            yapeDetails,
            percentage,
            amount,
            extraPayments,
            total,
            notes
        } = req.body
        console.log(user_name)
        console.log(client)

        if (!client) return res.json({ error: 'No client ID' })
        if (!checkin) return res.json({ error: 'No checkin' })
        if (!checkout) return res.json({ error: 'No checkout' })
        if (!nights) return res.json({ error: 'No nights' })
        if (!room) return res.json({ error: 'No room' })
        if (!persons) return res.json({ error: 'No persons' })
        if (!req.body.hasOwnProperty('paymentStatus')) return res.json({ error: 'No payment paymentStatus' })
        if (!currency) return res.json({ error: 'No payment currency' })
        if (!paymentType) return res.json({ error: 'No payment paymentType' })
        if (typeof amount !== 'number') return res.json({ error: 'No payment amount' })

        const { error, reservation_id } = await overlapDetector(room, checkin, checkout)
        console.log(error)
        console.log(reservation_id)
        console.log("pasamos al res_id")
        if(error) return res.json({ error, reservation_id })

        const newReservation = await Reservation.create(
            {
                client,
                checkin,
                checkout,
                nights,
                room,
                persons,
                paymentDate,
                paymentStatus,
                currency,
                paymentType,
                fees,
                yapeDetails,
                percentage,
                amount,
                extraPayments,
                notes,
                total,
                creator: user_name
            }
        )
        console.log("Linea 70")
        console.log(newReservation)
        //
        const updatedRoom = await addToRoomList(room, newReservation.id, checkin, checkout)
        console.log(updatedRoom)

        await registerEntry(req.body, user_name, newReservation.id)

        const allReservations = await Reservation.find()
            .populate('client')
            .populate('room', 'name')

        console.log(allReservations)

        return res.json({ 
            message: 'Reserva creada exitosamente',
            newReservation,
            reservationsList: allReservations,
            updatedRoom
        })

    } catch(error){
        next(error)
    }
}

export {
    createReservation,
    getAllReservations
}