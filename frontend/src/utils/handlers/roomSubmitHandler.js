import { editApi, postApi } from "@/services/api"

export const validateRoomErrors = (values) => {
    let errors = {}

    if (values.name === '-') errors.name = 'Campo requerido'

    if (values.identifier === '-') errors.identifier = 'Campo requerido'
    else if (values.identifier.length > 3) errors.identifier = 'Utiliza como máximo 3 caractéres'

    if (values.capacity === '-') errors.capacity = 'Campo requerido'

    if (!!Object.keys(errors).length) {
        return errors
    }

    return false
}

export const createRoomSubmit = async (e) => {
    // get all input values 
    const values = {}
    Array.from(e.target).map(e => e.name && (values[e.name] = e.value || '-'))

    // input validator
    const errors = validateRoomErrors(values)
    if (errors) return { errors }

    // post on API    
    const res = await postApi(['/room/', values]).catch(err => {
        console.error(err)
        return { errors: { someError: err } }
    })

    if (res) {
        return { res }
    } else {
        console.error('createSubmit No res');
    }
}

export const editRoomSubmit = async (e, id) => {
    // get all input values 
    const values = {}
    Array.from(e.target).map(e => e.name && (values[e.name] = e.value || '-'))

    // input validator
    const errors = validateRoomErrors(values)
    if (errors) return { errors }

    // post on API    
    const res = await editApi([`/room?id=${id}`, values]).catch(err => {
        console.error(err)
        return { errors: { someError: err } }
    })

    if (res) {
        return { res }
    } else {
        console.error('createSubmit No res');
    }
}

export const changeAvailability = async (id) => {
    // post on API    
    const res = await editApi([`/room/availability?id=${id}`]).catch(err => {
        console.error(err)
        return { error: err }
    })

    if (res) {
        return res
    } else {
        console.error('createSubmit No res');
    }
}