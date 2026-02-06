import React, { useMemo } from 'react'
import { numberToCurrency } from '@/utils/formUtils'
import { MdArrowUpward } from 'react-icons/md'
import { MONTHS } from '@/utils/monthsList'

const Stats = ({ Month, Year, data }) => {
    const monthData = useMemo(() => {
        if (data) {
            const bookings = data?.bookings?.find(e => e._id.month === (Month + 1) && e._id.year === Year)
            const hostings = data?.hostings?.find(e => e._id.month === (Month + 1) && e._id.year === Year)
            const income = data?.income.find(e => e._id.month === Month && e._id.year === Year)

            const aux = {
                bookings: bookings?.totalBookings || null,
                hostings: hostings?.totalHostings || null,
                guests: hostings?.totalGuests || null,
                reservIncome: income?.reservsIncome || null,
                totalIncome: income?.totalIncome || null
            }

            return aux
        } else {
            return null
        }
    }, [Month, Year, data])

    return (
        <>
            {data && monthData &&
                <>
                    <section className='averages-card border rounded-md p-4 mb-4 gradient'>
                        <p className='text-xl'>Promedios mensuales</p>

                        <div>
                            <p>Reservas</p>
                            <p>{data?.averageBookings || '?'}</p>
                            <p>Hospedajes</p>
                            <p>{data?.averageHostings || '?'}</p>
                            <p>Ganancias (resrv.)</p>
                            <div className='txt-n-icon col-span-2'>
                                {numberToCurrency(Math.floor(data?.averageReservIncome))}
                                <p className='text-gray-500 text-xs'>PEN</p>
                            </div>
                            <p>Ganancias (total)</p>
                            <div className='txt-n-icon col-span-2'>
                                {numberToCurrency(Math.floor(data?.averageIncome))}
                                <p className='text-gray-500 text-xs'>PEN</p>
                            </div>
                        </div>
                    </section>

                    <p className='text-xl'>Detalles de {MONTHS[Month]}, {Year}</p>

                    <div className='stats-container grid grid-cols-3 px-2'>
                        <p>Reservas</p>
                        <p>{monthData.bookings}</p>
                        <p>Hospedajes</p>
                        <p>{monthData.hostings}</p>
                        <p>Huespedes</p>
                        <p>{monthData.guests}</p>
                        <p>Ganancias (resrv.)</p>
                        <div className='txt-n-icon col-span-2'>
                            {monthData.reservIncome > data?.averageReservIncome && <MdArrowUpward className='text-emerald-500 -ml-6' />}
                            {numberToCurrency(monthData.reservIncome)}
                            <p className='text-gray-500 text-xs'>PEN</p>
                        </div>
                        <p>Ganancias (total)</p>
                        <div className='txt-n-icon col-span-2'>
                            {monthData.totalIncome > data?.averageIncome && <MdArrowUpward className='text-emerald-500 -ml-6' />}
                            {numberToCurrency(monthData.totalIncome)}
                            <p className='text-gray-500 text-xs'>PEN</p>
                        </div>
                    </div>
                </>}
        </>
    )
}

export default Stats