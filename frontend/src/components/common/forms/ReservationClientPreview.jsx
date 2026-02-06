import { editSubmit } from '@/utils/handlers/clientSubmitHandlers';
import React, { useState } from 'react'
import { MdEmail, MdCall, MdPlace, MdDirectionsCar, MdEdit } from 'react-icons/md';
import { GrUndo } from 'react-icons/gr';
import ClientForm from './ClientForm'

const ReservationClientPreview = ({ client, cb }) => {
    const [edit, setEdit] = useState(false)

    const handleEdit = () => {
        setEdit(() => !edit)
    }

    const save = (res) => {
        cb(res)
        setEdit(() => false)
    }

    return (
        <>
            {!edit &&
                <>
                    <p>Resumen de huesped</p>
                    <div className='pt-2'>
                        <p className='txt-n-icon ml-2 font-semibold text-gray-500 dark:text-gray-400'>{client?.name}</p>
                        <p className='txt-n-icon ml-2 text-gray-500 dark:text-gray-400'>
                            <MdEmail />{client?.email || '-'}
                        </p>
                        <p className='txt-n-icon ml-2 text-gray-500 dark:text-gray-400'>
                            <MdCall />{client?.telephone || '-'}
                        </p>
                        <p className='txt-n-icon ml-2 text-gray-500 dark:text-gray-400'>
                            <MdPlace />{client?.nationality || '-'}
                        </p>
                        <p className='txt-n-icon ml-2 text-gray-500 dark:text-gray-400'>
                            <MdDirectionsCar />{client?.vehicleType || '-'}
                        </p>
                    </div>
                    <button className='btn-icon absolute top-6 right-9' onClick={handleEdit}>
                        <MdEdit />
                    </button>
                </>}


            {edit && <>
                <p>Editando huesped</p>
                <ClientForm handler={editSubmit} cb={save} edit_id={client.id} />
                <button type='button' className='btn-icon absolute top-6 right-9' onClick={handleEdit}>
                    <GrUndo />
                </button>
            </>}
        </>
    )
}

export default ReservationClientPreview