import React from 'react'

const Login = ({ handler, error, password, signIn }) => {
    return (
        <form onSubmit={handler} className='flex flex-col gap-8 fade-in'>

            <label htmlFor="login-email" className='flex flex-col gap-2'>
                <p>Email o usuario</p>
                <input required type="text" id='login-email' className='text-black' />
            </label>

            <label htmlFor="login-pw" className='flex flex-col gap-2'>
                <p>Contraseña</p>
                <input required type="password" className='text-black' id='login-pw' />
                <button type='button' onClick={password} className='btn-tertiary'>Recuperar contraseña</button>
            </label>

            <section className='flex flex-col gap-2 -mt-6'>
                <div className='h-6'>
                    {(error) && <p className='text-red-400'>{error || 'Hubo un error'}</p>}
                </div>
                <button type="submit" className='btn-primary'>Log in</button>
            </section>

            <span className='txt-n-icon'>
                ¿Necesitas cuenta?
                <button type='button' className='btn-tertiary' onClick={signIn}>Crear cuenta</button>
            </span>

        </form>
    )
}

export default Login