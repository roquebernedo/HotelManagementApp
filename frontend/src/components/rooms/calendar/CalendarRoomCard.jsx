import React from 'react'
import { useNavigate } from 'react-router-dom'
import { MdPerson } from 'react-icons/md';
import { BsFillCaretUpFill, BsFillCaretDownFill } from 'react-icons/bs';
import { fancyDate } from '@/utils/formatDate';
import useReservations from '@/hooks/useReservations';


const CalendarRoomCard = ({ data }) => {
    // id de la reserva, para ver cliente etc
    const {
        name,
        inToday,
        outToday,
        id,
        room_id,
        checkin,
        checkout
    } = data || false
    const { reservations } = useReservations()
    const navigate = useNavigate()

    const client = reservations.find(r => r.id === id)?.client?.name

    return (
        <div onClick={() => navigate(`/rooms/details/${room_id}`)}
            className='h-36 p-3 flex flex-col justify-between relative cursor-pointer border border-slate-300 dark:border-slate-700 rounded-lg hover:border-blue-400 hover:dark:border-slate-500'>

            <section>
                <b className='text-xl capitalize'>{name}</b>
                {inToday && <p className='txt-n-icon text-xs text-rose-400 dark:text-rose-700'><BsFillCaretDownFill />CHECKIN HOY</p>}
                {outToday && <p className='txt-n-icon text-xs text-green-400 dark:text-green-300'><BsFillCaretUpFill />CHECKOUT HOY</p>}
            </section>

            <section>
                {id &&
                    <div className='text-gray-500 ml-1'>
                        <p className='txt-n-icon'><MdPerson />{client || '?'}</p>
                        {<p className='txt-n-icon'><BsFillCaretDownFill />{fancyDate(checkin, false)}</p>}
                        {<p className='txt-n-icon'><BsFillCaretUpFill />{fancyDate(checkout, false)}</p>}
                    </div>}
            </section>

        </div>
    )
}

export default CalendarRoomCard