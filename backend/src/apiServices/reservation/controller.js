import { deleteEntries } from "../../utils/deleteEntries.js";
import { registerEntry, registerQuickEntry, registerUpdatedEntries } from "../../utils/registerEntry.js";
import Reservation from "./model.js";
import Room from "../room/model.js";
import { addToRoomList, overlapDetector, removeFromRoom } from "./util.js";

const getReservation = async (req, res, next) => {
    try{
        console.log("getReservation")
        const { id } = req.query
        if(!id) return res.json({ error: 'No ID' })

        const reservation = await Reservation.findById(id)
            .populate('client')
            .populate('room', 'name')

        if(!reservation) return res.json({ error: 'No existen reservas con ese ID.' })
        
        return res.json({ reservation })

    } catch(error){
        next(error)
    }
}

const getAllReservations = async (req, res, next) => {
    try {
        const allReservations = await Reservation.find({})
            .populate('client')
            .populate('room', 'name')
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
        console.log(room)
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

const editReservation = async (req, res, next) => {
    try{
        const { user_name } = req.user
        const { id } = req.query
        const {
            client,
            checkin,
            checkout,
            nights,
            room,
            persons,
            paymentStatus,
            paymentDate,
            paymentType,
            currency,
            amount,
            fees,
            yapeDetails,
            percentage,
            extraPayments,
            total,
            notes
        } = req.body

        if (!id) return res.json({ error: 'No ID' })
        if (!client) return res.json({ error: 'No client ID' })
        if (!checkin) return res.json({ error: 'No checkin' })
        if (!checkout) return res.json({ error: 'No checkout' })
        if (!nights) return res.json({ error: 'No nights' })
        if (!room) return res.json({ error: 'No room' })
        if (!req.body.hasOwnProperty('paymentStatus')) return res.json({ error: 'No payment paymentStatus' })
        if (!paymentType) return res.json({ error: 'No payment paymentType' })
        if (!amount) return res.json({ error: 'No payment amount' })
        
        const { error, reservation_id } = await overlapDetector(room, checkin, checkout)
        if(error && reservation_id !== id) return res.json({ error })

        const { room: ogRoom} = await Reservation.findById(id)
        await removeFromRoom(ogRoom, id)

        const newReservation = await Reservation.findByIdAndUpdate(
            id,
            {
                $set: {
                    client: mongoose.Types.ObjectId(client),
                    checkin,
                    checkout,
                    nights,
                    room,
                    persons,
                    paymentStatus,
                    paymentDate,
                    paymentType,
                    currency,
                    amount,
                    fees,
                    yapeDetails,
                    percentage,
                    extraPayments,
                    notes,
                    total,
                    editor: user_name
                }
            }
        )

        const updatedRoom = await addToRoomList(room, newReservation.id, checkin, checkout)

        // eliminar entries anteriores y guardar ID del ledger

        await deleteEntries(id)

        await registerUpdatedEntries(req.body, id, user_name)

        const allReservations = await Reservation.find({})
            .populate('client')
            .populate('room', 'name')

        return res.json({
            message: 'Reserva actualizada exitosamente',
            newReservation,
            reservationsList: allReservations,
            updatedRoom
        })

    } catch(error){
        next(error)
    }
}

const deleteReservation = async (req, res, next) => {
    try {
        const { id, remove } = req.query
        if (!id) return res.json({ error: 'No ID' })

        const existingID = await Reservation.findById(id)
        if (!existingID) return res.json({ error: 'No hay reservas con esa ID.' })

        const { room } = await Reservation.findByIdAndDelete(id)
        
        const roomExists = await Room.findById(room)
      
        if (roomExists) await removeFromRoom(room, id)

        //: Remove ledger entries
        if (remove === 'true') {
            await deleteEntries(id)
        }

        const allReservations = await Reservation.find({})
        return res.json({ message: 'Reserva eliminada.', reservationList: allReservations })

    } catch (error) {
        next(error)
    }
}

const quickPayment = async (req, res, next) => {
    try {
        const { user_name } = req.user
        const { id } = req.query
        const {
            paymentDate,
            paymentStatus,
            paymentType,
            amount,
            currency,
            fees,
            yapeDetails,
            percentage
        } = req.body

        if (!id) return res.json({ error: 'No ID' })
        if (!req.body.hasOwnProperty('paymentStatus')) return res.json({ error: 'No payment paymentStatus' })
        if (!paymentType) return res.json({ error: 'No payment paymentType' })
        if (!amount) return res.json({ error: 'No payment amount' })

        const reserv = await Reservation.findById(id)
        if (!reserv) return res.json({ error: 'No hay reservas con esa ID.' })

        const extra_id = !!reserv?.extraPayments?.length ? 'extra' + (reserv?.extraPayments?.length + 1) : 'extra1',
            data = {
                id: extra_id,
                paymentDate,
                paymentType,
                currency,
                amount,
                fees,
                yapeDetails,
                percentage,
            }

        if (reserv?.extraPayments) {
            reserv.extraPayments = [...reserv.extraPayments, data]
        } else {
            reserv.extraPayments = [data]
        }

        if (paymentStatus) {
            reserv.paymentStatus = true
        }

        await reserv.save()

        const entryData = {
            client: reserv.client,
            paymentDate,
            paymentType,
            checkin: new Date().toLocaleDateString('en'),
            currency,
            amount
        }

        await registerQuickEntry(entryData, user_name, id)

        const reservationsList = await Reservation.find({})
            .populate('client')
            .populate('room', 'name')

        return res.json({ message: 'Pagos de la reserva actualizados.', reserv, reservationsList })

    } catch (err) {
        next(err)
    }
}

export {
    createReservation,
    getAllReservations,
    getReservation,
    editReservation,
    deleteReservation,
    quickPayment
}