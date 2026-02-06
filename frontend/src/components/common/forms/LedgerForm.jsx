import { formatCurrency } from '@/utils/formatInputs'
import { createEntry, editEntry } from '@/utils/handlers/ledgerHandlers'
import React, { useEffect, useState } from 'react'
import { useNotifications } from 'reapop'
import { MdOutlineAddCircle, MdCheckCircle, MdCancel } from 'react-icons/md'
import { AiOutlineLoading } from 'react-icons/ai'
import { numberToCurrency } from '@/utils/formUtils'
import ButtonSpinner from '../misc/ButtonSpinner'

const LedgerForm = ({ edit, close, date, mutate }) => {
    const [errors, setErrors] = useState({})
    const [loading, setLoading] = useState(false)
    const { notify } = useNotifications()

    const [entryType, setEntryType] = useState('')
    const [paymentType, setPaymentType] = useState('')
    const [description, setDescription] = useState('')
    const [currency, setCurrency] = useState('PEN')
    const [amount, setAmount] = useState('')

    useEffect(() => {
        if (edit) {
            setEntryType(() => edit.entryType)
            setDescription(() => edit.description)
            setPaymentType(() => edit?.paymentType || "")
            setCurrency(() => edit.currency)
            setAmount(() => numberToCurrency(edit.amount))
        }
    }, [edit])

    const handler = async (e) => {
        e.preventDefault()
        setLoading(true)
        const res = await createEntry(e, date)
        if (res.errors) {
            setErrors(() => ({ ...res.errors }))
            setLoading(false)
            return
        }
        if (!res?.error) {
            setDescription(() => '')
            setAmount(() => '')

            notify(res.message, 'success')
            mutate()
        } else {
            notify(res.error, 'error')
            console.warn(res.error)
        }
        setLoading(false)
    }

    const handleEdit = async (e) => {
        e.preventDefault()
        setLoading(true)
        const values = {
            date: edit.date,
            id: edit._id,
            reservation: edit.reservation || null,
            entryType,
            paymentType,
            description,
            currency,
            amount
        }
        const res = await editEntry(values)
        if (res.errors) {
            setErrors(() => ({ ...res.errors }))
            setLoading(false)
            return
        }
        if (!res?.error) {
            notify(res.message, 'success')
            mutate()
            close()
        } else {
            notify(res.error, 'error')
            console.warn(res.error)
        }
        setLoading(false)
    }

    const changeHandler = (e) => {
        e.preventDefault()
        const value = e.target.value

        switch (e.target.id) {
            case 'entryType':
                setEntryType(() => value)
                break;

            case 'description':
                setDescription(() => value)
                break;

            case 'paymentType':
                setPaymentType(() => value)
                break;

            case 'currency':
                setCurrency(() => value)
                break;

            default:
                setAmount(() => value)
                break;
        }
    }

    return (
        <form onSubmit={e => edit ? handleEdit(e) : handler(e)} autoComplete='off' className='grid grid-cols-8 gap-2 mt-2'>
            {/*tipo*/}
            <label htmlFor='entryType' className='col-span-1'>
                <p className='text-gray-500 pl-2'>tipo</p>
                <select name="entryType" id="entryType" value={entryType} onChange={changeHandler} className='w-full'>
                    <option value={'expense'}>Gasto</option>
                    <option value={'income'}>Ingreso</option>
                </select>
            </label>

            {/*descripcion*/}
            <label htmlFor='description' className='col-span-3'>
                <p className='text-gray-500 pl-2'>descripción</p>
                <input type="text" id='description' name='description' placeholder='Descripción' value={description} onChange={changeHandler} className='w-full' />
                <div className='h-6 pl-2 text-sm text-rose-500'>{errors?.description || ''}</div>
            </label>

            {/*método de pago*/}
            <label htmlFor='paymentType' className='col-span-1'>
                <p className='text-gray-500 pl-2'>método</p>
                <select id={`paymentType`} name={`paymentType`} onChange={changeHandler} className='w-full' >
                    <option value="Efectivo">Efectivo</option>
                    <option value="Tarjeta de crédito">Tarjeta de crédito</option>
                    <option value="Tarjeta de débito">Tarjeta de débito</option>
                    <option value="Transferencia">Transferencia</option>
                    <option value="MercadoPago">MercadoPago</option>
                    <option value="Western Union">Western Union</option>
                    <option value="Payoneer">Payoneer</option>
                    <option value="Otro">Otro</option>
                </select>
                <div className='h-6 pl-2 text-sm text-rose-500'>{errors?.description || ''}</div>
            </label>

            {/*currency*/}
            <label htmlFor='currency' className='col-span-1'>
                <p className='text-gray-500 pl-2'>divisa</p>
                <select id='currency' name='currency' value={currency} onChange={changeHandler} className='w-full' >
                    <option value="PEN">PEN</option>
                    <option value="USD">USD</option>
                    <option value="CLP">CLP</option>
                    <option value="BRL">BRL</option>
                    <option value="EUR">EUR</option>
                </select>
                <div className='error'>{errors?.currency || ''}</div>
            </label>

            {/*monto*/}
            <label htmlFor='amount' className='col-span-1'>
                <p className='text-gray-500 pl-2'>monto</p>
                <input type="text" id='amount' name='amount' placeholder='$' value={amount} onChange={changeHandler} className='w-full' onKeyUp={formatCurrency} />
                <div className='h-6 pl-2 text-sm text-rose-500'>{errors?.amount || ''}</div>
            </label>

            <label htmlFor='submit' className='col-span-1 '>
                {edit
                    ? <div className='flex h-full items-center justify-evenly'>
                        <button type='submit' className='btn-icon'>
                            {loading
                                ? <AiOutlineLoading className='text-sm animate-spin' />
                                : <MdCheckCircle />}
                        </button>
                        <button type='button' onClick={close} className='btn-icon'><MdCancel /></button>
                    </div>
                    : <ButtonSpinner loading={loading} text='Registrar' icon={<MdOutlineAddCircle />} type='submit' inlineStyle='mt-6 px-0' />
                }
            </label>

        </form>
    )
}

export default LedgerForm