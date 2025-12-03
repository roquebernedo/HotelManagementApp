import Announcement from "./model.js";

const getMessage = async (req,res, next) => {
    try{
        console.log("obtener mensaje")
        const announcements = await Announcement.findOne({})
        console.log(announcements)
        res.json({ announcements: announcements?.messages || [] })

    } catch(error){
        next(error)
    }
}

const setMessage = async (req, res, next) => {
    try{
        console.log("entro al setmessage")
        console.log(req.user)
        const { user_name } = req.user
        console.log(user_name)
        const { text } = req.body
        console.log(text)

        if(!text) return res.json({ error: 'No text' })

        const announcements = await Announcement.findOne({})
        console.log("el annoucements")
        console.log(announcements)
        if(!announcements){
            const newAnnoun = await Announcement.create({
                messages: [
                    {
                        ...req.body,
                        from: user_name
                    }
                ]
            })
            console.log("es if")
            console.log(announcements)
            return res.json({ announcements: newAnnoun.messages })
        }else{
            announcements.messages = [
                {
                    ...req.body,
                    from: user_name
                }
            ]
            console.log("el else")
            console.log(announcements)
            await announcements.save()
            return res.json({ message: 'Anuncio publicado exitosamente.', announcements: announcements.messages })
        }

    } catch(error){
        next(error)
    }
}

const deleteMessage = async (req, res, next) => {
    try{
        console.log("entro al delete")
        const announcements = await Announcement.findOne({})

        if(!announcements){
            const newAnnoun = await Announcement.create({
                messages: []
            })
            return res.json({ announcements: newAnnoun.messages })
        }else{
            announcements.messages = []
            await announcements.save()
            return res.json({ message: 'Anuncio eliminado exitosamente.', announcements: announcements.messages })
        }
    } catch(error){
        next(error)
    }
}

export {
    getMessage,
    setMessage,
    deleteMessage
}