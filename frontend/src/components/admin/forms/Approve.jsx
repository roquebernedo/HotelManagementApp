import React, { useState } from 'react'
import { approve } from '@/components/admin/adminHandlers'
import { useNotifications } from 'reapop'
import ButtonSpinner from '@/components/common/misc/ButtonSpinner'

const Approve = ({ id, value, close, mutate }) => {
    const [loading, setLoading] = useState(false)
    const { notify } = useNotifications()

    const submit = async () => {
        setLoading(() => true)
        const res = await approve(id, value)
            .catch(err => {
                notify(err?.message, 'error')
                console.warn(err?.message);
            })

        if (res?.usersList) {
            notify(res.message, 'success')
            mutate(res.usersList)
            setLoading(() => false)
        }
        close()
    }

    return (
        <div className='relative grid grid-col grid-cols-4 gap-4 w-fit'>
            <span className='col-span-4'>
                {value
                    ? <p>¿Autorizar cuenta?</p>
                    : <p>¿Deseas revocar la autorización de esta cuenta?</p>
                }
            </span>

            <button type='button' onClick={close} className="btn-admin-s col-span-2">Cancelar</button>
            <ButtonSpinner loading={loading} cb={submit} type='submit' inlineStyle='col-span-2' text='Continuar' admin />

        </div>
    )
}

export default Approve