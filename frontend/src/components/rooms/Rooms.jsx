import useRooms from '@/hooks/useRooms'
import useUser from '@/hooks/useUser'
import { isMobile } from '@/utils/isMobile'
import React from 'react'
import { useNavigate } from 'react-router-dom'
import RoomCard from '../common/cards/RoomCard'
import Loading from '../common/misc/Loading'
import { MdAddCircle } from 'react-icons/md'

const Rooms = () => {
    const navigate = useNavigate()
    const { admin } = useUser()
    const { rooms, isLoading, error } = useRooms()
    const mobile = isMobile()

    return (
        <div className={`relative flex flex-col w-full full-h fade-in`}>
            <section className={`mb-4 flex flex-col md:flex-row justify-between ${mobile ? 'ml-8' : ''}`}>
                <h1 className={`${mobile ? 'text-3xl' : ''}`}>Cabañas</h1>
                {admin &&
                    <button className="btn-primary txt-n-icon justify-center"
                        onClick={() => navigate('/rooms/create')}>
                        <MdAddCircle />
                        Crear Cabaña
                    </button>}
            </section>

            <div className='grid grid-cols-1 sm:grid-cols-4 gap-2 my-2'>
                {isLoading &&
                    <div className='relative h-1 mb-2'>
                        <span className='loading-container'>
                            <Loading />
                        </span>
                    </div>}
                {error && !isLoading && <p className='col-span-4 error'>{error?.message || 'Ha ocurrido un error'}</p>}

                {rooms && rooms.map(e => (
                    e.enabled && <RoomCard key={e.id} data={e} />
                ))}
            </div>

            <div className='grid grid-cols-1 sm:grid-cols-4 gap-2 my-2'>
                {rooms && rooms.map(e => (
                    !e.enabled && <RoomCard key={e.id} data={e} />
                ))}
            </div>
        </div>
    )
}

export default Rooms