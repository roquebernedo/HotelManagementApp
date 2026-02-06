import React, { useState } from 'react'
import { MdKeyboardTab } from 'react-icons/md'

const QuickSearchCard = ({ data, createReserv }) => {
    const [expand, setExpand] = useState(false)

    return (
        <div onClick={() => createReserv(data.id)}
            onMouseEnter={() => setExpand(true)}
            onMouseLeave={() => setExpand(false)}
            className='capitalize admin-acount-status txt-n-icon'>
            <span className={`flex items-center h-5 ${expand ? 'min-w-10 px-2 ml-2 opacity-100' : 'w-0 px-0 opacity-0'} overflow-hidden bg-rose-600 rounded-lg transition-all text-white`}>
                <MdKeyboardTab />
            </span>
            {data.name}
        </div>
    )
}

export default QuickSearchCard