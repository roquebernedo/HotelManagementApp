import React, { useState } from 'react'
import Header from '../common/misc/Header'
import DailyView from './DailyView'
import Statistics from './Statistics'
import Week from './Week'

const Expenses = () => {
    const [section, setSection] = useState(0)
    const date = new Date(new Date()).toLocaleDateString('en')

    const sections = [
        <DailyView date={date} />,
        <Week date={date} />,
        <Statistics />
    ]
    const correctSection = sections[section]

    //? - 1 - Vista Diaria
    //? - 2 - Resumen Semanal
    //? - 3 - Resumen Mensual

    return (
        <div className='relative flex flex-col w-full full-h fade-in'>
            <Header title={'Cuentas'} sections={['Vista Diaria', 'Resumen Semanal', 'Informes']} section={section} setSection={setSection} />

            <section className='full-h pt-8 pl-8 col-span-5 overflow-y-auto relative'>
                {correctSection}
            </section>

        </div>
    )
}

export default Expenses 