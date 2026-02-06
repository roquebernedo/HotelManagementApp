import { editApi, postApi } from "@/services/api"
import { emailRe } from "@/utils/formUtils"
import { countryCode } from "../country"

export const validateClientErrors = (values) => {
    let errors = {}

    if (values.name === '-') errors.name = 'Campo requerido'

    if (values.email !== '-' && !emailRe.test(values.email)) {
        errors.email = 'Formato de email no válido'
    }

    // vehicle info
    // if (values.vehicleType !== '-' && values.plate === '-') errors.plate = 'Campo requerido'
    // if (values.plate !== '-' && values.vehicleType === '-') errors.vehicleType = 'Campo requerido'

    if (values.company === 'true') {
        if (values.ruc === '-') errors.ruc = 'Campo requerido'
    } else {
        if (values.dni === '-') errors.dni = 'Campo requerido'
    }

    if (!!Object.keys(errors).length) {
        return errors
    }

    return false
}

export const createSubmit = async (e) => {
    // get all input values 
    const values = {}
    Array.from(e.target).map(e => e.name && (values[e.name] = e.value || '-'))

    // input validator
    const errors = validateClientErrors(values)
    if (errors) return { errors }

    values.name = values.name.toLowerCase()
    if (values.nationality !== '-') {
        values.country_code = countryCode(values.nationality)
    }
    if (values.email === '-') {
        delete values.email
    }
    if (values.age === '-') {
        delete values.age
    }

    values.company = values.company === 'true'

    if (values.company) {
        values.dni = null
    } else {
        values.ruc = null
    }

    // post on API    
    const res = await postApi(['/client/', values]).catch(err => {
        console.error(err)
        return { errors: { someError: err } }
    })

    if (res) {
        return { res }
    } else {
        console.error('createSubmit No res');
    }
}

export const editSubmit = async (e, id) => {
    // obtengo todos los valores de los inputs 
    const values = {}
    Array.from(e.target).map(e => e.name && (values[e.name] = e.value || '-'))

    // reviso errores
    const errors = validateClientErrors(values)
    if (errors) return { errors }

    values.name = values.name.toLowerCase()
    if (values.nationality !== '-') {
        values.country_code = countryCode(values.nationality)
    }
    if (values.email === '-') {
        delete values.email
    }
    if (values.age === '-') {
        delete values.age
    }

    values.company = values.company === 'true'

    if (values.company) {
        values.dni = null
    } else {
        values.ruc = null
    }

    // envio a la db    
    const res = await editApi([`/client?id=${id}`, values])
        .catch(err => {
            return { errors: err.message }
        })

    if (!res.errors) {
        return { res }
    } else {
        return { errors: res.errors }
    }
}