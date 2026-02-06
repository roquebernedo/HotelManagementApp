import React, { useState } from 'react'
import useAdmin from '@/hooks/useAdmin'
import Modal from '@/utils/Modal';
import useModal from '@/hooks/useModal';
import UserCard from '../common/cards/UserCard';
import Role from '@/components/admin/forms/Role';
import Email from '@/components/admin/forms/Email';
import Approve from '@/components/admin/forms/Approve';
import Delete from '@/components/admin/forms/Delete';
import Password from '@/components/admin/forms/Password';

const AdminUsers = () => {
    const { users, setUsers } = useAdmin()
    console.log(users)
    console.log(setUsers)
    const [id, setId] = useState(false)
    const [form, setForm] = useState(false)
    const [isOpen, open, closeModal] = useModal()

    const close = () => {
        closeModal()
        setForm(() => false)
        setId(() => false)
    }

    const mutate = (res) => {
        setUsers(res)
    }

    const LIST = {
        role: <Role id={id} close={close} mutate={mutate} />,
        email: <Email id={id} close={close} mutate={mutate} />,
        approve: <Approve id={id} close={close} mutate={mutate} />,
        password: <Password id={id} close={close} mutate={mutate} />,
        'delete-user': <Delete id={id} close={close} mutate={mutate} />
    }
    const correctChildren = LIST[form]

    const submitsHandler = (e, id) => {
        setForm(e)
        setId(id)
        open()
    }

    return (
        <div>
            <h2>Usuarios</h2>
            <p>Aqui se pueden administrar las cuentas de otros usuarios.</p>
            <p>Es posible eliminar, editar contraseña, email, rol y autorizar cuentas nuevas.</p>
            <p>Haz click en un valor para actualizarlo.</p>

            <div className='mt-4 grid gap-2 w-4/5'>
                {users.map(u => (
                    <UserCard user={u} key={u.id} handler={submitsHandler} />
                ))}
            </div>

            <Modal isOpen={isOpen} closeModal={close}>
                {correctChildren}
            </Modal>
        </div>
    )
}

export default AdminUsers