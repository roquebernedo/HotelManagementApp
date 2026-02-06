import useReservations from '@/hooks/useReservations'
import { fancyDate } from '@/utils/formatDate'
import { useNavigate } from 'react-router-dom'
import { MdPerson, MdEvent } from 'react-icons/md';
import { BsFillCaretRightFill } from 'react-icons/bs';
import Flag from '../misc/Flag';

const ReservationMiniCard = ({ data }) => {
    const navigate = useNavigate()
    const { reservations } = useReservations()
    const reserv = reservations ? reservations.find(e => e.id === data.reservation_id) : false

    return (
        <div onClick={() => navigate(`/reservations/details/${reserv.id}`)}
            className='p-2 cursor-pointer border border-slate-300 dark:border-slate-700 rounded-lg hover:dark:border-slate-500'>
            {reserv &&
                <p className='flex items-center gap-2'>
                    <MdPerson />
                    {reserv?.client?.name || '?'}
                    {reserv?.client?.country_code && <Flag code={reserv.client.country_code} />}
                </p>}
            <p className='flex items-center'>
                <MdEvent className='mr-2' />
                {fancyDate(data.in)}
                <BsFillCaretRightFill className='mx-2 text-gray-500' />
                {fancyDate(data.out)}
            </p>
        </div>
    )
}

export default ReservationMiniCard