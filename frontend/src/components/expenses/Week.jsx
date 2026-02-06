import useLedger from '@/hooks/useLedger'
import React, { useMemo, useState } from 'react'
import Loading from '../common/misc/Loading'
import LedgerPage from './components/LedgerPage'
import LedgerWeek from './components/LedgerWeek'
import { getBalance } from './utils/getBalance'
import { MdArrowDownward, MdArrowUpward, MdOutlineLastPage, MdDateRange } from 'react-icons/md'
import { numberToCurrency } from '@/utils/formUtils'
import Calendar from 'react-calendar'
import { defineWeek } from '@/utils/defineWeek'

const Week = ({ date }) => {
    

    return (
        <div className='h-full w-full flex justify-between fade-in overflow-x-hidden'>

        </div>
    )
}

export default Week