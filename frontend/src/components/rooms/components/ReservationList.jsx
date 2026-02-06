import React from 'react'
import ReservationMiniCard from '@/components/common/cards/ReservationMiniCard';

const ReservationList = ({ room }) => {
    return (
        <section className='grid gap-2'>
            {!!room?.reservations.length &&
                <>
                    {room?.reservations.map(e => (
                        (room?.current_guest !== e.reservation_id) && <ReservationMiniCard key={e._id} data={e} />
                    ))}
                </>
            }
        </section>
    )
}

export default ReservationList