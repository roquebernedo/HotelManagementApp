import React, { useState } from 'react'
import ButtonSpinner from '../misc/ButtonSpinner'
import Switch from '../misc/Switch'

const DeleteReserv = ({ handleDelete, close, loading }) => {
    const [remove, setRemove] = useState(false)
    return (
        <div className='relative grid grid-col grid-cols-4 gap-4 w-fit'>
            <span className='col-span-4'>
                <p className='text-xl'>¿Seguro deseas eliminar esta reserva?</p>
                <p>Esta acción es <b>irreversible</b>.</p>
            </span>

            <span className='col-span-4'>
                <p>¿Borrar los pagos de los registros contables?</p>
                <Switch options={['mantener', 'borrar']} cb={() => setRemove(!remove)} />
            </span>

            <button type='button' onClick={close} className="btn-admin-s col-span-2">Cancelar</button>
            <ButtonSpinner inlineStyle='col-span-2'
                loading={loading} type='submit'
                cb={() => handleDelete(remove)}
                text='Continuar' admin={true} />
        </div>
    )
}

export default DeleteReserv