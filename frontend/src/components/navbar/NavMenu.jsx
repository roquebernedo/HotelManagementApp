import React from 'react'
import { MdLogout } from 'react-icons/md';
import { useNavigate } from 'react-router-dom';

const NavMenu = ({ visible, logout }) => {
    const navigate = useNavigate()

    const goProfile = () => navigate('/user')

    return (
        <div className={`navMenu ${visible ? 'navMenuOn' : ''}`}>
            <p onClick={goProfile}>Perfil</p>

            <p onClick={logout}>Log out <MdLogout /></p>
        </div>
    )
}

export default NavMenu