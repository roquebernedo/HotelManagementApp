import React, { useState } from 'react'
import { Outlet, useNavigate } from 'react-router-dom';
import useUser from '@/hooks/useUser';
import NavList from './NavList';
import SwitchTheme from './SwitchTheme';
import NavUser from './NavUser';
import NavMobile from './mobile/NavMobile';
import UserMobile from './mobile/UserMobile';
import { isMobile } from '@/utils/isMobile';
import { MdMenu } from 'react-icons/md'

const Navbar = () => {
    const { user } = useUser()
    const navigate = useNavigate()
    const mobile = isMobile()
    const [expanded, setExpanded] = useState(!mobile)

    return (
        <>
            {mobile && user?.id
                ? <>
                    <button onClick={() => setExpanded(!expanded)}
                        className={`btn-icon fixed top-6 left-5 z-30`}>
                        <MdMenu />
                    </button>

                    <nav className={`h-screen fixed top-0 w-14 ${expanded ? 'left-0' : '-left-12'} flex flex-col pt-16 pb-4 justify-between items-center transition-all`}>
                        <NavMobile closeBar={() => setExpanded(false)} />

                        <UserMobile />
                    </nav>
                </>
                : <nav className={`w-48 h-screen text-lg fixed top-0 left-0 flex flex-col justify-between items-center ${user?.id ? '' : 'hidden'} border-r border-r-gray-400 dark:border-r-slate-800`}>

                    <div className='flex flex-col gap-4 w-full pt-4'>
                        {/* <h2  className='mx-auto logo-font cursor-pointer'>Piso Blanco</h2> */}
                        <div onClick={() => navigate('/')} className='px-10 pb-4'>
                            <div className='flex flex-col justify-center items-center text-center font-poppins font-medium text-[20px] leading-[0.9]'>
                                PISO
                                <span className="font-bebas text-[20px] tracking-[4px] font-normal">
                                    BLANCO
                                </span>
                            </div>
                        </div>

                        <NavList />
                    </div>

                    <div className='w-full flex flex-col pb-6'>
                        <NavUser />
                        <SwitchTheme />
                    </div>
                </nav>
            }


            <div className={`${expanded ? '' : '-ml-12'} transition-all`}>
                <Outlet />
            </div>
        </>
    )
}

export default Navbar