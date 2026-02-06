import React from 'react'
import { useNavigate } from 'react-router-dom'

const RoomMiniCard = ({ data }) => {
    const navigate = useNavigate()
    const identifier = data?.identifier || data?.name.slice(-1)
    const guest = data.current_guest

    return (
        <div onClick={() => navigate(`/rooms/details/${data.id}`)} className='h-16 aspect-square relative flex justify-center items-center border border-slate-300 dark:border-slate-700 rounded-lg text-3xl cursor-pointer'>
            <b className='mb-2'>{identifier}</b>
            <div className={`h-2 w-2 rounded-full absolute bottom-2 center ${guest ? 'bg-rose-400 dark:bg-rose-700' : 'bg-green-500 dark:bg-green-300'}`}></div>
        </div>
    )
}

export default RoomMiniCard