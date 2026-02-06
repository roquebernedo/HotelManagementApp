import React from 'react'
import RoomForm from '../common/forms/RoomForm'
import { createRoomSubmit, editRoomSubmit } from '@/utils/handlers/roomSubmitHandler'
import { useNavigate, useParams } from 'react-router-dom'
import useRooms from '@/hooks/useRooms'
import { useNotifications } from 'reapop';

const CreateRoom = () => {
    const { id } = useParams()
    const navigate = useNavigate()
    const { setRooms } = useRooms()
    const { notify } = useNotifications()

    const cb = (res) => {
        notify(res.message, 'success')
        setRooms(res.roomsList)
        navigate('/rooms/')
    }
    console.log(id)

    return (
        <>
            <h1>{id ? 'Editar' : 'Crear'} Cabaña</h1>
            <RoomForm handler={id ? editRoomSubmit : createRoomSubmit} cb={cb} />
        </>
    )
}

export default CreateRoom