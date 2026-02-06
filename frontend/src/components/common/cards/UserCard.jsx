import React from 'react'
import { MdVpnKey, MdEmail, MdGppBad, MdGppGood, MdPersonOff, MdDoubleArrow } from 'react-icons/md';

const UserCard = ({ user, handler }) => {

    const change = (e) => {
        console.log(e.target.id)
        console.log(user.id)
        handler(e.target.id, user.id)
    }

    const roleColor = {
        master: 'text-rose-500',
        admin: 'text-orange-500',
        staff: 'text-blue-500',
    }

    return (
        <div key={user?.id} className='flex flex-col justify-between border border-slate-800 rounded-md'>

            <section className='grid p-6'>
                <div className='text-xl capitalize '>
                    <b>
                        {user?.user_name}
                    </b>
                    <i className='text-gray-500 dark:text-gray-600 text-sm ml-2'>ID: {user.id}</i>
                </div>

                <p className='txt-n-icon cursor-pointer capitalize admin-acount-status'
                    onClick={change} id='role'>
                    <MdDoubleArrow className={`text-lg rotate-90 ${user?.role ? roleColor[user?.role] : 'text-gray-400 dark:text-gray-600'}`} />
                    {user?.role || 'Sin rol'}
                </p>

                <p className='txt-n-icon cursor-pointer admin-acount-status'
                    onClick={change} id='email'>
                    <MdEmail />
                    {user?.email}
                </p>

                {user?.approved
                    ? <p className='txt-n-icon admin-acount-status text-emerald-500' onClick={change} id='approve'>
                        <MdGppGood />
                        Cuenta autorizada
                    </p>
                    : <p className='txt-n-icon admin-acount-status text-rose-500' onClick={change} id='approve'>
                        <MdGppBad />
                        Cuenta no autorizada
                    </p>}

            </section>

            <section className='flex gap-2 w-full p-4 bg-gray-200 dark:bg-slate-800/50'>
                <button className='btn-admin-p txt-n-icon justify-center'
                    onClick={change} id='password'>
                    <MdVpnKey />
                    Cambiar contraseña
                </button>
                <button className='btn-admin-s txt-n-icon justify-center'
                    onClick={change} id='delete-user'>
                    <MdPersonOff />
                    Eliminar usuario
                </button>
            </section>

        </div>
    )
}

export default UserCard