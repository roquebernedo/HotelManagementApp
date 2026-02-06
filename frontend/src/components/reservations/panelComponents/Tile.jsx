import React, { useEffect, useState } from 'react'

const Tile = ({ mode, creating, disabled = false, cb }) => {
    const [active, setActive] = useState(false)
    const [head, setHead] = useState(false)
    const [tail, setTail] = useState(true)

    useEffect(() => {
        if (!mode) {
            setActive(() => false)
            setHead(() => false)
            setTail(() => false)
        }
    }, [mode])

    const hover = () => {
        setActive(() => true)
        setTail(() => true)
        cb()
    }
    const click = () => {
        setHead(() => true)
        setTail(() => true)
        setActive(() => true)
    }
    const leave = () => {
        !creating && setTail(() => false)
    }

    return (
        < div onMouseEnter={mode ? hover : null} onMouseDown={click} onMouseLeave={leave}
            className={`h-full w-1/2 flex ${active ? '' : 'hover:bg-slate-500/20'} ${disabled ? 'pointer-events-none' : ''}`}>
            <div className={`h-10 my-auto w-full  ${active ? 'bg-blue-300' : ''} ${head ? 'rounded-l-full' : ''} ${tail ? 'rounded-r-full' : ''}`}></div>
        </div>
    )
}

export default Tile