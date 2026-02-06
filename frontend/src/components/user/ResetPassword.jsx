import React, { useState } from 'react'
import { editApi } from '@/services/api'
import { useNavigate, useSearchParams } from 'react-router-dom'
import useValidateToken from '@/hooks/useValidate'
import { useNotifications } from 'reapop';

const ResetPassword = () => {
    const navigate = useNavigate()
    const [searchParams] = useSearchParams({})
    const token = searchParams.get('token')
    const [errors, setErrors] = useState(false)
    const { notify } = useNotifications()

    !token && navigate('/')

    const { data, error, isLoading } = useValidateToken()

    // PUT /user/newPassword { t, newPassword }
    const handleSubmit = async (e) => {
        e.preventDefault()
        const [{ value: password }, { value: newPassword }] = e.target

        if (password === newPassword) {
            const data = { newPassword, t: token }

            const res = await editApi(['/user/newPassword', data])

            if (res.message) {
                notify(res.message, 'success')
                navigate('/')
            } if (res.error) setErrors(() => res.error)

        } else {
            setErrors(() => 'Las contraseñas no coinciden')
        }
    }

    return (
        <>
            {!token
                ? <h1>No hay Token</h1>
                : <>
                    <h1>Restablecer contraseña</h1>
                    {isLoading && <h1>CARGANDO</h1>}
                    {(data?.error || error) &&
                        <>
                            <p>{data?.error || error?.response?.data?.error || error?.message || 'Hubo un error'}</p>
                            <button className='btn-tertiary'
                                onClick={() => navigate('/')}>
                                volver
                            </button>
                        </>}

                    {data &&
                        <form onSubmit={handleSubmit} className='flex flex-col gap-8'>

                            <label htmlFor="login-email" className='flex flex-col gap-2'>
                                <p>Nueva contraseña</p>
                                <input placeholder='Nueva contraseña' required type="password" id='new-password' />
                            </label>

                            <label htmlFor="login-email" className='flex flex-col gap-2'>
                                <p>Repite la contraseña</p>
                                <input placeholder='Nueva contraseña' required type="password" id='repeat-password' />
                            </label>

                            <section className='flex flex-col gap-2 -mt-2'>
                                <div className='h-6'>
                                    {(error || errors) && <p className='text-red-400'>{errors || error || 'Hubo un error'}</p>}
                                </div>
                                <button type="submit" className='btn-primary'>Confirmar</button>
                            </section>
                        </form>}
                </>}
        </>
    )
}

export default ResetPassword