import React, { useState } from 'react'
import AdminUsers from './AdminUsers'
import Annuncement from './Annuncement'
import { MdLocalPolice } from 'react-icons/md';
import Header from '../common/misc/Header';

const Admin = () => {
    const [section, setSection] = useState(0)

    //: TODO: opciones de configuracion
    const sections = [
        <AdminUsers />,
        <Annuncement />,
        <p>Opciones: posibles configuraciones paras futuras implementaciones como el conversor de monedas o presupuestario.</p>
    ]

    const correctSection = sections[section]

    return (
        <div className='relative flex flex-col w-full full-h fade-in'>

            <MdLocalPolice className='absolute top-0 right-0 text-9xl text-gray-200 dark:text-slate-800/50' />

            <Header title={'Admin'} sections={['Usuarios', 'Anuncio']} section={section} setSection={setSection} admin />

            <section className='full-h pt-8 pl-8 col-span-5 overflow-y-auto'>
                {correctSection}
            </section>
        </div>
    )
}

export default Admin