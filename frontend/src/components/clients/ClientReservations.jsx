import useReservations from '@/hooks/useReservations'
import { fancyDate } from '@/utils/formatDate'
import React from 'react'
import { MdBook } from 'react-icons/md'
import { useNavigate } from 'react-router-dom'

const ClientReservations = ({ id }) => {
    const navigate = useNavigate()
    const { reservations } = useReservations()
    const reservList = reservations.filter(r => r.client.id === id)

    return (
        <div className='details-card'>

            <p className='text-xl flex gap-2 items-center'><MdBook />Reservas del Cliente</p>
            {reservList &&
                reservList.map(e => (
                    <section key={e.id} onClick={() => navigate(`/reservations/details/${e.id}`)}>
                        <div className='details-data cursor-pointer'>
                            <p>fechas</p>
                            <p>{fancyDate(e.checkin)} - {fancyDate(e.checkout)}</p>
                            <p>alojamiento</p>
                            <p>{e?.room?.name}</p>
                        </div>
                    </section>
                ))
            }

        </div>
    )
}

export default ClientReservations