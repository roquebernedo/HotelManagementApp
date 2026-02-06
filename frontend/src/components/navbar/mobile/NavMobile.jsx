import useCurrentPath from '@/hooks/useCurrentPath';
import useUser from '@/hooks/useUser';
import React from 'react'
import { MdPerson, MdPermIdentity, MdToday, MdOutlineToday, MdHome, MdAttachMoney, MdMonetizationOn, MdOutlineLocalPolice, MdLocalPolice, MdOutlineHome, MdOutlineHolidayVillage, MdHolidayVillage } from 'react-icons/md';
import { useNavigate } from 'react-router-dom'

const NavMobile = ({ closeBar }) => {
    const navigate = useNavigate()
    const { admin } = useUser()
    const path = useCurrentPath()

    return (
        <ul className='navMobile'>
            <li onClick={() => {
                closeBar()
                navigate('/')
            }}
                className={`${path === '/' ? 'dark:text-white' : 'text-gray-400'}`}>
                {path === '/'
                    ? <MdHome />
                    : <MdOutlineHome />}
            </li>

            <li onClick={() => {
                closeBar()
                navigate('/clients')
            }}
                className={`${path.includes('/clients') ? 'dark:text-white' : 'text-gray-400'}`}>
                {path.includes('/clients')
                    ? <MdPerson />
                    : <MdPermIdentity />}
            </li>

            <li onClick={() => {
                closeBar()
                navigate('/reservations')
            }}
                className={`${path.includes('/reservations') ? 'dark:text-white' : 'text-gray-400'}`}>
                {path.includes('/reservations')
                    ? <MdToday />
                    : <MdOutlineToday />}
            </li>

            <li onClick={() => {
                closeBar()
                navigate('/rooms')
            }}
                className={`${path.includes('/rooms') ? 'dark:text-white' : 'text-gray-400'}`}>
                {path.includes('/rooms')
                    ? <MdHolidayVillage />
                    : <MdOutlineHolidayVillage />}
            </li>

            <li onClick={() => {
                closeBar()
                navigate('/expenses')
            }}
                className={`${path.includes('/expenses') ? 'dark:text-white' : 'text-gray-400'}`}>
                {path.includes('/expenses')
                    ? <MdMonetizationOn />
                    : <MdAttachMoney />}
            </li>

            {admin && <li onClick={() => {
                closeBar()
                navigate('/admin')
            }}
                className={`${path.includes('/admin') ? 'text-orange-500' : 'text-gray-400'}`}>
                {path.includes('/admin')
                    ? <MdLocalPolice />
                    : <MdOutlineLocalPolice />}
            </li>}
        </ul>
    )
}

export default NavMobile