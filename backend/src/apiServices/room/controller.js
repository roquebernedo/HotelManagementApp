import Room from "./model.js";
import { updateRoomReservs } from "./util.js";

const getRoom = async (req, res, next) => {
    try{
        const { id } = req.query
        if(!id) return res.json({ error: 'No Room ID' })
        
        const { error } = await updateRoomReservs(id)
        if(error) return res.json(error)
            
        const room = await Room.findById(id)
            .populate('current_guest')
            .populate({
                path: 'current_guest',
                populate: 'client'
            })

        return res.json({ room })
        
    } catch(error){
        next(error)
    }
}

const getAllRooms = async (req, res, next) => {
    try {
        const rooms = await Room.find()

        for (let i = 0; i < rooms.length; i++) {
            const room = rooms[i];
            await updateRoomReservs(room.id)
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

const editRoom = async(req, res, next) => {
    try{
        const { id } = req.query
        const {
            name,
            identifier,
            capacity,
            icon
        } = req.body
        console.log("editRoom line 113")
        console.log(id)
        if (!id) return res.json({ error: 'No ID' })
        if (!name) return res.json({ error: 'No room name' })
        if (!capacity) return res.json({ error: 'No room capacity' })

        // verificar que el nombre no se encuentre en uso
        const nameInUse = await Room.findOne({ name })
        if(nameInUse && nameInUse.id !== id) return res.json({ error: 'El nombre ya esta en uso' })

        const targetRoom = await Room.findById(id)
        if(!targetRoom) return res.json({ error: 'No se encontro un cuarto con ese ID.' })

        name && (targetRoom.name = name)
        capacity && (targetRoom.capacity = capacity)
        identifier && (targetRoom.identifier = identifier)
        icon && (targetRoom.icon = icon)
        await targetRoom.save()

        const roomsList = await Room.find()
            .populate('current_guest')
            .populate({
                path: 'current_guest',
                populate: 'client'
            })
        
        return res.json({
            message: 'Cuarto actualizado exitosamente',
            room: targetRoom,
            roomsList
        })
        
    } catch(error){
        next(error)
    }
}

const changeAvailability = async (req, res, next) => {
    try{
        console.log("changing availability")
        const { id } = req.query
        console.log(id)
        if(!id) return res.json({ error: 'No ID' })

        const targetRoom = await Room.findById(id)
        if(!targetRoom) return res.json({ error: 'No existen cuartos con ese ID.' })
        console.log(targetRoom)
        targetRoom.enabled = !targetRoom.enabled
        await targetRoom.save()

        console.log(targetRoom)
        const roomsList = await Room.find()
            .populate('current_guest')
            .populate({
                path: 'current_guest',
                populate: 'client'
            })

        return res.json({
            message: 'Disponibilidad actualizada',
            roomsList
        })

    } catch(error){
        next(error)
    }
}

const deleteRoom = async (req, res, next) => {
    try {
        const { id } = req.query
        console.log(id)
        if (!id) return res.json({ error: 'No ID' })

        await Room.findByIdAndDelete(id)
    
        const roomsList = await Room.find()
            .populate('current_guest')
            .populate({
                path: 'current_guest',
                populate: 'client'
            })

        return res.json({
            message: 'Cuarto eliminado exitosamente.',
            roomsList
        })

    } catch (error) {
        next(error)
    }
}

export {
    getRoom,
    getAllRooms,
    createRoom,
    editRoom,
    changeAvailability,
    deleteRoom
}