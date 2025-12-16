import * as dotenv from 'dotenv'
dotenv.config()
import jwt from "jsonwebtoken";
import User from './model.js'
import { verifyJWT } from '../../utils/verify.js';
import { sendEmail } from '../../microServices/sendEmail.js';
const { JWT_SECRET } = process.env

const signin = async (req, res, next) => {
    try{
        console.log("entro aca")
        const {
            user_name,
            email,
            password
        } = req.body
        console.log(user_name)
        console.log(email)
        console.log(password)
        if(!user_name) return res.json({ error: 'No user name.' })
        if(!email) return res.json({ error: 'No user email.' })
        if(!password) return res.json({ error: 'No user password' })

        const user_nameFound = await User.findOne({ user_name }) 
        if (user_nameFound) return res.json({ error: 'El nombre de usuario ya esta registrado.' })
            
        const emailFound = await User.findOne({ email })
        if (emailFound) return res.json({ error: 'El email ya esta registrado.' })

        const newUser = await User.create(
            {
                ...req.body
            }
        )

        res.json({ newUser })
        
    }catch (error){
        next(error)
    }
}

const login = async (req, res, next) => {
    try{
        const {
            email,
            password
        } = req.body

        console.log(email)
        if(!email) return res.json({ error: 'No user name / email.' })
        if(!password) return res.json({ error: 'No password' })

        const emailRe = new RegExp(/[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/)
        let query = emailRe.test(email) ? 'email' : 'user_name'

        const userFound = await User.findOne({ [query]: email })
        console.log(userFound)

        if(userFound){
            if(!userFound.approved) return res.json({ error: 'Cuenta aun no autorizada'})
            console.log(userFound.approved)
            const correctPassword = await userFound.comparePassword(password)
            if(correctPassword){
                const { id, email, user_name, role } = userFound
                const aux = { id, email, user_name, role}
                const token = jwt.sign({ user: aux }, JWT_SECRET, {
                    expiresIn: '24h', // 24 hrs
                }) 

                res.cookie("userToken", token, {
                    httpOnly: false,     // <--- IMPORTANTE: si quieres leer con JS
                    secure: false,       // <--- EN LOCAL DEBE SER FALSE
                    sameSite: "lax",     // <--- Permite funcionamiento en localhost
                    path: "/",
                    maxAge: 24 * 60 * 60 * 1000 // 1 día
                });

                return res.json(
                    {
                        message: `Hola ${user_name.split(' ')[0]}!`,
                        id,
                        email,
                        user_name,
                        role,
                        token
                    }
                )
            } else{
                return res.json({ error: 'Contraseña incorrecta.' })
            }
        }else{
            return res.json({ error: 'No encontro ningun usuario asociado a esa cuenta.' })
        }

    }catch(error){
        next(error)
    }
}

const autoLogin = async (req, res, next) => {
    try{
        // Revisa si aun sigue logeado al recargar la pagina
        const token = req.token
        console.log(req.token)
        console.log("tokensito")
        console.log(token)
        if(!token) return res.json({ error: "No se recibio token" })
        const { user, userFound } = await verifyJWT(token)
        console.log("intermedio")
        console.log(user)
        if(!userFound) return res.json({ error: "Usuario no encontrado" })

        return res.status(200).json({ ...user })
    }catch(error){
        if(error?.name === "TokenExpiredError")
            return res.json({
                error: "Sesion expirada, inicia sesion nuevamente",
                expiredToken: true
            })
        next(error)
    }
}

const changePassword = async (req, res, next) => {
    try{
        console.log("entro al change Password")
        const { id } = req.user
        console.log(id)
        const { password, newPassword} = req.body

        if(!id) return res.json({ error: 'No user ID.' })
        if(!password) return res.json({ error: 'No old password.' })
        if(!newPassword) return res.json({ error: 'No new password.' })
        if(password === newPassword) return res.json({ error: 'La nueva contraseña no puede ser igual a la anterior.' })

        const userFound = await User.findById(id)

        if(userFound){
            const correctPassword = await userFound.comparePassword(password)
            if(correctPassword){
                userFound.password = newPassword
                await userFound.save()

                return res.json({ message: 'Contraseña actualizada.', userFound })
            }else{
                return res.json({ error: 'Contraseña incorrecta.' })
            }
        }else{
            return res.json({ error: 'Usuario no encontrado.' })
        }

    }catch(error){
        next(error)
    }
}

const forgotPassword = async (req, res, next) => {
    try{
        const { email } = req.body
        console.log("esta es forgot")
        console.log(email)

        if(!email) return res.json({ error: '-' })
        
        const userFound = await User.findOne({ email })

        if(userFound){
            const result = await sendEmail('reset_pw', email, userFound.id)
            console.log("lleog al result")
            console.log(result)
            return res.json({ result })
        }else{
            return res.json({ error: '-' })
        }

    }catch(error){
        next(error)
    }
}

const checkPasswordToken = async (req, res, next) => {
    try{
        console.log("entro al check token")
        const { token } = req.query
        console.log(req.query.token)
        console.log("esto es t")
        console.log(token)
        if(!token) return res.json({ error: 'No se recibio ningun token' })

        const { user, userFound } = await verifyJWT(token)

        if(!userFound) return res.json({ error: 'Usuario no encontrado' })

        res.json({ message: 'Token autorizado', user })
        
    }catch(error){
        next(error)
    }
}

const newPassword = async (req, res, next) => {
    try{
        const { token, newPassword } = req.body

        if(!token) return res.json({ error: 'No se recibio ningun token' })
        if(!newPassword) return res.json({ error: 'Ningun password ha sido recibido' })

        const { user, userFound } = await verifyJWT(token)

        if(!userFound) return res.json({ error: 'Usuario no encontrado' })

        const updateUser = await User.findById(user.id)
        updateUser.password = newPassword
        await updateUser.save()

        return res.json({ message: 'Contraseña actualizada', updateUser})

    } catch(error){
        next(error)
    }
}

const changeEmail = async (req, res, next) => {
    try{
        const { id, email } = req.user
        const { password, newEmail } = req.body
        console.log("estamos en changeemail")
        console.log(id)
        console.log(email)
        console.log(req.user)

        if(!id) return res.json({ error: 'No user ID.' })
        if(!password) return res.json({ error: 'No password ' })
        if(!newEmail) return res.json({ error: 'No email ' })
        if(email === newEmail) return res.json({ error: 'El actual y el nuevo email son iguales.' })

        const userFound = await User.findById(id)

        if(userFound){
            const correctPassword = await userFound.comparePassword(password)
            if(correctPassword){
                const result = await sendEmail('change_email', newEmail, id)

                return res.json({ message: 'Se ha enviado un codigo de confirmacion al email indicado.', result})
            }else{
                return res.json({ error: 'Contraseña incorrecta' })
            }
        }else{
            return res.json({ error: 'No hay usuarios asociados a ese email.' })
        }

    } catch(error){
        next(error)
    }
}

const checkEmailToken = async (req, res, next) => {
    try{
        console.log("nono")
        const { token } = req.query
        console.log(req.query)
        if(!token) return res.json({ error: 'No se recibio ningun token.' })
        console.log("Es el checkemailtoken")
        const { user, userFound } = await verifyJWT(token)
        console.log("paso a check")
        console.log(user)
        console.log(userFound)
        if(!userFound) return res.json({ error: 'Usuario no encontrado.' })
        
        const userUpdated = await User.findById(user.id)
        console.log("user updated")
        console.log(userUpdated)

        userUpdated.email = user.email
        await userUpdated.save()

        res.json({ message: `Email actualizado a "${user.email}". Vuelve a iniciar sesión.`, userUpdated })

    } catch(error){
        next(error)
    }
}

// ADMIN ROUTES

const getUser = async (req, res, next) => {
    try{
        // Buscar y obtener usuario
        const { id } = req.query
        if(!id) return res.json({ error: 'No ID' })
        console.log(req.query)
        const user = await User.findById(id)
        if(!user) return res.json({ error: `No se encontro un usuario con este ID: ${user_id}.` })

        return res.json({ user })
        
    } catch(error){
        next(error)
    }
}

const getAllUsers = async (req, res, next) => {
    try{
        // Buscar y obtener todos los usuarios
        const { id } = req.user

        const usersList = await User.find({ _id: { $ne: id } })
        return res.json({ usersList })
        
    } catch(error){
        next(error)
    }
}

const adminPwUpdate = async (req, res, next) => {
    try{
        console.log("adminPwUpdate")
        const { role, id } = req.user
        const { user_id, newPassword } = req.body
        console.log(role)
        console.log(id)

        if(!user_id) return res.json({ error: 'No se recibio ID del usuario.' })
        if(!newPassword) return res.json({ error: 'No se recibio un password.' })
        
        const targetUser = await User.findById(user_id)

        if(!targetUser) return res.json({ error: `No se encontro un usuario con este ID: ${user_id}.` })
        if(role !== 'master'){
            if(targetUser.role === 'admin' || targetUser.role === 'master'){
                return res.json({ error: 'No puedes editar información de un administrador'})
            }
        }

        targetUser.password = newPassword
        await targetUser.save()
        console.log("llego al targetUser")
        console.log(targetUser)
        const usersList = await User.find({ _id: { $ne: id } })

        return res.json({ message: `Contraseña del usuario ${targetUser.user_name} actualizada.`, usersList })

    } catch(error){
        next(error)
    }
}

const adminEmailUpdate = async (req, res, next) => {
    try{
        console.log("adminEmailUpdate")
        const { role, id } = req.user
        const { user_id, newEmail } = req.body

        if(!user_id) return res.json({ error: 'No se recibio ID del usuario.' })
        if(!newEmail) return res.json({ error: 'No se recibio ningun password.' })

        const targetUser = await User.findById(user_id)

        if(!targetUser) return res.json({ error: `No se encontro un usuario con este ID: ${user_id}.` })
        if(role !== 'master'){
            if(targetUser.role === 'admin' || targetUser.role === 'master'){
                return res.json({ error: 'No puedes editar información de un administrador'})
            }
        }

        targetUser.email = newEmail
        await targetUser.save()

        const usersList = await User.find({ _id: { $ne: id}})

        return res.json({ message: `Email del usuario ${targetUser.user_name} actualizado a "${newEmail}".`, usersList })

    } catch(error){
        next(error)
    }
}

const roleUpdate = async (req, res, next) => {
    try{
        console.log("role Update")
        const { role, id } = req.user
        const { user_id, newRole } = req.body

        if(!user_id) return res.json({ error: 'No se recibio ID del usuario.' })
        if(!newRole) return res.json({ error: 'No se recibio ningun password.' })

        const targetUser = await User.findById(user_id)

        if(!targetUser) return res.json({ error: `No se encontro un usuario con este ID: ${user_id}.` })
        if(role !== 'master'){
            if(targetUser.role === 'admin' || targetUser.role === 'master'){
                return res.json({ error: 'No puedes editar información de un administrador'})
            }
        }

        targetUser.role = newRole !== 'demote' ? newRole : ''
        await targetUser.save()

        const usersList = await User.find({ _id: { $ne: id } })

        return res.json({ message: `Rol del usuario ${targetUser.user_name} actualizado a "${targetUser.role}".`, usersList })

    } catch(error){
        next(error)
    }
}

const approveUser = async (req, res, next) => {
    try{
        console.log("entro al approveUser")
        console.log(req.user)
        const { role, id } = req.user
        const { user_id } = req.body
        console.log("entro al approve")
        console.log(role)
        if(!user_id) return res.json({ error: 'No ID' })
        
        const targetUser = await User.findById(user_id)
        console.log(targetUser)
        if(!targetUser) return res.json({ error: `No se encontro un usuario con este ID: ${user_id}` })
        if(!role !== 'master'){
            if(!targetUser.role === 'admin' || targetUser.role === 'master'){
                return res.json({ error: 'No puedes editar la informacion de un administrador' })
            }
        }
        if(targetUser.approved){
            targetUser.approved = false
            targetUser.role = ''
        }else{
            targetUser.approved = true
            targetUser.role = 'staff'
        }
        await targetUser.save()
        console.log("llego")
        console.log(targetUser)
        const usersList = await User.find({ _id: { $ne: id } })
    
        return res.json({ message: 'Cuenta de usuario actualizada', targetUser, usersList})

    }catch(error){
        next(error)
    }
}

const deleteUser = async (req, res, next) => {
    try{
        console.log("deleteando usuario")
        const { role, id } = req.user
        console.log(req.user)
        console.log(id)
        const { id: target_id } = req.query
        console.log(target_id)
        if(!id) return res.json({ error: 'No ID' })

        const user = await User.findById(target_id)
        if(!user) return res.json({ error: `No se encontro un usuario con este ID: ${user_id}.` })
        if(!role !== 'master'){
            if(!user.role === 'admin' || user.role === 'master'){
                return res.json({ error: 'No puedes eliminar a un administrador.' })
            }
        }

        await User.findByIdAndDelete(target_id)

        const usersList = await User.find({ _id: { $ne: id }})

        return res.json({ message: 'Cuenta de usuario eliminada', usersList })

    } catch(error){
        next(error)
    }
}

export {
    signin,
    login,
    autoLogin,
    approveUser,
    changePassword,
    forgotPassword,
    checkPasswordToken,
    newPassword,
    changeEmail,
    checkEmailToken,
    adminPwUpdate,
    getUser,
    getAllUsers,
    adminEmailUpdate,
    roleUpdate,
    deleteUser
}