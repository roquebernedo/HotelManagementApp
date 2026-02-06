import React from 'react'

const LoginMessage = ({ message, back }) => {
    return (
        <div className='fade-in'>
            <p className='text-2xl'>Perfecto!</p>
            <p className='my-2'>{message}</p>
            <button className='btn-tertiary' onClick={back}>vovler</button>
        </div>
    )
}

export default LoginMessage