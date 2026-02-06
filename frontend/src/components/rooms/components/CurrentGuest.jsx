import React from 'react'
import ReservationCard from '@/components/common/cards/ReservationCard'

const CurrentGuest = ({ room }) => {
    const reserv = room?.current_guest

    return (
        <section className='p-4'>
            {room?.current_guest
                ? <ReservationCard data={reserv} />
                : <p className='text-xl'>Libre</p>
            }
        </section>
    )
}

export default CurrentGuest