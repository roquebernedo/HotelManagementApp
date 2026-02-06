import React, { useState, useEffect } from 'react'
import { BsFillCaretUpFill, BsFillCaretDownFill, BsFillRecordFill } from 'react-icons/bs'

const CalendarMiniRoomCard = ({ data, date, cb }) => {
    const [free, setFree] = useState(false)
    const [check, setCheck] = useState(false)
    const [reserv, setReserv] = useState(false)

    //: TODO: REFACTOR
    //: TODO: implementar useCallback o useMemo ??
    const overlaped = (date, IN, OUT, id) => {
        const X = new Date(date),
            A = new Date(IN),
            B = new Date(OUT)

        if (X.getTime() === A.getTime()) {
            setCheck('IN')
        } else if (X.getTime() === B.getTime()) {
            setCheck('OUT')
        } else setCheck(false)

        if (X >= A && X <= B) {
            setReserv(() => ({ id, checkin: IN, checkout: OUT }))
            if (X < B) return true
        } else return false
    }

    const datesIterator = () => {
        const list = data.reservations
        const overlap = list.find(r => overlaped(date, r.in, r.out, r.reservation_id))
        if (overlap) {
            setFree(() => false)
        } else setFree(() => true)
    }

    useEffect(() => {
        if (!!data?.reservations?.length) {
            setReserv(() => false)
            datesIterator()
        } else setFree(() => true)
        // eslint-disable-next-line
    }, [date])

    const selectRoom = () => {
        const aux = {
            name: data.name,
            room_id: data.id,
            inToday: check === 'IN',
            outToday: check === 'OUT',
        }
        cb({ ...aux, ...reserv })
    }



    return (
        <div onClick={selectRoom} className='flex items-center justify-around px-2 w-full rounded-md bg-slate-200 dark:bg-slate-800 cursor-pointer hover:dark:bg-slate-700'>
            <b>{data?.identifier}</b>

            <div className={` ${free ? 'text-green-300' : 'text-rose-700'}`}>
                {check
                    ? <p>{check === 'IN'
                        ? <BsFillCaretDownFill />
                        : <BsFillCaretUpFill />}</p>
                    : <BsFillRecordFill />}
            </div>
        </div>
    )
}

export default CalendarMiniRoomCard