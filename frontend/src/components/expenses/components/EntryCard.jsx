import LedgerForm from '@/components/common/forms/LedgerForm'
import { correctDate } from '@/utils/formatDate'
import { numberToCurrency } from '@/utils/formUtils'
import { isMobile } from '@/utils/isMobile'
import React, { useState } from 'react'
import { MdArrowDownward, MdArrowUpward, MdMoreVert, MdMode, MdDelete } from 'react-icons/md'
import { useNavigate } from 'react-router-dom'

const EntryCard = ({ data, deleteEntry, date = true, mutate }) => {
    const gain = data?.entryType === 'income'
    const [open, setOpen] = useState(false)
    const [editMode, setEditMode] = useState(false)
    const [expand, setExpand] = useState(false)
    const navigate = useNavigate()
    const mobile = isMobile()

    const edit = (e) => {
        e.stopPropagation()
        setOpen(() => false)
        setEditMode(() => true)
    }
    const deleteHandler = (e) => {
        e.stopPropagation()
        setOpen(() => false)
        deleteEntry(data.date, data._id)
    }
    const goReserv = () => {
        data?.reservation && navigate(`/reservations/details/${data?.reservation}`)
    }

    return (
        <>
            {editMode
                ? <LedgerForm edit={data} mutate={mutate} close={() => setEditMode(() => false)} />
                : <div className={`ledger-row grid-cols-8 fade-in ${open ? 'z-10' : ''}`}>

                    {date &&
                        <div className='col-span-1'>
                            {correctDate(data?.date)}
                        </div>}

                    <div className={`col-span-1 flex items-center ${mobile ? 'justify-center' : ''} ${gain ? 'text-emerald-500' : 'text-rose-500'}`}>
                        {gain
                            ? <>
                                <MdArrowUpward />
                                {!mobile &&
                                    <p className='uppercase pl-2 text-xs'>
                                        ingreso
                                    </p>}
                            </>
                            : <>
                                <MdArrowDownward />
                                {!mobile &&
                                    <p className='uppercase pl-2 text-xs'>
                                        perdida
                                    </p>}
                            </>}
                    </div>

                    <div onMouseEnter={() => setExpand(true)}
                        onMouseLeave={() => setExpand(false)}
                        onClick={goReserv}
                        className={`ellipsis txt-n-icon gap-0 ${date || mobile ? 'col-span-4' : 'col-span-5'} ${data?.reservation ? 'cursor-pointer' : ''}`}>
                        {data?.reservation &&
                            <span className={`flex items-center h-5 ${expand ? 'min-w-10 px-2 mr-2 opacity-100' : 'w-0 px-0 opacity-0'} overflow-hidden bg-rose-600 rounded-lg transition-all text-white`}>ver</span>}
                        {data?.description}

                        {data?.paymentType &&
                            <p className='ml-2 text-gray-500'>
                                {data?.paymentType}
                            </p>}
                    </div>

                    <div className='relative col-span-1 text-right text-gray-500'>
                        {/* {data?.currency !== 'PEN'
                            ? <>
                                <span className={`absolute top-3 right-12 h-2 w-2 flex items-center bg-rose-500 rounded-full`}>
                                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-rose-400 opacity-90"></span>
                                </span>
                                <>{data?.currency}</>
                            </>
                            : <>{data?.currency}</>} */}

                        {data?.currency !== 'PEN' && data?.currency !== 'USD'
                            ? <>
                                <span className={`absolute top-3 right-12 h-2 w-2 flex items-center bg-rose-500 rounded-full`}>
                                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-rose-400 opacity-90"></span>
                                </span>
                                <>{data?.currency}</>
                            </>
                            : data?.currency === 'USD'
                                ? <p className='text-emerald-500'>{data?.currency}</p>
                                : <>{data?.currency}</>}

                        {/* {data?.currency} */}
                    </div>

                    <div className={`col-span-1 ${gain ? 'text-emerald-500' : 'text-rose-500'}`}>
                        {gain ? '+' : '-'}
                        {numberToCurrency(data?.amount)}
                    </div>

                    <button className='btn-icon absolute right-3 top-2' onClick={() => setOpen(true)}><MdMoreVert /></button>

                    {open &&
                        <section onMouseLeave={() => setOpen(false)}
                            className='absolute -right-2 top-2 w-fit h-fit py-2 border border-slate-400 dark:border-slate-700 rounded-md bg-neutral-100 dark:bg-slate-900'>
                            <p onClick={edit}
                                className='txt-n-icon cursor-pointer px-4 py-1 w-full hover:bg-gray-300 hover:dark:bg-slate-800'>
                                <MdMode />
                                editar
                            </p>

                            <p onClick={deleteHandler}
                                className='txt-n-icon cursor-pointer px-4 py-1 w-full hover:bg-gray-300 hover:dark:bg-slate-800'>
                                <MdDelete />
                                eliminar
                            </p>

                        </section>}
                </div>
            }
        </>
    )
}

export default EntryCard