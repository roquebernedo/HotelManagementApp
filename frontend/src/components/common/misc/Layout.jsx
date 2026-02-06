import React from 'react'
import { Outlet } from 'react-router-dom';

const Layout = () => {
    return (
        <section className='fade-in'>
            <Outlet />
        </section>
    )
}

export default Layout