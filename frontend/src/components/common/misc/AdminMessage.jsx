import useAnnoun from '@/hooks/useAnnoun'
import React from 'react'
import AnnounCard from '../cards/AnnounCard'


const AdminMessage = () => {
    const { data } = useAnnoun()

    const dev = false
    // const dev = {
    //     title: 'Cuentas v2',
    //     text: 'Nueva versión de Cuentas. Calendario para ver/registrar/editar en fechas especificas. Las nuevas reservas y pagos rapidos se registran automáticamente.',
    //     from: 'Desarrollador',
    //     style: 'fix'
    // }

    return (
        <div className='flex flex-col gap-1'>
            {dev
                ? <AnnounCard data={dev} />
                : null}
            {data
                ? <AnnounCard data={data} />
                : null}
        </div>
    )
}

export default AdminMessage