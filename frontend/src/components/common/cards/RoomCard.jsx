import { correctDate, fancyDate } from '@/utils/formatDate'
import React from 'react'
import { useNavigate } from 'react-router-dom'
import { MdPerson, MdOutlineRemoveCircleOutline } from 'react-icons/md';
import { BsFillCaretUpFill, BsFillCaretDownFill } from 'react-icons/bs';
import { checksChecker } from '@/utils/checksChecker';

const RoomCard = ({ data }) => {
    const {
        id,
        name,
        enabled,
        identifier,
        current_guest,
        reservations
    } = data
    console.log(enabled)
    console.log(current_guest)
    console.log(reservations)
    const {
        checkin,
        checkout,
        client
    } = current_guest || false

    const navigate = useNavigate()
    // check if the reserv checkin or checkout was today
    const { inToday, outToday } = checksChecker(checkin, checkout)

    return (
        <div onClick={() => navigate(`/rooms/details/${id}`)}
            className={`h-32 p-3 flex flex-col justify-between relative cursor-pointer border rounded-lg ${enabled ? 'border-slate-300 dark:border-slate-700 hover:border-blue-400 hover:dark:border-slate-500' : 'text-gray-500 font-semibold border-rose-700 hover:border-rose-500'}`}>

            <section>
                <div className='text-xl capitalize'>{name}</div>
                {inToday && <p className='txt-n-icon text-xs text-rose-400 dark:text-rose-600'><BsFillCaretDownFill />CHECKIN HOY</p>}
                {outToday && <p className='txt-n-icon text-xs text-green-400 dark:text-green-300'><BsFillCaretUpFill />CHECKOUT HOY</p>}
                {/* {!current_guest && <p className='text-xs text-gray-500 text-green-400 dark:text-green-300'>LIBRE</p>} */}
            </section>

            <section>
                {enabled ? <>
                    {current_guest &&
                        <div className='text-gray-500 ml-1'>
                            <p className='txt-n-icon'><MdPerson />{client?.name || '?'}</p>
                            {<p className='txt-n-icon'><BsFillCaretUpFill />{fancyDate(checkout, false)}</p>}
                        </div>}
                    {(!current_guest && !!reservations.length) &&
                        <div className='text-gray-500 ml-1'>
                            <p className='text-xs'>PROXIMA RESERVA</p>
                            <p className='txt-n-icon'><BsFillCaretDownFill />{correctDate(reservations[0].in)}</p>
                        </div>}
                </>
                    : <>
                        <div className='text-gray-500 ml-1'>
                            <p className='text-xs'>CABAÑA DESHABILITADA</p>
                        </div>
                    </>}
            </section>

            {enabled
                ? <div className={`h-3 w-3 rounded-full absolute top-4 right-4 ${(!!current_guest && !outToday) ? 'bg-rose-400 dark:bg-rose-700' : 'bg-green-400 dark:bg-green-300'}`}></div>
                : <MdOutlineRemoveCircleOutline className='absolute top-4 right-4' />
            }


            <div className='absolute top-4 right-4 -z-10 opacity-5 font-bold text-3xl'>
                <h1>{identifier}</h1>
            </div>
        </div >
    )
}

export default RoomCard