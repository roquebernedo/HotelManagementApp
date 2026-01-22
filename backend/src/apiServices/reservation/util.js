import { doDatesOverlap } from "../../utils/doDatesOverlap.js";
import Room from "../room/model.js";

// Deteccion de superposicion de fechas
const overlapDetector = async (room, checkin, checkout) => {
    try{
        console.log("overlapDetector")
        console.log(checkin)
        console.log(checkout)
        const roomExists = await Room.findById(room)
        console.log(roomExists)
        if(!roomExists) return res.json({ error: 'ID de cuarto incorrecto' })
        
        let overlap = roomExists.reservations.find(r => 
            doDatesOverlap(r.in, r.out, checkin, checkout)
        )
        console.log("llego al overlap")
        console.log(overlap)
        if(overlap){
            return {
                error: `Fechas no disponibles. Fechas solicitadas en este registro: ${checkin} al ${checkout}. Conflicto con reserva existente: ${overlap.in} al ${overlap.out}, id de reserva: ${overlap.reservation_id}`,
                reservation_id: overlap.reservation_id
            }
        }else{
            console.log("entro al else")
            return { error: false }
        }

    } catch(error){
        return { error }
    }
}

// 
const addToRoomList = async (room, id, checkin, checkout) => {
    const updateRoom = await Room.findByIdAndUpdate(
        room,
        {
            "$push": {
                reservations: {
                    reservation_id: id,
                    in: checkin,
                    out: checkout
                }
            }
        }
    )

    return
}

const removeFromRoom = async (room, id) => {
    await Room.findByIdAndUpdate(room,
        {
            "$pull": {
                reservations: {
                    reservation_id: id
                }
            }
        }
    )
    return
}

export {
    overlapDetector,
    addToRoomList,
    removeFromRoom
}