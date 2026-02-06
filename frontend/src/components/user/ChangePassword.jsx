import React, { useState } from 'react'
import { useNotifications } from 'reapop'
import Spinner from '../common/misc/Spinner'
import { password } from './userHandlers'

const ChangePassword = ({ close }) => {
    const [error, setError] = useState(false)
    const [loading, setLoading] = useState(false)
    const { notify } = useNotifications()

    const submit = async (e) => {
        e.preventDefault()
        const [{ value: oldPW }, { value: newPW }, { value: pw }] = e.target
        if (newPW === pw) {
            setLoading(() => true)
            const res = await password(oldPW, newPW)
                .catch(err => ({ error: err.message }))

            if (!res?.error) {
                notify(res.message, 'success')
                setLoading(() => false)
                close()
            } else {
                notify(res?.error, 'error')
            }
            setLoading(() => false)
        } else {
            setError(() => 'Las contraseñas no coinciden.')
        }
    }

    return (
        <form onSubmit={submit} autoComplete='off' className='relative grid grid-col grid-cols-4 gap-4 p-8 w-fit'>
            <span className='col-span-4'>
                <p>Introduce tu contraseña actual:</p>
                <input type="password" autoComplete="new-password"
                    required className='w-full' />
            </span>
            <span className='col-span-4'>
                <p>Introduce una nueva contraseña:</p>
                <input type="password" autoComplete="new-password"
                    required className='w-full' />
            </span>
            <span className='col-span-4'>
                <p>Repite la contraseña:</p>
                <input type="password" autoComplete="new-password"
                    required className='w-full' />
                <p className='error'>{error || ' '}</p>
            </span>
            <button type='button' onClick={close} className="btn-secondary col-span-2">cancelar</button>
            <button type='submit' className="btn-primary col-span-2">guardar</button>

            {loading && <Spinner />}

        </form>
    )
}

export default ChangePassword