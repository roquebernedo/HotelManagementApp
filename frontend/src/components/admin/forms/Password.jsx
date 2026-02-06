import React, { useState } from 'react'
import { password } from '@/components/admin/adminHandlers';
import { useNotifications } from 'reapop';
import Spinner from '@/components/common/misc/Spinner';

const Password = ({ id, close, mutate }) => {
    const [error, setError] = useState(false)
    const [loading, setLoading] = useState(false)
    const { notify } = useNotifications()

    const submit = async (e) => {
        e.preventDefault()
        const [{ value }, { value: pw }] = e.target
        if (value === pw) {
            setLoading(() => true)
            const res = await password(id, value)
                .catch(err => {
                    notify(err.message, 'error')
                    console.warn(err?.message);
                })

            if (res?.usersList) {
                notify(res.message, 'success')
                mutate(res.usersList)
                setLoading(() => false)
            }
            close()
        } else {
            setError(() => 'Las contraseñas no coinciden.')
        }
    }

    return (
        <form onSubmit={submit} className='relative grid grid-col grid-cols-4 gap-4 w-fit'>
            <span className='col-span-4'>
                <p>Introduce una nueva contraseña:</p>
                <input type="password" required className='w-full' />
            </span>
            <span className='col-span-4'>
                <p>Repite la contraseña:</p>
                <input type="password" required className='w-full' />
                <p className='error'>{error || ' '}</p>
            </span>
            <button type='button' onClick={close} className="btn-admin-s col-span-2">cancelar</button>
            <button type='submit' className="btn-admin-p col-span-2">guardar</button>

            {loading && <Spinner />}

        </form>
    )
}

export default Password