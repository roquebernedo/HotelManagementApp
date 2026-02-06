import useCurrentPath from '@/hooks/useCurrentPath';
import useUser from '@/hooks/useUser';
import React from 'react'
import { MdPerson, MdPermIdentity, MdToday, MdOutlineToday, MdHome, MdAttachMoney, MdMonetizationOn, MdOutlineLocalPolice, MdLocalPolice, MdOutlineHome, MdOutlineHolidayVillage, MdHolidayVillage } from 'react-icons/md';
import { useNavigate } from 'react-router-dom'

const NavList = () => {
    const navigate = useNavigate()
    const { admin } = useUser()
    const path = useCurrentPath()
    console.log(admin)
    
    return (
        <ul className='navList w-full'>
            <li onClick={() => navigate('/')}
                className={`${path === '/' ? 'dark:text-white bg-neutral-200 dark:bg-slate-800' : 'text-gray-400'}`}>
                {path === '/'
                    ? <MdHome className='dark:text-white' />
                    : <MdOutlineHome className='text-gray-400' />}
                Home
            </li>

            <li onClick={() => navigate('/clients')}
                className={`${path.includes('/clients') ? 'dark:text-white bg-neutral-200 dark:bg-slate-800' : 'text-gray-400'}`}>
                {path.includes('/clients')
                    ? <MdPerson className='dark:text-white' />
                    : <MdPermIdentity className='text-gray-400' />}
                Clientes
            </li>

            <li onClick={() => navigate('/reservations')}
                className={`${path.includes('/reservations') ? 'dark:text-white bg-neutral-200 dark:bg-slate-800' : 'text-gray-400'}`}>
                {path.includes('/reservations')
                    ? <MdToday className='dark:text-white' />
                    : <MdOutlineToday className='text-gray-400' />}
                Reservas
            </li>

            <li onClick={() => navigate('/rooms')}
                className={`${path.includes('/rooms') ? 'dark:text-white bg-neutral-200 dark:bg-slate-800' : 'text-gray-400'}`}>
                {path.includes('/rooms')
                    ? <MdHolidayVillage className='dark:text-white' />
                    : <MdOutlineHolidayVillage className='text-gray-400' />}
                Cuartos
            </li>

            <li onClick={() => navigate('/expenses')}
                className={`${path.includes('/expenses') ? 'dark:text-white bg-neutral-200 dark:bg-slate-800' : 'text-gray-400'}`}>
                {path.includes('/expenses')
                    ? <MdMonetizationOn className='dark:text-white' />
                    : <MdAttachMoney className='text-gray-400' />}
                Cuentas
            </li>

            {admin && <li onClick={() => navigate('/admin')}
                className={`${path.includes('/admin') ? 'text-orange-500 bg-neutral-200 dark:bg-slate-800' : 'text-gray-400'}`}>
                {path.includes('/admin')
                    ? <MdLocalPolice className='text-orange-500' />
                    : <MdOutlineLocalPolice className='text-gray-400' />}
                Admin
            </li>}
        </ul>
    )
}

export default NavList