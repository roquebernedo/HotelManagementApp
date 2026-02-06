import useUser from '@/hooks/useUser'
import React from 'react'
import Loading from '../common/misc/Loading'
import { MdVpnKey, MdEmail, MdOutlineInsertChart, MdDoubleArrow, MdLogout } from 'react-icons/md';
import useReservations from '@/hooks/useReservations';
import useClients from '@/hooks/useClients';
import { numberToCurrency } from '@/utils/formUtils';
import Modal from '@/utils/Modal';
import useModal from '@/hooks/useModal';
import ChangePassword from './ChangePassword';
import { useNavigate } from 'react-router-dom';
import { mutate } from 'swr';
import { deleteCookie, getCookie } from '@/utils/cookies';

const Profile = () => {
    const navigate = useNavigate()
    const { user, isLoading, role } = useUser()
    const { reservations } = useReservations()
    const { clients } = useClients()
    const [isOpen, open, close] = useModal()

    const reserv_neto = (reservs) => {
        const aux = reservs.filter(r => r.paymentStatus && r.creator === user.user_name)
        const correct_value = (e) => {
            let aux = 0
            if (e.total && e.currency === 'Soles') return e.total
            if (e.currency === 'Soles') aux += e.amount
            if (!!e.extraPayments.length) {
                e.extraPayments.forEach(p => {
                    if (p.currency === 'Soles') {
                        aux += p.amount
                    }
                });
            }
            return aux
        }
        const sumWithInitial = aux.reduce(
            (total, curr) => total + correct_value(curr), 0
        );
        return numberToCurrency(sumWithInitial)
    }
    const stats = {
        clients_reg: clients.filter(c => c?.creator === user.user_name).length,
        reserv_reg: reservations.filter(r => r?.creator === user.user_name).length,
        reserv_edit: reservations.filter(r => r?.editor === user.user_name).length,
        reserv_neto: reserv_neto(reservations)
    }

    const roleColor = {
        master: 'text-rose-500',
        admin: 'text-orange-500',
        staff: 'text-blue-500',
    }

    //: TODO
    // const changeEmail = () => {
    //     console.log('PUT /user/changeEmail { password, newEmail }')
    // }

    const changePassword = () => {
        open()
    }

    const handleLogout = () => {
        navigate('/login')
        mutate(['/user/login', getCookie('userToken')], false)
        deleteCookie('userToken')
    }

    return (
        <div className='relative fade-in'>

            {isLoading &&
                <div className='h-1 mb-2'>
                    <span className='loading-container'>
                        <Loading />
                    </span>
                </div>}

            {user &&
                <>
                    <button className="btn-primary absolute top-2 right-2" onClick={changePassword}>
                        <p className='txt-n-icon justify-center'>
                            <MdVpnKey />
                            cambiar contraseña
                        </p>
                    </button>

                    <h1 className=' txt-n-icon capitalize '>
                        <MdDoubleArrow className={`rotate-90 ${user?.role ? roleColor[user?.role] : 'text-gray-400 dark:text-gray-600'}`} />
                        {user?.user_name}
                        <p className='text-gray-400 dark:text-gray-600 capitalize'>
                            {role || 'Sin rol'}
                        </p>
                    </h1>

                    <i className='text-gray-500 dark:text-gray-600 text-sm ml-2'>ID: {user.id}</i>

                    <section className='grid p-6'>
                        <p className='txt-n-icon' id='email'>
                            <MdEmail />
                            {user?.email}
                        </p>
                    </section>

                    <section className='details-card mt-2 text-base'>
                        <section >
                            <p className='txt-n-icon'><MdOutlineInsertChart />Stats</p>
                            <div className='details-data'>
                                <p>Clientes registrados:</p>
                                <p>{stats.clients_reg}</p>
                                <p>Reservas registradas:</p>
                                <p>{stats.reserv_reg}</p>
                                <p>Reservas editadas:</p>
                                <p>{stats.reserv_edit}</p>
                                <p>Total generado por tus reservas:</p>
                                <p>{stats.reserv_neto} <i className='text-gray-500 text-sm'>Soles</i></p>
                                <p>(Solo se toman en cuenta cobros en Soles)</p>
                            </div>
                        </section>
                    </section>

                    <button className="btn-secondary ml-3 mt-6 txt-n-icon" onClick={handleLogout}>
                        <MdLogout />
                        Cerrar sesión
                    </button>
                </>
            }

            <Modal isOpen={isOpen} closeModal={close}>
                <ChangePassword close={close} />
            </Modal>

        </div>
    )
}

export default Profile