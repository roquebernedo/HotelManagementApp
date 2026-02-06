import { isMobile } from '@/utils/isMobile'
import React from 'react'
import { AiOutlineLoading } from 'react-icons/ai'

const ButtonSpinner = ({ loading, text, icon, loadingText, cb, type = 'button', inlineStyle, admin }) => {
    const mobile = isMobile()

    return (
        <button type={type} disabled={loading} id='submit' onClick={() => cb ? cb() : null}
            className={`txt-n-icon ${admin ? 'btn-admin-p' : 'btn-primary'} justify-center w-full ${inlineStyle || ''}`}>
            {loading
                ? <>
                    <AiOutlineLoading className='text-lg animate-spin' />
                    {mobile ? '' : loadingText || ''}
                </>
                : <>
                    {icon || ''}
                    {(mobile && icon) ? '' : text}
                </>}
        </button>
    )
}

export default ButtonSpinner