import { useNavigate, useParams } from 'react-router-dom'
import useRooms from '@/hooks/useRooms'
import { useState } from 'react'
import { MdGroups, MdEdit, MdDelete, MdOutlineBookmark, MdEvent, MdCancel } from 'react-icons/md';
import useUser from '@/hooks/useUser'
import { deleteApi } from '@/services/api'
import { useNotifications } from 'reapop';
import useModal from '@/hooks/useModal'
import Modal from '@/utils/Modal'
import Loading from '../common/misc/Loading'
import Header from '../common/misc/Header'
import ReservationList from './components/ReservationList'
import CurrentGuest from './components/CurrentGuest';
import CreateReservation from '../reservations/CreateReservation';
import Switch from '../common/misc/Switch';
import { changeAvailability } from '@/utils/handlers/roomSubmitHandler';
// import { isMobile } from '@/utils/isMobile';

const RoomDetails = () => {
    const { id } = useParams()
    const { admin } = useUser()
    const { rooms, error, isLoading, setRooms } = useRooms()
    const room = rooms ? rooms.find(c => c.id === id) : false
    const [creation, setCreation] = useState(false)
    const [someError, setSomeError] = useState('')
    const [section, setSection] = useState(0)
    const navigate = useNavigate()
    const [isOpen, open, close] = useModal()
    const { notify } = useNotifications()
    // const mobile = isMobile()

    //: TODO: terminar esto
    // const handleCreate = () => {

    //     setCreation(() => ({ room: room.id }))
    // }

    const handleEdit = () => {
        navigate(`/rooms/edit/${id}`)
    }

    const handleDelete = async () => {
        const res = await deleteApi(`/room?id=${id}`).catch(err => {
            notify(err?.message, 'error')
            setSomeError(err.message)
            console.warn(err?.message)
        })

        if (!res.error) {
            notify(res.message, 'success')
            setRooms(res.roomsList)
            navigate('/rooms')
        }
    }

    const sections = [
        <CurrentGuest room={room} />,
        <ReservationList room={room} />,
    ]

    const correctSection = sections[section]

    const availabilityHandler = async () => {
        const res = await changeAvailability(id)
        if (!res.error) {
            notify(res.message, 'success')
            setRooms(res.roomsList)
        } else {
            notify(res.error, 'error')
            console.warn(res.error)
        }
    }

    const TITLE = <>
        <p className={room?.enabled ? '' : 'text-rose-500'}>{room?.name}</p>

        <p className='ml-4 txt-n-icon text-xl items-center text-gray-400'>
            <MdGroups />
            {` ${room?.capacity || '?'}`}
        </p>
    </>

    return (
        <>
            {isLoading &&
                <div className='relative h-1 -mb-1'>
                    <span className='loading-container'>
                        <Loading />
                    </span>
                </div>}

            {room &&
                <div className='grid gap-4 p-2 my-1 relative fade-in'>

                    <Header title={TITLE}
                        sections={[
                            <p className='txt-n-icon'><MdOutlineBookmark />Reserva actual</p>,
                            <p className='txt-n-icon'><MdEvent />Próximas reserv.</p>
                        ]}
                        section={section} setSection={setSection}
                    // button={<button className={`btn-primary absolute ${mobile ? 'top-8 right-2' : 'top-2 right-8'}`} onClick={handleCreate}>Crear reserva</button>} 
                    />

                    <p className='absolute text-9xl font-black opacity-10 -z-10 top-0 left-0'>{room?.identifier}</p>

                    {admin &&
                        <div className='w-fit flex gap-6 justify-between absolute top-4 right-4 z-10'>

                            <span className={'text-rose-500'}>
                                <Switch options={['deshabilitada']} state={!room?.enabled} cb={availabilityHandler} />
                            </span>
                            <button className='btn-icon' onClick={handleEdit}>
                                <MdEdit />
                            </button>
                            <button className='btn-icon' onClick={open}>
                                <MdDelete />
                            </button>
                        </div>}

                    <section>
                        {correctSection}
                    </section>

                </div>}

            {(error || someError) && <b>error: {error?.message || someError}</b>}
            <p><i className='text-xs opacity-50 mx-2'>ID: {room?.id || '-'}</i></p>

            {
                creation &&
                <section className='h-screen p-8 absolute top-0 right-0 overflow-y-auto z-30 border-l border-l-slate-700  bg-orange-50 dark:bg-slate-900'>
                    <CreateReservation panelData={creation} cb={() => setCreation(() => false)} />

                    <button className='btn-icon text-xl absolute top-9 right-9'
                        onClick={() => setCreation(() => false)}>
                        <MdCancel />
                    </button>
                </section>
            }

            <Modal isOpen={isOpen} close={close}>
                {<div className='relative grid grid-col grid-cols-4 gap-4 w-fit'>
                    <span className='col-span-4'>
                        <p>¿Seguro deseas eliminar este alojamiento?</p>
                        <p>Esta acción es <b>irreversible</b>.</p>
                    </span>

                    <button type='button' onClick={close} className="btn-admin-s col-span-2">Cancelar</button>
                    <button type='submit' onClick={handleDelete} className="btn-admin-p col-span-2">Continuar</button>

                </div>}
            </Modal>
        </>
    )
}

export default RoomDetails