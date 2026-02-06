import { createSubmit, editSubmit } from '@/utils/handlers/clientSubmitHandlers'
import React from 'react'
import ClientForm from '@/components/common/forms/ClientForm'
import useClients from '@/hooks/useClients'
import { useNavigate } from 'react-router-dom'
import { useParams } from 'react-router-dom'

const CreateClient = () => {
    const { id } = useParams()
    const navigate = useNavigate()
    const { setClients } = useClients()

    const afterCreation = (res) => {
        setClients(res)
        navigate('/clients')
    }

    // if there is an ID in params, it means it is an edit,
    // so the form needs the edit submit handler
    return (
        <>
            <h1>Registrar Cliente</h1>
            <ClientForm handler={id ? editSubmit : createSubmit} cb={afterCreation} />
        </>
    )
}

export default CreateClient