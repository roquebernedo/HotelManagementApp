import CreateReservation from '@/components/reservations/CreateReservation'
import useRooms from '@/hooks/useRooms'
import { deformatDate, formatDate } from '@/utils/formatDate'
import { datesValidator, fillDates } from '@/utils/formUtils'
import React, { useState } from 'react'
import QuickSearchCard from './QuickSearchCard'
import { MdCancel, MdOpenInFull, MdCloseFullscreen } from 'react-icons/md'
import { isMobile } from '@/utils/isMobile'

const QuickCheck = () => {
    const { rooms } = useRooms()
    const [avRooms, setAvRooms] = useState([])
    const [message, setMessage] = useState('Introduce fechas para ver disponibilidad.')
    const [errors, setErrors] = useState()
    const today = deformatDate(new Date(new Date().toLocaleDateString('en')))
    const [creation, setCreation] = useState(false)
    const mobile = isMobile()
    const [expanded, setExpanded] = useState(!mobile)

    const datesHandler = (e) => {
        reset()
        const checkin = document.getElementById('QuickCheckin'),
            checkout = document.getElementById('QuickCheckout'),
            nights = document.getElementById('QuickNights'),
            id = e.target.id.slice(5).toLowerCase()

        fillDates(checkin, checkout, nights, id)
    }

    const errorHandler = (fn) => {
        const newErrors = fn({});
        const auxError = Object.values(newErrors)[0]
        setErrors({ checkin: auxError })
    }

    const handler = (e) => {
        e.preventDefault()
        const [{ value: checkin }, { value: checkout }, , { value: pax }] = e.target
        if (checkin && checkout) {
            // Looks for available rooms
            const value = datesValidator(rooms, setAvRooms, errorHandler, checkin, checkout, pax)
            if (value?.length > 0) {
                setMessage(() => ('Alojamiento disponible:'))
            }
        }
    }
    console.log(avRooms)
    const reset = () => {
        setAvRooms(() => [])
        setMessage(() => ('Introduce fechas para ver disponibilidad.'))
        setErrors(() => false)
    }

    const createReserv = (id) => {
        setCreation(() => false)
        const IN = formatDate(document.getElementById('QuickCheckin').value),
            OUT = formatDate(document.getElementById('QuickCheckout').value),
            nights = document.getElementById('QuickNights').value,
            persons = document.getElementById('QuickPersons').value


        const aux = {
            room: id,
            checkin: IN,
            checkout: OUT,
            persons,
            nights
        }

        setCreation(() => aux)
    }

    return (
        <div className='h-fit w-full px-4 pt-2 pb-4 flex flex-col gap-2 justify-between'>

            <div className='flex justify-between'>
                <p className='text-xl -mb-2'>Disponibilidad</p>
                <button aria-label='expandir' onClick={() => setExpanded(!expanded)}
                    className='btn-icon text-sm pt-1'>{expanded ? <MdCloseFullscreen /> : <MdOpenInFull />}</button>
            </div>

            {expanded &&
                <>
                    <form className='grid grid-cols-2 sm:grid-cols-6 gap-2' onSubmit={handler}>
                        {/*checkin*/}
                        <label htmlFor='checkin' className='col-span-2'>
                            <p className='text-gray-500 pl-2'>checkin</p>
                            <input type="date" id='QuickCheckin' name='checkin' defaultValue={today} className='w-full' onChange={datesHandler} />
                        </label>
                        {/*checkout*/}
                        <label htmlFor='checkout' className='col-span-2'>
                            <p className='text-gray-500 pl-2'>checkout</p>
                            <input type="date" id='QuickCheckout' name='checkout' className='w-full' onChange={datesHandler} />
                        </label>
                        {/*nights*/}
                        <label htmlFor='nights' className='col-span-1'>
                            <p className='text-gray-500 pl-2'>noches</p>
                            <input type="number" id='QuickNights' name='nights' placeholder='Noches' className='w-full' onChange={datesHandler} />
                        </label>
                        {/*pax*/}
                        <label htmlFor='persons' className='col-span-1'>
                            <p className='text-gray-500 pl-2'>pax</p>
                            <input type="number" id='QuickPersons' name='persons' placeholder='Personas' className='w-full' />
                        </label>

                        <button type='submit' className='btn-primary col-span-2 sm:col-span-1'>buscar</button>
                        <button type='reset' onClick={reset} className='btn-secondary col-span-2 sm:col-span-1'>reset</button>
                    </form>

                    <section className='mt-4'>
                        {message && <p className={`text-gray-400 uppercase text-xs`}>{message}</p>}
                        {errors?.checkin && <p className={`text-rose-400 uppercase text-xs`}>{errors.checkin}</p>}
                        {!!avRooms?.length &&
                            avRooms.map(c => (
                                <QuickSearchCard key={c.id} data={c} createReserv={createReserv} />
                            ))}
                    </section>
                </>}

            {creation &&
                <section className='h-screen p-8 absolute top-0 right-0 overflow-y-auto z-30 border-l border-l-slate-700  bg-orange-50 dark:bg-slate-900'>
                    <CreateReservation panelData={creation} cb={() => setCreation(() => false)} />

                    <button className='btn-icon text-xl absolute top-9 right-9'
                        onClick={() => setCreation(() => false)}>
                        <MdCancel />
                    </button>
                </section>}

        </div>
    )
}

export default QuickCheck