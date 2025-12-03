import User from '../apiServices/user/model.js'
import jwt from "jsonwebtoken";

const tokenExtractor = (req, res, next) => {
    const authorization = req.get('authorization')
    console.log(authorization)
    if(authorization && authorization.startsWith('Bearer ')){
        req.token = authorization.replace('Bearer ', '')
    }
    console.log(req.token)
    console.log("es el token")
    next()
}

const verifyJWT = async (token) => {
    try{
        console.log("entro al verifyJWT")
        console.log(token)
        console.log(process.env.JWT_SECRET)
        const userDecoded = jwt.verify(token, process.env.JWT_SECRET)
        console.log("aca es el verify")
        console.log(userDecoded)
        console.log("paso el userdeco")
        const userFound = await User.findById(userDecoded.user.id)

        return { user: userDecoded.user, userFound }
    }catch(err){
        throw err
    }
}

const verifyToken = async (req, res, next) => {
    try{    
        console.log("el req.token")
        console.log(req.token)
        const token = req.token
        console.log(token)
        if(!token) return res.json({ error: 'No se recibio ningun token' })
        console.log("paso")
        const { user, userFound } = await verifyJWT(token)
        console.log(user)
        console.log(userFound)
        console.log("hasta aca llegaron gaaa")
        if(!userFound) return res.json({ error: 'Usuario no encontrado' })
        if(!userFound.approved) return res.json({ error: 'Tu cuenta no esta autorizada. Contacta con un administrador para poder ingresar al sistema.' })

        req.user = user

        next()
        
    }catch(err){
        if(err?.name === "TokenExpiredError")
            return res.status(401).json({
                error: "Sesino expirada, logea de nuevo para identificarte.",
                expiredToken: true,
            })
        return res.json({ error: "verifyToken error: " + err })
    }
}

export {
    verifyJWT,
    verifyToken,
    tokenExtractor
}