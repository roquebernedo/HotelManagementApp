import React from 'react'
import ReservListCard from '../common/cards/ReservListCard'

export const ReservationList = ({ data }) => {
    return (
        <>
            {data &&
                <div className='grid sm:full-w fade-in'>
                    {data.map(e => (
                        <ReservListCard data={e} key={e.id} />
                    ))}
                </div>}
        </>
    )
}
