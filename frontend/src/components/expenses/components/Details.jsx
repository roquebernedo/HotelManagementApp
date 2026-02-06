import { numberToCurrency } from '@/utils/formUtils';
import React from 'react'

const Details = ({ details }) => {

    const aux = Object.entries(details)

    return (
        <div className='mt-2 details-list'>
            {aux.map(d =>
                <div className='grid grid-cols-2' key={d[0]}>
                    <p className='text-gray-400'>{d[0]}:</p>
                    <p className='text-gray-300'>{numberToCurrency(d[1])}</p>
                </div>
            )}
        </div>
    )
}

export default Details