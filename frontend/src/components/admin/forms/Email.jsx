import React, { useState } from 'react'
import { email, } from '@/components/admin/adminHandlers';
import { useNotifications } from 'reapop';
import ButtonSpinner from '@/components/common/misc/ButtonSpinner';

const Email = ({ id, close, mutate }) => {
    const [loading, setLoading] = useState(false)
    const { notify } = useNotifications()

    const submit = async (e) => {
        e.preventDefault()
        const [{ value }] = e.target
        if (value) {
            setLoading(() => true)
            const res = await email(id, value)
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
        }
    }

    return (
        <form onSubmit={submit} className='relative grid grid-col grid-cols-4 gap-4 w-fit'>
            <span className='col-span-4'>
                <p>Introduce un nuevo email:</p>
                <input type="email" required className='w-full' />
            </span>
            <button type='button' onClick={close} className="btn-admin-s col-span-2">cancelar</button>
            <ButtonSpinner loading={loading} cb={submit} type='submit' inlineStyle='col-span-2' text='guardar' admin />

        </form>
    )
}

export default Email