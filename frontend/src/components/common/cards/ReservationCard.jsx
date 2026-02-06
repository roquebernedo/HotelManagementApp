import { fancyDate } from '@/utils/formatDate'
import React, { Fragment, useState } from 'react'
import ClientDetailsCard from './ClientDetailsCard'
import {
    MdPerson,
    MdOutlinePayments,
    MdHome,
    MdEvent,
    MdOutlineInfo,
    MdStickyNote2,
    MdOutlineArrowBackIos,
    MdOpenInNew
} from 'react-icons/md';
import { BsFillCaretUpFill, BsFillCaretDownFill } from 'react-icons/bs';

import { useNavigate } from 'react-router-dom';
import NoPayment from '../misc/NoPayment';
import PaymentDetailsCard from './PaymentDetailsCard';
import { numberToCurrency } from '@/utils/formUtils';

const ReservationCard = ({ data, open }) => {
    const [clientDetails, setClientDetails] = useState(false)
    const navigate = useNavigate()

    const toggleClient = () => {
        setClientDetails(!clientDetails)
    }

    const newPayment = () => {
        open()
    }

    return (
        <div className='details-card'>
            <section className={`p-4 rounded-lg ${clientDetails ? 'selected' : ''} transition-colors`}>
                <div className='cursor-pointer txt-n-icon justify-between text-xl'
                    onClick={toggleClient}>
                    <p className='txt-n-icon capitalize'>
                        <MdPerson className='mr-2' />
                        {clientDetails ? 'Cliente' : data?.client?.name}
                    </p>
                    <MdOutlineArrowBackIos className={`${clientDetails ? '-rotate-90' : 'rotate-90'} transition-transform`} />
                </div>
                {clientDetails && <ClientDetailsCard user={data?.client} />}
            </section>

            {data?.room?.name &&
                <section>
                    <p className='txt-n-icon text-xl cursor-pointer hover:border-blue-500'
                        onClick={() => navigate(`/rooms/details/${data.room.id}`)} >
                        <MdHome />
                        <b className='capitalize'>{data?.room?.name || '-'}</b>
                        <MdOpenInNew className='link' />
                    </p>
                </section>}

            <section>
                <p className='txt-n-icon text-xl'><MdEvent />Fechas</p>
                <div className='details-data'>
                    <p>checkin</p>
                    <p className='txt-n-icon -ml-6'>
                        <BsFillCaretDownFill className='opacity-75 text-rose-400 dark:text-rose-700' />{fancyDate(data?.checkin)}</p>
                    <p>checkout</p>
                    <p className='txt-n-icon -ml-6'>
                        <BsFillCaretUpFill className='opacity-75 text-green-400 dark:text-green-300' />{fancyDate(data?.checkout)}</p>
                    <p>total de noches</p>
                    <p>{data?.nights} {data?.nights > 1 ? 'Noches' : 'Noche'}</p>
                </div>
            </section>

            <section>
                <p className='txt-n-icon text-xl'><MdOutlineInfo />Extras</p>
                <div className='details-data'>
                    <p>Personas</p>
                    <p>{data?.persons}</p>
                    <p>Vehículo</p>
                    <p>{data?.client?.vehicleType === '-' ? 'No' : data?.client?.vehicleType}</p>
                    {data?.client?.plate !== '-' && <><p>Patente</p> <p>{data?.client?.plate}</p></>}
                </div>
            </section>

            <section>
                <p className='txt-n-icon text-xl'><MdOutlinePayments />{data?.extraPayments?.length ? 'Pagos' : 'Pago'}</p>

                <div className='details-data'>
                    <p>Estado del pago</p>

                    <div>
                        {data?.paymentStatus
                            ? <span className='text-emerald-500'>Completo</span>
                            : <span className='txt-n-icon -ml-6 text-rose-500'>
                                <NoPayment />Incompleto
                            </span>}
                    </div>
                </div>

                <div className='details-data mb-2'>
                    {!data?.paymentStatus &&
                        <>
                            <p>Total a pagar</p>
                            <p>{numberToCurrency(data?.total) || '?'}</p>
                        </>}
                </div>


                {!!data?.extraPayments?.length && <p className='pl-4 mt-4 text-gray-600 dark:text-gray-400'>Pago #1</p>}
                <div className='details-data'>
                    <PaymentDetailsCard data={data} />
                </div>

                {!!data?.extraPayments?.length &&
                    data.extraPayments.map((e, i) => (
                        <Fragment key={'extra' + i}>
                            <p className='pl-4 mt-4 text-gray-600 dark:text-gray-400'>Pago #{2 + i}</p>
                            <div className='details-data'>
                                <PaymentDetailsCard data={e} />
                            </div>
                        </Fragment>
                    ))
                }

                {!data?.paymentStatus &&
                    <button className="btn-primary mt-6 mb-2 mx-2 "
                        onClick={newPayment}>
                        Agregar pago
                    </button>}

            </section>

            {data?.notes !== '-' &&
                <section>
                    <p className='text-xl flex gap-2 items-center'><MdStickyNote2 />Notas</p>
                    <p className='ml-2'>{data?.notes}</p>
                </section>}

            <div className='text-xs text-right opacity-50 mx-2'>
                <p>creación: <b>{fancyDate(data.createdAt, true, true).slice(0, -4) || '-'}</b></p>
                <p>por: <b className='capitalize'>{data.creator || '-'}</b></p>
                <p>última edición: <b>{fancyDate(data.updatedAt, true, true).slice(0, -4) || '-'}</b></p>
                <p>por: <b className='capitalize'>{data.editor || '-'}</b></p>
                <i>ID: {data?.id}</i>
            </div>

        </div >
    )
}

export default ReservationCard