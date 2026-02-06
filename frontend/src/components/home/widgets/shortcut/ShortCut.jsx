import React, { useRef } from 'react'
import { useNavigate } from 'react-router-dom'

const ShortCut = ({ title, to, icon, external = false }) => {
    const navigate = useNavigate()
    const externalLink = useRef(null)

    return (
        <div className='w-full h-24 flex justify-center items-center cursor-pointer hover:brightness-125 rounded-lg overflow-clip'
            onClick={() => external ? externalLink.current.click() : navigate(to)}>

            <div className='txt-n-icon text-4xl sm:text-2xl font-medium dark:short-cut'>
                {icon && icon}
                <p className='hidden sm:flex'>{title}</p>
            </div>
            {external && <a ref={externalLink} className='hidden' href={to} target='_blank' rel="noreferrer">externa link</a>}
        </div>
    )
}

export default ShortCut