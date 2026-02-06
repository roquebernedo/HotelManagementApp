import React from 'react'
import { MdMonetizationOn } from 'react-icons/md'

const NoPayment = () => {
    return (
        <span className={`relative h-4 w-4 flex items-center text-rose-500 bg-white rounded-full`}>
            <MdMonetizationOn className='z-10' />
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-rose-400 opacity-90"></span>
        </span>
    )
}

export default NoPayment