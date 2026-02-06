import React, { useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import useClients from '@/hooks/useClients'
import { deleteApi } from '@/services/api'
import ClienDetailsCard from '@/components/common/cards/ClientDetailsCard'
import { MdDelete, MdEdit } from 'react-icons/md';
import useUser from '@/hooks/useUser'
import { useNotifications } from 'reapop';
import useModal from '@/hooks/useModal'
import Modal from '@/utils/Modal'
import Loading from '../common/misc/Loading'
import Spinner from '../common/misc/Spinner'
import ClientReservations from './ClientReservations'

const ClientDetails = () => {
    const { id } = useParams()
    const { admin } = useUser()
    const { clients, error, setClients, isLoading } = useClients()
    const [loading, setLoading] = useState(false)
    const client = clients ? clients.find(u => u.id === id) : false
    const [isOpen, open, close] = useModal()
    const { notify } = useNotifications()

    const navigate = useNavigate()

    const handleDelete = async () => {
        setLoading(() => true)
        const res = await deleteApi(`/client?id=${id}`).catch(err => {
            notify(err?.message, 'error')
            console.warn(err?.message)
        })

        if (!res.error) {
            notify(res.message, 'success')
            setClients(res.clientList)
            navigate('/clients')
        }
        setLoading(() => false)
    }

    const handleEdit = () => {
        navigate(`/clients/edit/${id}`)
    }

    return (
        <>
            {isLoading &&
                <div className='relative h-1 mb-2'>
                    <span className='loading-container'>
                        <Loading />
                    </span>
                </div>}
            {error && <p>error</p>}

            {client &&
                <div className='p-2 my-1 relative border border-slate-200 dark:border-slate-700 rounded-lg'>
                    <ClienDetailsCard user={client} />

                    {admin && <>
                        <button className='btn-icon absolute top-8 right-20' onClick={handleEdit}>
                            <MdEdit />
                        </button>
                        <button className='btn-icon absolute top-8 right-9' onClick={open}>
                            <MdDelete />
                        </button>
                    </>}

                    <ClientReservations id={client.id} />
                </div>}

            <Modal isOpen={isOpen} close={close}>
                {<div className='relative grid grid-col grid-cols-4 gap-4 w-fit'>
                    <span className='col-span-4'>
                        <p>¿Seguro deseas eliminar este cliente?</p>
                        <p>Esta acción es <b>irreversible</b> y puede traer problemas en otras secciones.</p>
                    </span>

                    <button type='button' onClick={close} className="btn-admin-s col-span-2">Cancelar</button>
                    <button type='submit' onClick={handleDelete} className="btn-admin-p col-span-2">Continuar</button>

                    {loading && <Spinner />}

                </div>}
            </Modal>
        </>
    )
}

export default ClientDetails