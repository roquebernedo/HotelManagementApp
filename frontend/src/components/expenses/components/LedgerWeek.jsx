import React from 'react'
import { defineWeek } from '@/utils/defineWeek'
import { getDay } from '@/utils/getDay'
import WeekDay from '@/components/expenses/components/WeekDay'
import { weekDate } from '@/utils/formatDate'

const LedgerWeek = ({ data, setDate, date, day }) => {
    const {
        start,
        end
    } = defineWeek(date || new Date().toLocaleDateString('en'))

    return (
        <section className='grid grid-cols-7 gap-2'>
            <WeekDay name='Lunes' data={getDay(1, data)} setDate={setDate} date={start} day={day} />
            <WeekDay name='Martes' data={getDay(2, data)} setDate={setDate} date={weekDate(start, 1)} day={day} />
            <WeekDay name='Miercoles' data={getDay(3, data)} setDate={setDate} date={weekDate(start, 2)} day={day} />
            <WeekDay name='Jueves' data={getDay(4, data)} setDate={setDate} date={weekDate(start, 3)} day={day} />
            <WeekDay name='Viernes' data={getDay(5, data)} setDate={setDate} date={weekDate(start, 4)} day={day} />
            <WeekDay name='Sabado' data={getDay(6, data)} setDate={setDate} date={weekDate(start, 5)} day={day} />
            <WeekDay name='Domingo' data={getDay(0, data)} setDate={setDate} date={end} day={day} />
        </section>
    )
}

export default LedgerWeek