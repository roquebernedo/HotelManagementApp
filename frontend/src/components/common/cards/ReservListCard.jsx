import { fancyDate } from '@/utils/formatDate'
import React from 'react'
import { useNavigate } from 'react-router-dom'
import { MdPerson, MdEvent, MdHome } from 'react-icons/md';
import { BsFillCaretRightFill } from 'react-icons/bs';

const ReservListCard = ({ data }) => {
    const navigate = useNavigate()
    console.log(data.client.name)
    return (
        <div key={data.id} onClick={() => navigate(`/reservations/details/${data.id}`)}
            className='py-2 px-3 my-1 cursor-pointer border border-slate-300 dark:border-slate-700 rounded-lg hover:border-blue-400 hover:dark:border-slate-500'>

            <p className='txt-n-icon text-xl capitalize'><MdPerson />{data?.client?.name}</p>
            <section className='px-2 text-gray-500'>
                <p className='txt-n-icon '>
                    <MdEvent />
                    {fancyDate(data.checkin)}
                    <BsFillCaretRightFill className='mx-2 text-gray-500' />
                    {fancyDate(data.checkout)}
                </p>
                <p className='txt-n-icon capitalize'><MdHome />{data?.room?.name}</p>
            </section>
        </div>
    )
}

export default ReservListCard