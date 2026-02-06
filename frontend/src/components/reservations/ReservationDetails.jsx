import useReservations from '@/hooks/useReservations'
import { useNavigate, useParams } from 'react-router-dom'
import { deleteApi } from '@/services/api'
import ReservationCard from '../common/cards/ReservationCard'
import useUser from '@/hooks/useUser'
import { MdDelete, MdEdit } from 'react-icons/md';
import Modal from '@/utils/Modal'
import useModal from '@/hooks/useModal'
import { useNotifications } from 'reapop';
import { useState } from 'react'
import QuickPayment from '../common/forms/QuickPayment'
import DeleteReserv from '../common/forms/DeleteReserv'

const ReservationDetails = () => {
    const { id } = useParams()
    const { admin } = useUser()
    const { reservations, error, isLoading, setReservations } = useReservations()
    const [loading, setLoading] = useState(false)
    const reserv = reservations && reservations.find(r => r.id === id)
    const navigate = useNavigate()
    const { notify } = useNotifications()
    const [isOpen, open, close] = useModal()
    const [child, setChild] = useState(false)

    const handleDelete = async (remove) => {
        setLoading(() => true)
        const res = await deleteApi(`/reservation?id=${id}&remove=${String(remove)}`)
            .catch(err => notify(err.message, 'error'))

        notify(res.message, 'success')
        setReservations(res.reservationList)
        setLoading(() => false)
        navigate('/reservations')
    }

    const openModal = (mode) => {
        setChild(mode)
        open()
    }

    const closeModal = () => {
        close()
        setChild(() => false)
    }

    const modalChild = {
        deleteReserv: <DeleteReserv handleDelete={handleDelete} close={closeModal} loading={loading} />,
        updatePayment: <QuickPayment data={reserv} close={closeModal} />
    }
    const correctChild = modalChild[child]

    return (
        <div className='p-2 my-1 relative'>
            <h1>Detalles de reserva</h1>

            {isLoading && <h2>Cargando...</h2>}
            {(isLoading && !reserv) && <h2>Reserva no encontrada</h2>}
            {error && <h2>{error?.message || 'error'}</h2>}

            {reserv
                ? <>
                    <ReservationCard data={reserv} open={() => openModal('updatePayment')} />

                    {admin && <>
                        <button className='btn-icon absolute top-8 right-20'
                            onClick={() => navigate(`/reservations/edit/${id}`)}>
                            <MdEdit />
                        </button>
                        <button className='btn-icon absolute top-8 right-9'
                            onClick={() => openModal('deleteReserv')}>
                            <MdDelete />
                        </button>
                    </>}
                </>
                : <>
                    <p className='text-xl pl-1 mt-4'>Reserva no encontrada, posiblemente haya sido eliminada.</p>
                </>
            }

            <Modal isOpen={isOpen} closeModal={closeModal}>
                {correctChild}
            </Modal>
        </div>
    )
}

export default ReservationDetails