import useReservations from '@/hooks/useReservations'
import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import Loading from '../common/misc/Loading'
import Header from '../common/misc/Header'
import Panel from './Panel'
import { ReservationList } from './ReservationList'
import CreateReservation from './CreateReservation'
import { MdCancel, MdBookmarkAdd } from 'react-icons/md';
import { isMobile } from '@/utils/isMobile'

const Reservations = () => {
    const navigate = useNavigate()
    const { reservations, error, isLoading, } = useReservations()
    const [creation, setCreation] = useState(false)
    const [section, setSection] = useState(0)
    const mobile = isMobile()
    console.log(reservations)
    const sections = [
        <Panel creation={creation} setCreation={setCreation} />,
        <ReservationList data={reservations} />
    ]

    const correctSection = sections[section]

    return (
        <div className='flex flex-col w-full full-h fade-in'>
            <Header title={'Reservas'}
                sections={['Panel', 'Lista']}
                section={section}
                setSection={setSection}
                button={
                    <button onClick={() => navigate('/reservations/create')}
                        className='btn-primary txt-n-icon absolute top-8 right-6'>
                        <MdBookmarkAdd />
                        <p>{mobile ? 'Nueva' : 'Nueva Reserva'}</p>

                    </button>
                }
            />

            {isLoading &&
                <span className='w-full items-start top-0'>
                    <Loading />
                </span>}
            {error && <p>{error?.message || 'Ha ocurrido un error'}</p>}

            <section className='full-h pt-8 pl-8 col-span-5 overflow-y-auto'>
                {correctSection}
            </section>

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

export default Reservations