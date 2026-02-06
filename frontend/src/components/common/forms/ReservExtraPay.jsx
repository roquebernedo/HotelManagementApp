import useUser from '@/hooks/useUser'
import { deformatDate } from '@/utils/formatDate'
import { formatCurrency, formatPercentage } from '@/utils/formatInputs'
import React, { useEffect, useState } from 'react'
import Switch from '../misc/Switch'

const ReservExtraPay = ({ remove, errors, ID }) => {
    const { admin } = useUser()
    const [paymentTypeDetails, setPaymentTypeDetails] = useState(null)
    const [advance, setAdvance] = useState(false)

    const paymentSelect = (e) => {
        e.preventDefault()
        if (e.target.value === 'Tarjeta de crédito') setPaymentTypeDetails(() => 'fees')
        else if (e.target.value === 'MercadoPago') setPaymentTypeDetails(() => 'mp')
        else setPaymentTypeDetails(() => null)
    }

    useEffect(() => {
        setTimeout(() => {
            const select = document.getElementById(`${ID}paymentType`)
            const percentage = document.getElementById(`${ID}percentage`)
            if (select) {
                if (select.value === 'Tarjeta de crédito') setPaymentTypeDetails(() => 'fees')
                else if (select.value === 'MercadoPago') setPaymentTypeDetails(() => 'mp')
            }
            if (percentage) {
                if (percentage.value) setAdvance(() => true)
            }
        }, 200);
    }, [ID])

    return (
        <div className='relative grid gap-2 grid-cols-4 col-span-4'>
            {remove &&
                <>
                    <button type='button' onClick={() => remove(ID)} className='btn-tertiary absolute top-4 right-0'>quitar</button>
                    <p className='col-span-4 text-xl mt-4 -ml-2'>Pago Extra</p>
                </>}

            {/*paymentType*/}
            <label htmlFor={`${ID}paymentType`} className='col-span-4'>
                <p className='text-gray-500 pl-2'>Tipo de pago</p>
                <select id={`${ID}paymentType`} name={`${ID}paymentType`} onChange={paymentSelect} className='w-full' >
                    <option value="" hidden>Seleccionar uno</option>
                    <option value="Efectivo">Efectivo</option>
                    <option value="Tarjeta de crédito">Tarjeta de crédito</option>
                    <option value="Tarjeta de débito">Tarjeta de débito</option>
                    <option value="Transferencia">Transferencia</option>
                    <option value="MercadoPago">MercadoPago</option>
                    <option value="Western Union">Western Union</option>
                    <option value="Payoneer">Payoneer</option>
                    <option value="Otro">Otro</option>
                </select>
                <div className='error'>{errors[`${ID}paymentType`] || ''}</div>
            </label>

            {/*fees*/}
            <label htmlFor={`${ID}fees`} className={`col-span-2 ${paymentTypeDetails === 'fees' ? '' : 'hidden'}`}>
                <p className='text-gray-500 pl-2'>Cantidad de cuotas</p>
                <input type="number" id={`${ID}fees`} name={`${ID}fees`} placeholder='Cuotas' className='w-full' />
                <div className='error'>{errors[`${ID}fees`] || ''}</div>
            </label>
            <label className={`col-span-2 ${paymentTypeDetails === 'fees' ? '' : 'hidden'}`}></label>

            {/*mpDetails*/}
            <label htmlFor={`${ID}mpDetails`} className={`col-span-4 ${paymentTypeDetails === 'mp' ? '' : 'hidden'}`}>
                <p className='text-gray-500 pl-2'>Cuenta utilizada</p>
                <input type="text" id={`${ID}mpDetails`} name={`${ID}mpDetails`} placeholder='Usuario de MercadoPago' className='w-full' autoComplete='off' />
                <div className='error'>{errors[`${ID}mpDetails`] || ''}</div>
            </label>

            {/*currency*/}
            <label htmlFor={`${ID}currency`} className='col-span-2'>
                <p className='text-gray-500 pl-2'>divisa</p>
                <select id={`${ID}currency`} name={`${ID}currency`} className='w-full' >
                    <option value="" hidden>---</option>
                    <option value="USD">USD</option>
                    <option value="PEN">PEN</option>
                    <option value="CLP">CLP</option>
                    <option value="BRL">BRL</option>
                    <option value="EUR">EUR</option>
                </select>
                <div className='error'>{errors[`${ID}currency`] || ''}</div>
            </label>

            {/*amount*/}
            <label htmlFor={`${ID}amount`} className='col-span-2'>
                <p className='text-gray-500 pl-2'>monto</p>
                <input type="text" id={`${ID}amount`} name={`${ID}amount`} autoComplete="off"
                    placeholder='$' className='w-full' onKeyUp={formatCurrency} />
                <div className='error'>{errors[`${ID}amount`] || ''}</div>
            </label>

            <section className='col-span-4 grid grid-cols-4 gap-2 w-full'>
                {/*switch seña*/}
                <label className='col-span-2'>
                    <p className='text-gray-500 pl-1'>es una seña</p>
                    <Switch options={['No', 'Si']} cb={() => setAdvance(!advance)} state={advance} />
                    <div className='error'>{errors?.advance || ''}</div>
                    <input type="hidden" id={`${ID}advance`} name={`${ID}advance`} value={advance} className='w-full' />
                </label>

                {/*percentage para señas*/}
                <label htmlFor={`${ID}percentage`} className={`col-span-2 ${advance ? '' : 'hidden'}`}>
                    <p className='text-gray-500 pl-2'>pocentaje del total</p>
                    <input type="text" id={`${ID}percentage`} name={`${ID}percentage`} placeholder='%' className='w-full' onKeyUp={formatPercentage} />
                    <div className='error'>{errors[`${ID}percentage`] || ''}</div>
                </label>
            </section>

            {/*paymentDate*/}
            {admin &&
                <label htmlFor={`${ID}paymentDate`} className='col-span-2'>
                    <p className='text-gray-500 pl-2'>fecha de pago</p>
                    <input type="date" id={`${ID}paymentDate`} name={`${ID}paymentDate`}
                        defaultValue={deformatDate(new Date().toLocaleDateString('en'))}
                        className='w-full' />
                    <div className='error'>{errors[`${ID}paymentDate`] || ''}</div>
                </label>}
        </div>
    )
}

export default ReservExtraPay