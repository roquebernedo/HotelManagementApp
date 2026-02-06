import React, { useEffect, useRef, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import useClients from '@/hooks/useClients'
import useRooms from '../../hooks/useRooms'
import useReservations from '@/hooks/useReservations'
import PreReservForm from '@/components/common/forms/PreReservForm'
import ReservationClientPreview from '@/components/common/forms/ReservationClientPreview'
import ReservForm from '@/components/common/forms/ReservForm'
import ReservPreview from '@/components/common/forms/ReservPreview'
import { createSubmit } from '@/utils/handlers/clientSubmitHandlers'
import { createReserv, updateReserv, validateValues } from '@/utils/handlers/reservSubmitHandlers'
import { useNotifications } from 'reapop';
import Spinner from '../common/misc/Spinner'


const CreateReservation = ({ panelData = false, cb }) => {
    /* //? data may be: checkin, checkout and room selected from de reservation panel
        {
            checkin: '', <== deformatedDate
            checkout: '', <== deformatedDate
            room: '' <== room ID
        }
    */
    const { id } = useParams()
    const navigate = useNavigate()
    const { rooms } = useRooms()
    const { clients, setClients } = useClients()
    const { reservations, setReservations } = useReservations(id)
    const [loading, setLoading] = useState(false)
    const [editData, setEditData] = useState(false)
    const [client, setClient] = useState(false)
    const [preview, setPreview] = useState(false)
    const [errors, setErrors] = useState(false)
    const guest = useRef(null)
    const { notify } = useNotifications()
    console.log(id)
    console.log(rooms)
    console.log(preview)
    // if ID, load edit data
    useEffect(() => {
        console.log("esta en el ID")
        if (id && !panelData) {
            console.log(id)
            setLoading(() => true)
            const data = reservations.find(r => r.id === id)
            if (data) {
                setEditData(() => data)
                const clientData = clients.find(c => c?.id === data?.client.id)
                clientData && setClient(() => ({
                    id: clientData.id,
                    name: clientData.name,
                    email: clientData.email,
                    telephone: clientData.telephone,
                    vehicleType: clientData.vehicleType,
                    nationality: clientData.nationality
                }))
            } else notify('Reserva no encontrada.', 'error')
            setLoading(() => false)
        }
        // eslint-disable-next-line
    }, [id])

    // Client
    const afterCreation = (res) => {
        // mutates swr cache
        setClients(res.clientList)
        // takes new user id for reserv form
        setClient(() => ({
            id: res.newClient.id,
            name: res.newClient.name,
            email: res.newClient.email,
            telephone: res.newClient.telephone,
            vehicleType: res.newClient.vehicleType,
            nationality: res.newClient.nationality
        }))
    }

    // Reserv
    const afterValidate = (reserv) => {
        if (!client.id) {
            setErrors(() => ({ ...errors, client: 'Selecciona o registra un huesped' }))
            guest.current.scrollIntoView({
                behavior: "smooth",
                block: "center",
                inline: "nearest",
            });
            return
        }

        const data = {
            client: client?.id,
            ...reserv
        }
        console.log(data)
        setPreview(() => data)
    }

    const handleSubmit = async () => {
        console.log("entra")
        setLoading(() => true)
        console.log(id)
        console.log(rooms)
        console.log(preview)
        const fetcher = (id && !panelData) ? updateReserv : createReserv

        const res = await fetcher(preview, id)
        console.log(res)
        setErrors(() => res?.errors)

        if (!res.errors) {
            notify(res.message, 'success')
            // mutates reservations cache
            setReservations(res.reservationsList)
            panelData
                ? cb()
                : navigate('/reservations')
        }
        setLoading(() => false)
    }

    const backToEdit = () => {
        setErrors(() => (false))
        setPreview(() => false)
    }

    return (
        <div className='reserv-container'>
            {loading
                ? <div className='spinner-container'>
                    <Spinner />
                </div>
                : <>
                    <p className='text-2xl'>Registrar reserva</p>

                    <section ref={guest} className={preview ? 'hidden' : ''}>
                        <p>Huesped</p>
                        {errors?.client && <p className='error'>{errors.client}</p>}
                        <PreReservForm setClient={setClient} handler={createSubmit} cb={afterCreation} />
                    </section>

                    {client &&
                        <section className={preview ? 'hidden' : ''}>
                            <ReservationClientPreview client={client} cb={afterCreation} />
                        </section>}

                    <section className={preview ? 'hidden' : ''}>
                        <p>Reserva</p>
                        <ReservForm handler={validateValues} cb={afterValidate} edit={editData} panelData={panelData} />
                    </section>

                    {preview &&
                        <section>
                            <p>Resumen</p>
                            <ReservPreview preview={preview} back={backToEdit} client={client.name} room={rooms.find(c => c.id === preview.room).name} handler={handleSubmit} />
                        </section>}

                </>}
            {errors?.someError && <p className='error whitespace-normal'>{errors.someError}</p>}
        </div>
    )
}

export default CreateReservation