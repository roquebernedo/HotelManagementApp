import useRooms from '@/hooks/useRooms'
import useLoadEditData from '@/hooks/useLoadEditData'
import React, { useState } from 'react'
import { useParams } from 'react-router-dom'
import { useNotifications } from 'reapop'
import ButtonSpinner from '../misc/ButtonSpinner'

const RoomForm = ({ handler, cb }) => {
    const { id } = useParams()
    const [errors, setErrors] = useState(false)
    const { rooms } = useRooms()
    const { notify } = useNotifications()
    const [loading, setLoading] = useState(false)

    // if ID, load edit data
    useLoadEditData(rooms)

    const handleSubmit = async (e) => {
        e.preventDefault()
        setLoading(() => true)

        // check uniqueness
        if (!id) { // if there is an ID, no need to check uniqueness
            let flag = false
            const name = document.getElementById('name').value,
                identifier = document.getElementById('identifier').value

            if (name && rooms.find(c => c.name === name)) {
                setErrors({ ...errors, name: 'El Nombre ya está en uso' })
                flag = true
            }
            if (identifier && rooms.find(c => c.identifier === identifier)) {
                setErrors({ ...errors, identifier: 'El Identificador ya está en uso' })
                flag = true
            }
            if (flag) {
                setLoading(() => false)
                return
            }
        }

        // all handlers need the event, only edit handlers need ID
        // however, always pass the ID
        const { res, errors: err } = await handler(e, id)
        if (err) {
            notify(err.message, 'error')
            console.warn(err?.message)
            setErrors(() => err)
            setLoading(() => false)
            return
        }
        if (!res.error) cb(res)
        else setErrors({ ...errors, someError: res.error })
        setLoading(() => false)
    }

    return (
        <>
            <form onSubmit={handleSubmit} autoComplete='off' className='grid grid-cols-4 gap-2 w-96 p-2'>
                {/*name*/}
                <label htmlFor='name' className='col-span-4'>
                    <p className='text-gray-500 pl-2'>Nombre</p>
                    <input type="text" id='name' name='name' placeholder='nombre' className='w-full' />
                    <div className='h-6 text-sm text-rose-500'>{errors?.name || ''}</div>
                </label>
                {/*identifier*/}
                <label htmlFor='identifier' className='col-span-4'>
                    <p className='text-gray-500 pl-2'>Identificador, versión resumida del nombre</p>
                    <input type="text" id='identifier' name='identifier' placeholder='ID' className='w-full' />
                    <div className='h-6 text-sm text-rose-500'>{errors?.identifier || ''}</div>
                </label>
                {/*capacity*/}
                <label htmlFor='capacity' className='col-span-4'>
                    <p className='text-gray-500 pl-2'>Capacidad del alojamiento</p>
                    <input type="number" id='capacity' name='capacity' placeholder='capacidad' className='w-full' />
                    <div className='h-6 text-sm text-rose-500'>{errors?.capacity || ''}</div>
                </label>

                <ButtonSpinner loading={loading} type='submit' inlineStyle={'col-start-2 col-span-2'} text={id ? 'Guardar' : 'Crear'} />
            </form>
            {errors.someError && <b>error: {errors.someError}</b>}
        </>
    )
}

export default RoomForm