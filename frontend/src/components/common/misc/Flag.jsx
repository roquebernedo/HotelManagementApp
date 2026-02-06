import { flag } from '@/utils/country'
import React from 'react'

const Flag = ({ code }) => {
    const URL = flag(code)

    return (
        URL
            ? <img src={URL} width={20} alt='flag' className='flag' />
            : null
    )
}

export default Flag