import { quickPayment } from '@/utils/handlers/reservSubmitHandlers'
import React, { Fragment, useState } from 'react'
import { useNotifications } from 'reapop'
import { mutate } from 'swr'
import Switch from '../misc/Switch'
import ReservExtraPay from './ReservExtraPay'
import { MdPerson } from 'react-icons/md';
import PaymentDetailsCard from '../cards/PaymentDetailsCard'
import { numberToCurrency } from '@/utils/formUtils'
import ButtonSpinner from '../misc/ButtonSpinner'

const QuickPayment = ({ data, close }) => {
    const {
        id,
        paymentStatus: status
    } = data

    const { notify } = useNotifications()
    const [paymentStatus, setPaymentStatus] = useState(status)
    const [errors, setErrors] = useState({})
    const [loading, setLoading] = useState(false)

    const handleSubmit = async (e) => {
        e.preventDefault()
        setLoading(() => true)

        const res = await quickPayment(e, id)
        if (res?.errors) {
            setErrors(() => res.errors)
            setLoading(() => false)
            return
        }

        if (!res.errors) {
            setErrors(() => false)
            notify(res.message, 'success')
            mutate('/reservation/all')
            close()
        } else {
            notify(res.errors, 'error')
            console.warn(res.errors)
            setErrors({ ...errors, someError: res.errors })
        }
        setLoading(() => false)
    }

    return (
        <form onSubmit={handleSubmit} autoComplete='off' className='grid grid-cols-4 gap-4'>
            <p className='col-span-4 text-xl -ml-2 txt-n-icon capitalize'><MdPerson />{data?.client?.name || '?'}</p>

            {data?.total && <p className='col-span-4 text-xl pl-2'>Total a pagar: {numberToCurrency(data.total)}</p>}

            {!!data?.extraPayments?.length &&
                <p className='text-gray-600 dark:text-gray-400 -mt-2 -mb-4'>
                    Pago #1
                </p>}

            <section className='col-span-4 details-data pl-2'>
                <PaymentDetailsCard data={{ ...data, date: data.createdAt }} />
            </section>

            {!!data?.extraPayments?.length &&
                data.extraPayments.map((e, i) => (
                    <Fragment key={'extra' + i}>
                        <p className='text-gray-600 dark:text-gray-400 -mt-2 -mb-4'>
                            Pago #{2 + i}
                        </p>
                        <div className='col-span-4 details-data pl-2 py-0'>
                            <PaymentDetailsCard data={e} />
                        </div>
                    </Fragment>
                ))
            }

            <p className='col-span-4 text-xl -ml-2'>Nuevo pago</p>

            <ReservExtraPay remove={null} errors={errors} ID={''} />

            <label htmlFor='paymentStatus' className={`col-span-4 py-4 border-t border-b border-t-slate-800 border-b-slate-800`}>

                <label className='col-span-2 '>
                    <p>Estado del pago</p>
                    <Switch options={['Completo']} cb={() => setPaymentStatus(!paymentStatus)} state={paymentStatus} />
                </label>

                <div className='text-lg mx-auto text-center max-w-sm whitespace-normal text-gray-500'>
                    El pago de la reserva se guardará como
                    <b className={`text-xl ${paymentStatus ? 'text-emerald-500' : 'text-rose-500'} transition-colors duration-500 uppercase`}>
                        {paymentStatus ? ` completo` : ' incompleto'}
                    </b>
                </div>

                <input type="hidden" id='paymentStatus' name='paymentStatus' value={paymentStatus} className='w-full' />
            </label>

            <button type='button' onClick={close} className="btn-secondary col-span-2 my-2">Cancelar</button>
            <ButtonSpinner inlineStyle='col-span-2 my-2'
                loading={loading} type='submit'
                text='Continuar' />
        </form>
    )
}

export default QuickPayment