import useRooms from '@/hooks/useRooms'
import useReservations from '@/hooks/useReservations'
import { deformatDate, formatDate } from '@/utils/formatDate'
import React, { useMemo, useState } from 'react'
// import CreateReservation from './CreateReservation'
import { architect } from './panelUtils/architect'
import ReservationsPanel from './ReservationsPanel'
// import { MdCancel } from 'react-icons/md';

const Panel = ({ creation, setCreation }) => {
    const { reservations } = useReservations()
    const { rooms } = useRooms()
    console.log(reservations)
    console.log(rooms)
    const [START, setSTART] = useState(false)
    const [DAYS, setDAYS] = useState(30)

    const blueprint = useMemo(() => architect(rooms, reservations, START, DAYS), [rooms, reservations, START, DAYS])

    return (
        <>
            <section className='flex gap-2 pb-4'>
                <label htmlFor="startDate">
                    <p className='pl-1 text-gray-500 dark:text-gray-400'>Fecha de inicio</p>
                    <input type="date" name="startDate" id="startDate"
                        defaultValue={deformatDate(new Date().toLocaleDateString('en'))}
                        onChange={(e) => setSTART(formatDate(e.target.value))} />
                </label>

                <label htmlFor="totalDays">
                    <p className='pl-1 text-gray-500 dark:text-gray-400'>Días</p>
                    <select name="totalDays" id="totalDays" onChange={(e) => setDAYS(parseInt(e.target.value))}>
                        <option value='30'>30</option>
                        <option value='60'>60</option>
                        <option value='90'>90</option>
                    </select>
                </label>
            </section>

            <ReservationsPanel create={setCreation} creating={creation} blueprint={blueprint} />
        </>
    )
}

export default Panel