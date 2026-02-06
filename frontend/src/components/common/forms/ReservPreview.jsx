import { fancyDate } from '@/utils/formatDate'
import { numberToCurrency } from '@/utils/formUtils'
import React from 'react'
import {
    MdPerson,
    MdPayments,
    MdHome,
    MdEvent
} from 'react-icons/md';
import { BsFillCaretUpFill, BsFillCaretDownFill } from 'react-icons/bs';

const ReservPreview = ({ preview, back, client, room, handler }) => {
    return (
        <div className='grid grid-cols-4 gap-4 w-96 p-2'>
            <section className='col-span-4'>
                <p className='txt-n-icon'><MdPerson />{client}</p>
                <div className='txt-n-icon ml-2 text-gray-400'>
                    ( {preview.persons} personas )
                </div>
            </section>

            <section className='col-span-4'>
                <p className='txt-n-icon capitalize'><MdHome />{room}</p>
            </section>

            <section className='col-span-4'>
                <p className='txt-n-icon'><MdEvent /> Fechas: </p>
                <div className='txt-n-icon ml-2 text-gray-500'><BsFillCaretDownFill /><p className='text-black dark:text-primary-200'>{fancyDate(preview.checkin)}</p></div>
                <div className='txt-n-icon ml-2 text-gray-500'><BsFillCaretUpFill /><p className='text-black dark:text-primary-200'>{fancyDate(preview.checkout)}</p></div>
                <div className='txt-n-icon ml-2 text-gray-400'>
                    ( {preview.nights} {preview.nights > 1 ? 'noches' : 'noche'} )
                </div>
            </section>

            <section className='col-span-4'>
                <p className='txt-n-icon'><MdPayments />Pago</p>
                {!!preview?.extraPayments?.length && <b className='text-gray-500'>Pago #1</b>}

                <div className='ml-2 txt-n-icon text-gray-500'>
                    forma:
                    <p className='text-black dark:text-primary-200'>{preview.paymentType}</p>
                </div>

                {preview.fees !== '-' &&
                    <div className='ml-2 txt-n-icon text-gray-500'>
                        cuotas:
                        <p className='text-black dark:text-primary-200'>{preview.fees}</p>
                    </div>}

                {preview.mpDetails !== '-' &&
                    <div className='ml-2 txt-n-icon text-gray-500'>
                        cuenta de MP:
                        <p className='text-black dark:text-primary-200'>{preview.mpDetails}</p>
                    </div>}

                <div className='ml-2 txt-n-icon text-gray-500'>
                    monto:
                    <p className='text-black dark:text-primary-200'>{numberToCurrency(preview.amount)}</p>
                    <p className='text-black dark:text-primary-200 text-sm'>{preview.currency}</p>
                </div>

                {(preview.percentage) &&
                    <div className='ml-2 txt-n-icon text-gray-500'>Adelanto del
                        <p className='text-black dark:text-primary-200'>%{preview.percentage}</p>
                    </div>}
            </section>

            {!!preview?.extraPayments?.length &&
                preview.extraPayments.map((e, i) => (
                    <section key={e.id} className='col-span-4'>
                        <b className='text-gray-500'>Pago #{2 + i}</b>

                        <div className='ml-2 txt-n-icon text-gray-500'>
                            forma:
                            <p className='text-black dark:text-primary-200'>{e.paymentType}</p>
                        </div>

                        {e.fees !== '-' &&
                            <div className='ml-2 txt-n-icon text-gray-500'>
                                cuotas:
                                <p className='text-black dark:text-primary-200'>{e.fees}</p>
                            </div>}

                        {e.mpDetails !== '-' &&
                            <div className='ml-2 txt-n-icon text-gray-500'>
                                cuenta de MP:
                                <p className='text-black dark:text-primary-200'>{e.mpDetails}</p>
                            </div>}

                        <div className='ml-2 txt-n-icon text-gray-500'>
                            monto:
                            <p className='text-black dark:text-primary-200'>{numberToCurrency(e.amount)}</p>
                            <p className='text-black dark:text-primary-200 text-sm'>{e.currency}</p>
                        </div>

                        {(e.percentage) &&
                            <div className='ml-2 txt-n-icon text-gray-500'>Adelanto del
                                <p className='text-black dark:text-primary-200'>%{e.percentage}</p>
                            </div>}

                    </section>
                ))
            }

            <section className='col-span-4'>
                <p>Pago: {preview.paymentStatus ? <b className='text-emerald-500'>Completo</b> : <b className='text-rose-500'>Incompleto</b>}</p>
                {!preview.paymentStatus && <p>Total a pagar: <b>{numberToCurrency(preview?.total) || '-'}</b></p>}
            </section>

            <p>Notas: {preview.notes}</p>

            <button onClick={back} className='btn-secondary col-span-4'>Volver a Editar</button>
            <button onClick={handler} className='btn-primary col-span-4'>Crear Reserva</button>
        </div>
    )
}

export default ReservPreview