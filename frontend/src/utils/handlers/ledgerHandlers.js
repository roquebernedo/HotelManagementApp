import { editApi, postApi } from "@/services/api"

export const validateEntryErrors = (values) => {
    let errors = {}

    if (values.entryType === '-') errors.entryType = 'Campo requerido'

    if (values.description === '-') errors.description = 'Campo requerido'

    if (values.paymentType === '-' && values.entryType === 'income') errors.paymentType = 'Campo requerido'

    if (values.amount === '-') errors.amount = 'Campo requerido'

    if (values.currency === '-') errors.currency = 'Campo requerido'

    if (!!Object.keys(errors).length) {
        return errors
    } else return false
}

export const createEntry = async (e, date) => {
    const values = { date }
    Array.from(e.target).map(e => e.name && (values[e.name] = e.value || '-'))

    const errors = validateEntryErrors(values, '')
    if (errors) return { errors }

    // change currency to number
    values.amount = parseInt(values.amount.replace(/\D/g, ""))

    const res = await postApi([`/ledger`, values])

    return res
}

export const editEntry = async (values) => {
    const errors = validateEntryErrors(values, '')
    if (errors) return { errors }

    // change currency to number
    values.amount = parseInt(values.amount.replace(/\D/g, ""))

    const res = await editApi([`/ledger`, values])

    return res
}