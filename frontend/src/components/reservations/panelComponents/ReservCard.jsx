import Flag from '@/components/common/misc/Flag';
import NoPayment from '@/components/common/misc/NoPayment';
import React, { useState } from 'react'
import { MdPeople } from 'react-icons/md';
import { useNavigate } from 'react-router-dom';

const ReservCard = ({ data }) => {
    const navigate = useNavigate()
    const {
        id,
        nights,
        pax,
        name,
        checkin,
        country_code,
        paymentStatus
    } = data
    const [expand, setExpand] = useState(false)

    const goToReserv = (e) => {
        e.stopPropagation()
        navigate(`/reservations/details/${id}`)
        return null
    }
    console.log(data)
    return (
        <div onClick={goToReserv}
            onMouseEnter={() => setExpand(true)}
            onMouseLeave={() => setExpand(false)}
            style={{ width: `${(nights < 3 && expand) ? 21 : (nights * 7)}rem` }}
            className={`h-10 z-10 flex justify-start overflow-clip items-center gap-2 pl-12 absolute top-1 ${checkin === 'pre' ? 'left-0 rounded-r-3xl' : 'left-14 rounded-3xl'} bg-blue-600 text-white cursor-pointer hover:brightness-125 hover:z-20 hover:drop-shadow-xl fade-in transition-all`}>

            <span className={`h-10 w-12 flex gap-1 absolute left-0 justify-center items-center ${checkin === 'pre' ? 'rounded-r-3xl' : 'rounded-3xl'} bg-blue-700`}><MdPeople />{pax}</span>

            <span className={`flex items-center h-5 ${expand ? 'min-w-10 px-2 ml-2 opacity-100' : 'w-0 px-0 opacity-0'} overflow-hidden bg-rose-600 rounded-lg transition-all text-white`}>ver</span>

            {paymentStatus === false && <NoPayment />}

            <Flag code={country_code} />

            <p className='txt-n-icon ellipsis inline-block capitalize'>
                {name || '?'}
            </p>
        </div>
    )
}

export default ReservCard