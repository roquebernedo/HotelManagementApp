import React, { useState } from 'react'
import { role } from '@/components/admin/adminHandlers';
import { useNotifications } from 'reapop';
import Spinner from '@/components/common/misc/Spinner';

const Role = ({ id, close, mutate }) => {
    const [loading, setLoading] = useState(false)
    const { notify } = useNotifications()

    const submit = async (e) => {
        console.log("entro al role")
        e.preventDefault()
        setLoading(() => true)
        const [{ value }] = e.target
        console.log(value)
        if (value) {
            console.log("tamos en value")
            const res = await role(id, value)
                .catch(err => {
                    notify(err.message, 'error')
                    console.log(err)
                    console.warn(err?.message)
                })
            console.log(res)
            if (res?.usersList) {
                console.log("llego al role")
                notify(res.message, 'success')
                mutate(res.usersList)
                setLoading(() => false)
            }
            close()
        }
    }

    return (
        <form onSubmit={submit} className='relative grid grid-col grid-cols-2 gap-4 w-fit'>

            <span className='col-span-2'>
                <p>Selecciona un rol:</p>

                <select id='role-select' name="role-select" defaultValue='' required className='w-full' >
                    <option disabled={true} value="" className='text-gray-500'>roles</option>
                    <option value={'staff'}>Staff</option>
                    <option value={'demote'}>Quitar rol</option>
                    <option disabled={true} value=""></option>
                    <option value={'admin'} className='text-orange-500'>Admin</option>
                </select>
            </span>

            <button type='button' onClick={close} className="btn-admin-s">cancelar</button>
            <button type='submit' className="btn-admin-p">guardar</button>

            {loading && <Spinner />}

        </form>
    )
}

export default Role