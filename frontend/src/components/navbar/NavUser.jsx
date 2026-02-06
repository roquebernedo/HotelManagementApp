import useUser from '@/hooks/useUser';
import React from 'react'
import { MdAccountCircle } from 'react-icons/md';
import { useNavigate } from 'react-router-dom';

const NavUser = () => {
    // const [profileMenu, setProfileMenu] = useState(false)
    const { user } = useUser()
    const navigate = useNavigate()

    // const handleLogout = () => {
    //     navigate('/login')
    //     mutate(['/user/login', getCookie('userToken')], false)
    //     deleteCookie('userToken')
    // }

    // onMouseEnter = {() => setProfileMenu(true)}
    // onMouseLeave = {() => setProfileMenu(false)}

    // className='flex items-center relative w-full h-4 px-1 cursor-pointer hover:font-semibold'>
    return (
        <div className='flex flex-col'>
            <div onClick={() => navigate('/user')}
                className='txt-n-icon pl-7 py-2 gap-4 w-full cursor-pointer hover:text-blue-400 
        hover:dark:text-white hover:bg-neutral-200 hover:dark:bg-slate-800'>
                <MdAccountCircle />
                <p className='ellipsis capitalize'>{user?.user_name?.split(' ')[0] || 'Usuario'}</p>
                {/* <NavMenu visible={profileMenu} logout={handleLogout} /> */}
            </div>
        </div>
    )
}

export default NavUser