import React from 'react'
import { MdAccountCircle } from 'react-icons/md';
import { useNavigate } from 'react-router-dom';

const UserMobile = () => {
    const navigate = useNavigate()

    return (
        <div className='flex flex-col text-3xl'>
            <div onClick={() => navigate('/user')}
                className='cursor-pointer'>
                <MdAccountCircle />
            </div>
        </div>
    )
}

export default UserMobile