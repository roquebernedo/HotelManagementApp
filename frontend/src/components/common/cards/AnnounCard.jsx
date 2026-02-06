import React, { useState } from 'react'
import { MdInfoOutline, MdWarningAmber, MdOutlineDangerous, MdOutlineBuildCircle, MdOutlineCircleNotifications } from 'react-icons/md';

const AnnounCard = ({ data }) => {
    const {
        title,
        text,
        style,
        from
    } = data

    const icon = {
        info: <MdInfoOutline className='text-xl' />,
        warn: <MdWarningAmber className='text-xl' />,
        danger: <MdOutlineDangerous className='text-xl' />,
        fix: <MdOutlineBuildCircle className='text-xl' />,
        default: <MdOutlineCircleNotifications className='text-xl' />,
    }
    const color = {
        info: 'bg-sky-500',
        warn: 'bg-yellow-400',
        danger: 'bg-rose-500',
        fix: 'bg-emerald-500',
        default: 'bg-neutral-200'
    }

    const [expanded, setExpanded] = useState(false)

    return (
        <div onClick={() => setExpanded(() => !expanded)}
            className={`announcement ${style ? style : 'default'} h-fit`}>

            <div className='txt-n-icon relative min-w-max max-w-max mb-auto mr-2'>
                <div className='relative'>
                    {icon[style || 'default']}
                    <span className={`animate-ping absolute top-1 left-1 inline-flex h-3 w-3 rounded-full ${color[style || 'default']} opacity-90`}></span>
                </div>
                <b>{title ? title + ':' : ''}</b>
            </div>
            <span className={`${expanded ? '' : 'ellipsis'}`} >
                {text}
            </span>
            {from && <i className='absolute bottom-1 right-2 text-sm opacity-60 capitalize'>{from}</i>}
        </div >
    )
}

export default AnnounCard