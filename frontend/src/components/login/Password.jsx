import React from 'react'

const Password = ({ handler, back }) => {
    return (
        <form onSubmit={handler} className='flex flex-col gap-8 fade-in'>

            <label htmlFor="login-email" className='flex flex-col gap-2'>
                <p>Email asociado a tu cuenta</p>
                <input placeholder='email' required type="email" id='pw-change-email' />
            </label>

            <section className='flex flex-col gap-2'>
                <button type="submit" className='btn-primary'>Enviar</button>
            </section>

            <button type='button' className='btn-tertiary' onClick={back}>volver</button>
        </form>
    )
}

export default Password