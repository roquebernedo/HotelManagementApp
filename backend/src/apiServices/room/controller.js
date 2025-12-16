import Room from "./model.js";
import { updateCabinReservs } from "./util.js";

const getRoom = async (req, res, next) => {
    try{
        const { id } = req.query
        if(!id) return res.json({ error: 'No Room ID' })
            
        // const { error } = await 
    } catch(error){
        next(error)
    }
}

const getAllRooms = async (req, res, next) => {
    try {
        const rooms = await Room.find()

        for (let i = 0; i < rooms.length; i++) {
            const room = rooms[i];
            await updateCabinReservs(room.id)
        }
        
        // populate path AND subdocument path
        const roomsList = await Room.find()
            .populate('current_guest')
            .populate({
                path: 'current_guest',
                populate: 'client'
            })

        return res.json(roomsList)

    } catch (error) {
        next(error)
    }
}

const createRoom = async (req, res, next) => {
    try{
        console.log("Creating room")
        const {
            name,
            identifier,
            capacity,
            icon
        } = req.body

        if(!name) return res.json({ error: 'No room name' })
        if(!identifier) return res.json({ error: 'No room identifier' })
        if(!capacity) return res.json({ error: 'No room capacity' })

        // verificar que el nombre no se repita

        const nameInUse = await Room.findOne({ name })
        if(nameInUse) return res.json({ error: 'El nombre ya esta en uso.' })

        let aux = {}
        name && (aux.name = name)
        capacity && (aux.capacity = capacity)
        identifier && (aux.identifier = identifier)
        icon && (aux.icon = icon)

        console.log(aux)

        const newRoom = await Room.create(
            {
                ...aux,
                reservations: []
            }
        )
        console.log("newRoom")
        console.log(newRoom)

        const roomsList = await Room.find()
            .populate('current_guest')
            .populate({
                path: 'current_guest',
                populate: 'client'
            }) 
        console.log(roomsList)
        return res.json({
            message: 'Cuarto de hotel creado exitosamente.',
            room: newRoom,
            roomsList
        })

    } catch(error){
        next(error)
    }
}

export {
    getRoom,
    getAllRooms,
    createRoom
}