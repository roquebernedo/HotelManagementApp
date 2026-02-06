import { editApi, postApi } from "@/services/api"
import { formatDate } from "../formatDate"
import { setNIGHTS } from "../formUtils"

//: TODO: Organiza todo esta mierda
export const validateReservErrors = (values, client) => {
    let errors = {}

    // check client input
    if (client && values.client === '-') errors.client = 'Campo requerido'

    if (values.checkin === '-') errors.checkin = 'Campo requerido'

    if (values.checkout === '-') errors.checkout = 'Campo requerido'

    if (values.nights === '-') errors.nights = 'Campo requerido'

    if (parseInt(values.nights) !== setNIGHTS(formatDate(values.checkin), formatDate(values.checkout))) errors.nights = 'La cantidad de noches no concuerda con las fechas'

    if (new Date(values.checkin) > new Date(values.checkout)) errors.checkin = 'El checkin no puede ser posterior al checkout'

    if (values.persons === '-') errors.persons = 'Campo requerido'

    if (values.persons < 1) errors.persons = 'No puede ser menor a 1'

    if (values.room === '-') errors.room = 'Campo requerido'

    if (values.paymentType === '-') errors.paymentType = 'Campo requerido'

    if (values.currency === '-') errors.currency = 'Campo requerido'

    if (values.paymentType === 'Tarjeta de crédito' && values.fees === '-') errors.fees = 'Campo requerido'

    if (values.paymentType === 'MercadoPago' && values.mpDetails === '-') errors.mpDetails = 'Campo requerido'

    if (values.amount === '-') errors.amount = 'Campo requerido'

    if (values.advance === 'true' && values.percentage === '-') errors.percentage = 'Campo requerido'

    if (values.paymentStatus === 'false' && values.total === '-') errors.total = 'Campo requerido'

    if (!!Object.keys(errors).length) {
        return errors
    } else return false
}

export const validateReservExtraFormErrors = (values, id) => {
    let errors = {}

    if (values[`${id}paymentType`] === '-') errors[`${id}paymentType`] = 'Campo requerido'

    if (values[`${id}currency`] === '-') errors[`${id}currency`] = 'Campo requerido'

    if (values[`${id}paymentType`] === 'Tarjeta de crédito' && values[`${id}fees`] === '-') errors[`${id}fees`] = 'Campo requerido'

    if (values[`${id}paymentType`] === 'MercadoPago' && values[`${id}mpDetails`] === '-') errors[`${id}mpDetails`] = 'Campo requerido'

    if (values[`${id}amount`] === '-') errors[`${id}amount`] = 'Campo requerido'

    if (values[`${id}advance`] === 'true' && values[`${id}percentage`] === '-') errors[`${id}percentage`] = 'Campo requerido'

    if (!!Object.keys(errors).length) {
        return errors
    } else return false
}

export const validateValues = (e) => {
    // get all input values 
    console.log(e)
    const values = {}
    const extraPayments = {}
    Array.from(e.target).map(e => {
        if (e.name) {
            console.log(e.name)
            if (/^extra/.test(e.name)) {
                const form = e.name.split('-')[0]
                if (!extraPayments.hasOwnProperty(form)) {
                    extraPayments[form] = {}
                }
                extraPayments[form][e.name] = e.value || '-'

            } else {
                values[e.name] = e.value || '-'
            }
        }
        return null
    })
    console.log(values)
    // input validator
    let errors = {},
        mainErr = validateReservErrors(values)

    if (mainErr) errors = { ...mainErr }

    Object.entries(extraPayments).forEach(e => {
        const id = e[0] + '-',
            err = validateReservExtraFormErrors(e[1], id)
        if (err) errors = { ...errors, ...err }
    })
    console.log(values)
    if (!!Object.keys(errors).length) return { errors }
    console.log(values)
    // change dates to correct format
    values.checkin = formatDate(values.checkin)
    values.checkout = formatDate(values.checkout)
    //:TODO: paymentDate
    values.paymentDate = formatDate(values.paymentDate)

    // change total to number if payment status is incomplete
    values.paymentStatus === 'false'
        ? values.total = parseInt(values.total.replace(/\D/g, ""))
        : values.total = null

    // change paymentStatus to boolean
    values.paymentStatus = values.paymentStatus === 'true'
    console.log(values)
    // change currency to number
    values.amount = parseInt(values.amount.replace(/\D/g, ""))

    // change percentage to number
    values.percentage === '-'
        ? values.percentage = null
        : values.percentage = parseInt(values.percentage.replace(/\D/g, ""))

    console.log(values)
    // format extra payments values
    let finalExtras = []
    for (const extra in extraPayments) {
        if (Object.hasOwnProperty.call(extraPayments, extra)) {
            const values = extraPayments[extra],
                aux = {
                    id: extra
                }

            //:TODO: paymentDate
            aux.paymentDate = formatDate(values[`${extra}-paymentDate`])
            aux.paymentType = values[`${extra}-paymentType`]
            aux.currency = values[`${extra}-currency`]
            aux.fees = values[`${extra}-fees`]
            aux.mpDetails = values[`${extra}-mpDetails`]

            aux.amount = parseInt(values[`${extra}-amount`].replace(/\D/g, ""))
            values[`${extra}-percentage`] === '-'
                ? aux.percentage = null
                : aux.percentage = parseInt(values[`${extra}-percentage`].replace(/\D/g, ""))

            finalExtras.push(aux)
        }
    }

    // add extra payments to final values
    values.extraPayments = finalExtras
    console.log(values)
    return { res: values }
}

export const quickPayment = async (e, id) => {
    const values = {}
    Array.from(e.target).map(e => e.name && (values[e.name] = e.value || '-'))

    const errors = validateReservExtraFormErrors(values, '')
    if (errors) return { errors }

    // change paymentStatus to boolean
    values.paymentStatus = values.paymentStatus === 'true'

    // change currency to number
    values.amount = parseInt(values.amount.replace(/\D/g, ""))
    // change percentage to number
    values.percentage === '-'
        ? values.percentage = null
        : values.percentage = parseInt(values.percentage.replace(/\D/g, ""))

    values.paymentDate = formatDate(values.paymentDate)

    const res = await editApi([`/reservation/quickpayment?id=${id}`, values])

    return res
}

//? this fn only Posts validated data
export const createReserv = async (data) => {
    // post on API    
    console.log(data)
    const res = await postApi(['/reservation/', data]).catch(err => {
        console.error(err)
        return { errors: { someError: err.message } }
    })

    return res
}

//? this fn only Update validated data
export const updateReserv = async (data, id) => {
    // put on API
    const res = await editApi([`/reservation?id=${id}`, data]).catch(err => {
        console.error(err)
        return { errors: { someError: err.message } }
    })

    return res
}

//? this fn Validates AND Posts the data
export const createReservSubmit = async (e) => {
    const { res: values, errors } = validateValues(e)
    if (errors) return { errors }

    // post on API    
    const res = await postApi(['/reservation/', values]).catch(err => {
        console.error(err)
        return { errors: { someError: err.message } }
    })

    return res
}