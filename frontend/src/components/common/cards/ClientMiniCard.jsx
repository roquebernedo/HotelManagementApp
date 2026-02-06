import { useNavigate } from 'react-router-dom'
import React from 'react'
import { MdEmail, MdCall, MdFilterAlt, MdApartment, MdTag } from 'react-icons/md';

const ClientMiniCard = ({ data, sortKey }) => {
    const navigate = useNavigate()
    console.log(data[sortKey])
    return (
        <div onClick={() => navigate(`/clients/details/${data.id}`)}
            className='px-3 py-2 my-1 border rounded-lg border-slate-300 dark:border-slate-700 hover:border-blue-400 hover:dark:border-slate-500 cursor-pointer'>
            <p className='txt-n-icon text-xl mb-1 capitalize'>{data?.company && <MdApartment />}{data.name}</p>
            {sortKey !== 'name' &&
                <p className='flex gap-2 items-center ml-2 text-blue-400'>
                    <MdFilterAlt className='scale-125 ' />{data[sortKey]}
                </p>}
            {data?.company && <p className='flex gap-2 items-center ml-2 text-gray-500 dark:text-gray-400'><MdTag />{data?.cuil || '-'}</p>}
            {sortKey !== 'telephone' && <p className='flex gap-2 items-center ml-2 text-gray-500 dark:text-gray-400'><MdCall />{data?.telephone || '-'}</p>}
            {sortKey !== 'email' && <p className='flex gap-2 items-center ml-2 text-gray-500 dark:text-gray-400'><MdEmail />{data?.email || '-'}</p>}
        </div>
    )
}

export default ClientMiniCard