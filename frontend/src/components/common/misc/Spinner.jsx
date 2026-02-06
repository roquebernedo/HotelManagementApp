import React from 'react'
import { AiOutlineLoading } from 'react-icons/ai'

const Spinner = () => {
    return (
        <div className='absolute top-0 left-0 right-0 bottom-0 m-auto flex justify-center items-center backdrop-brightness-75 fade-in'>
            <AiOutlineLoading className='text-4xl animate-spin' />
        </div>
    )
}

export default Spinner