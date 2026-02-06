import React, { useEffect, useState } from 'react'

const Switch = ({ options, cb, state = false }) => {
    const [on, setOn] = useState(state)
    const [A, B] = options
    console.log(A)
    console.log(B)
    const C = options.length === 1 && A
    console.log(C)

    useEffect(() => {
        setOn(() => state)
    }, [state])


    const handler = () => {
        setOn(() => !on)
        cb()
    }

    return (
        <div className='h-10 flex items-center'>
            <div onClick={handler} className='switch-input cursor-pointer'>
                {!C && <div className='mr-1'>
                    <p className={on ? 'text-gray-400 dark:text-gray-500' : 'font-semibold'}>{A}</p>
                </div>}

                <div className='w-5 mx-4 relative'>
                    <div className={`switch-indicator ${on ? 'ml-4' : `-ml-4 `}`}></div>
                    <span></span>
                </div>

                {(!C && B) && <div className='ml-1'>
                    <p className={on ? 'font-semibold' : 'text-gray-400 dark:text-gray-500'}>{B}</p>
                </div>}
                {C && <div className='ml-1'>
                    <p className={on ? 'font-semibold' : 'text-gray-400 dark:text-gray-500'}>{C}</p>
                </div>}
            </div>
        </div>
    )
}

export default Switch