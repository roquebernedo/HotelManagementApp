import React from 'react'
import Flag from '@/components/common/misc/Flag';
import { MdEmail, MdCall, MdAccountBox, MdDirectionsCar, MdPlace, MdStickyNote2, MdApartment } from 'react-icons/md';

const ClientDetailsCard = ({ user }) => {
    console.log(user)
    console.log(user.cellphone)
    return (
        <div className='details-card fade-in'>
            <section>
                <p className='txt-n-icon text-2xl font-semibold capitalize'>
                    {user.company && <MdApartment />}
                    {user?.name || '-'}
                </p>

                <i className='text-xs text-gray-500 mx-2'>ID: {user.id || '-'}</i>
                <p className='flex gap-2 items-center'><MdCall /><b>{user?.cellphone || '-'}</b></p>
                <p className='flex gap-2 items-center'><MdEmail /><b>{user?.email ? <a href={`mailto:${user?.email}`}>{user?.email}</a> : '-'}</b></p>
            </section>

            {user?.company
                ? <section>
                    <p className='text-xl flex gap-2 items-center'><MdApartment />Datos</p>
                    <div className='details-data'>
                        <p>RUC</p>
                        <p>{user?.ruc || '-'}</p>
                    </div>
                </section>
                : <section>
                    <p className='text-xl flex gap-2 items-center'><MdAccountBox />Datos</p>
                    <div className='details-data'>
                        <p>DNI</p>
                        <p>{user?.dni || '-'}</p>
                        <p>Edad </p>
                        <p>{user?.age || '-'}</p>
                        <p>Profesión</p>
                        <p>{user?.profession || '-'}</p>
                        <p>Estado civil</p>
                        <p>{user?.civil_status || '-'}</p>
                    </div>
                </section>
            }

            <section>
                <p className='text-xl flex gap-2 items-center'><MdPlace />Origen </p>
                <div className='details-data'>
                    <p>Nacionalidad </p>
                    <p className='txt-n-icon'>{user?.nationality || '-'}<Flag code={user?.country_code} /></p>
                    <p>procedencia </p>
                    <p>{user?.provenance || '-'}</p>
                    <p>dirección </p>
                    <p>{user?.address || '-'}</p>
                </div>
            </section>

            {!user?.company &&
                <section>
                    <p className='text-xl flex gap-2 items-center'><MdDirectionsCar />Vehículo</p>
                    <div className='details-data'>
                        <p>Patente</p>
                        <p>{user?.vehiclePlate || '-'}</p>
                        <p>Tipo</p>
                        <p>{user?.vehicleType || '-'}</p>
                    </div>
                </section>}

            <section>
                <p className='text-xl flex gap-2 items-center'><MdStickyNote2 />Notas</p>
                <p className='ml-2'>{user?.notes || '-'}</p>
            </section>
        </div>
    )
}

export default ClientDetailsCard