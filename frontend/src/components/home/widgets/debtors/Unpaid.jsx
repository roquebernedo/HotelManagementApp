import QuickPayment from '@/components/common/forms/QuickPayment'
import NoPayment from '@/components/common/misc/NoPayment'
import useModal from '@/hooks/useModal'
import useReservations from '@/hooks/useReservations'
import Modal from '@/utils/Modal'
import React, { useMemo } from 'react'
import DebtorCard from './DebtorCard'
import { searchDebtors } from './searchDebtors'
import { BsFillRecordFill } from 'react-icons/bs';
import Loading from '@/components/common/misc/Loading'

const Unpaid = () => {
    const { reservations, isLoading } = useReservations()
    const debtors = useMemo(() => searchDebtors(reservations), [reservations])
    const [isOpen, open, close, prop] = useModal()

    return (
        <div>
            <section className='h-fit w-full px-4 pt-2 pb-4 flex flex-col gap-2 justify-between relative'>

                <p className='text-xl mb-2'>Reservas impagas</p>
                <span className='absolute top-3 right-4'>
                    {!!debtors.length
                        ? <NoPayment />
                        : <div className='text-green-300 text-xl'><BsFillRecordFill /></div>
                    }
                </span>


                <div className='flex flex-col gap-1'>
                    {!!debtors?.length
                        ? debtors.map(d => (
                            <DebtorCard data={d} key={d.id} openModal={open} />
                        ))
                        : <p className='text-gray-400 uppercase text-xs'>{isLoading ? 'cargando' : 'Sin reservas impagas'}</p>}
                </div>


                {isLoading &&
                    <span className='loading-container items-end bottom-0'>
                        <Loading />
                    </span>}
            </section>

            {isOpen &&
                <Modal isOpen={isOpen} closeModal={close}>
                    <QuickPayment close={close} data={prop} />
                </Modal>}
        </div>
    )
}

export default Unpaid