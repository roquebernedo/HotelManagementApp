import React, { useEffect, useState } from 'react'

const Tile = ({ mode, creating, disabled = false, cb, length }) => {
    const [active, setActive] = useState(false)

    useEffect(() => {
        if (!mode) {
            setActive(() => false)
        }
    }, [mode])

    const hover = () => {
        cb()
    }
    const click = () => {
        setActive(() => true)
    }

    return (
        < div onMouseEnter={mode ? hover : null} onMouseDown={click}
            className={`h-full w-full flex ${active ? '' : 'hover:bg-slate-500/20'} ${disabled ? 'pointer-events-none' : ''}`}>

            {active &&
                <div style={{ width: `${length}rem` }}
                    className={`h-10 rounded-3xl bg-blue-400 absolute top-1 left-14 z-10 pointer-events-none transition-all`}>
                </div>}
        </div>
    )
}

export default Tile