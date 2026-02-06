import { isMobile } from '@/utils/isMobile'
import React from 'react'

const Header = ({ title, sections, section, setSection, admin = false, button = false }) => {
    const mobile = isMobile()

    return (
        <header className={`relative grid  ${mobile ? 'pl-10 grid-cols-3' : 'grid-cols-5'} border-b z-10 ${admin ? 'border-b-orange-500' : 'border-b-gray-400 dark:border-b-slate-700'}`}>
            {!mobile && <h1 className={`txt-n-icon col-span-6 capitalize`}>{title}</h1>}

            {/* {button && button} */}

            {!!sections.length &&
                sections.map((s, i) => (
                    <button key={'option' + i} className={`panel-opt  ${section === i ? `text-slate-900 dark:text-white ${admin ? 'bg-orange-500' : 'bg-gray-400 dark:bg-slate-800'} rounded-t-sm` : `${admin ? 'hover:text-orange-500' : 'hover:text-white'}`}`} onClick={() => setSection(i)}>
                        {s}
                    </button>
                ))
            }

            {button &&
                <>
                    {mobile
                        ? <div className='relative -top-8 -right-4 -mt-2'>
                            {button}
                        </div>
                        : button
                    }
                </>
            }

        </header>
    )
}

export default Header