import Client from "./model.js";

const createClient = async (req, res, next) => {
    try{
        console.log("entro")
        console.log(req.user)
        const { user_name } = req.user
        console.log(user_name)
        const {
            name,
            dni,
            age,
            profession,
            civil_status,
            vehiclePlate,
            vehicleType,
            company,
            ruc,
            cellphone,
            email,
            address,
            nationality,
            country_code,
            provenance,
            notes
        } = req.body

        if(!name) return res.json({ error: 'No name' })
        if(!company && !dni) return res.json({ error: 'No DNI' })
    
        if(dni){
            const dniInUse = await Client.findOne({ dni })
            if(dniInUse) return res.json({ error: 'El DNI ya esta en uso.' })
        }

        if(ruc){
            const rucInUse = await Client.findOne({ ruc })
            if(rucInUse) return res.json({ error: 'El RUC ya esta en uso.' })
        }

        const newClient = await Client.create({ ...req.body, creator: user_name})
        console.log("llego al newclient")
        console.log(newClient)
        const allClients = await Client.find()
        console.log(allClients)
        return res.json({ message: 'Cliente registrado', newClient, clientList: allClients })

    } catch(error){
        next(error)
    }
}

const getClient = async (req, res, next) => {
    try{
        const { id } = req.query
        console.log(id)
        if(!id) return res.json({ error: 'No ID' })

        const client = await Client.findById(id)
        console.log(client)
        if(!client) return res.json({ error: 'Usuario no encontrado (ID incorrecta).' })
        else return res.json({ client })

    } catch(error){
        next(error)
    }
}

const getAllClients = async (req, res, next) => {
    try{
        const allClients = await Client.find()
        return res.json({ clientList: allClients })
    } catch(error){
        next(error)
    }
}

const editClient = async (req, res, next) => {
    try{
        console.log("editando")
        const { id } = req.query
        const {
            name,
            dni,
            age,
            profession,
            civil_status,
            vehiclePlate,
            vehicleType,
            company,
            ruc,
            cellphone,
            email,
            address,
            nationality,
            country_code,
            provenance,
            notes
        } = req.body
        console.log(id)
        if(!id) return res.json({ error: 'No ID' })
        if(!name) return res.json({ error: 'No name' })
        if(!company && !dni) return res.json({ error: 'No DNI' })
        
        const client = await Client.findById(id)

        if(!client?.dni || client?.dni !== dni){
            const dniInUse = await Client.findOne({ dni })
            if(dniInUse) return res.json({ error: 'El nuevo DNI ya esta en uso.' })
        }

        const newClient = await Client.findByIdAndUpdate(
            id,
            {
                $set: { ...req.body }
            },
            { new: true }
        )
        console.log(newClient)
        const allClients = await Client.find()
        return res.json({ message: 'Cliente actualizado exitosamente.', newClient, clientList: allClients })

    } catch(error){
        next(error)
    }
}

const deleteClient = async (req, res, next) => {
    try{
        const { id } = req.query
        console.log(id)

        if(!id) return res.json({ error: 'No ID' })

        const idInUse = await Client.findById(id)
        console.log(idInUse)
        console.log("ya paso")
        if(!idInUse) return res.json({ error: 'No hay usuarios con ese ID.' })

        await Client.findByIdAndDelete(id)

        const allClients = await Client.find()
        return res.json({ message: 'Cliente eliminado.', clientList: allClients })

    } catch(error){
        next(error)
    }
}

export {
    createClient,
    getClient,
    getAllClients,
    editClient,
    deleteClient
}