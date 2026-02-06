import React from 'react'

const Signin = ({ handler, error, back }) => {
    return (
        <form onSubmit={handler} className='flex flex-col gap-8 fade-in'>

            <label htmlFor="signin-email" className='flex flex-col gap-2'>
                <p>Nombre</p>
                <input placeholder='nombre' required type="text" id='signin-name' />
            </label>

            <label htmlFor="signin-email" className='flex flex-col gap-2'>
                <p>Email</p>
                <input placeholder='email' required type="email" id='signin-email' />
            </label>

            <label htmlFor="login-email" className='flex flex-col gap-2'>
                <p>Contraseña</p>
                <input placeholder='contraseña' required type="password" id='pw-signin' />
            </label>

            <label htmlFor="login-email" className='flex flex-col gap-2'>
                <p>Repetir contraseña</p>
                <input placeholder='repetir contraseña' required type="password" id='repeat-pw-signin' />
            </label>

            <section className='flex flex-col gap-2 -mt-6'>
                <div className='h-6'>
                    {(error) && <p className='text-red-400'>{error || 'Hubo un error'}</p>}
                </div>
                <button type="submit" className='btn-primary'>Registrarme</button>
            </section>

            <button type='button' className='btn-tertiary' onClick={back}>volver</button>
        </form>
    )
}

export default Signin