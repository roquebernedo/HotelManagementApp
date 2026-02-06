import React, { useEffect, useState } from 'react'
import Switch from '../common/misc/Switch'
import { MdLightMode, MdDarkMode } from 'react-icons/md';
import { toggleTheme } from '@/utils/toggleTheme';

const SwitchTheme = () => {
    // const { } = useLocation()
    const [theme, setTheme] = useState(null)
    console.log(localStorage.theme)
    useEffect(() => {
        if (localStorage.theme === 'light') setTheme(true)
        else setTheme(false)
    }, [])

    const handleToggle = () => {
        toggleTheme()
        setTheme(!theme)
    }

    return (
        <div className='pl-6'>
            {theme !== null &&
                <Switch options={[<MdDarkMode />, <MdLightMode />]}
                    state={theme} cb={handleToggle} />}
        </div>
    )
}

export default SwitchTheme