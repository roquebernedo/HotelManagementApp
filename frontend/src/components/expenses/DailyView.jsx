import useLedgerMonth from '@/hooks/useLedgerMonth'
import { numberToCurrency } from '@/utils/formUtils'
import React, { useMemo, useState } from 'react'
import Loading from '../common/misc/Loading'
import { MdArrowDownward, MdArrowUpward, MdDateRange, MdOutlineLastPage } from 'react-icons/md'
import Calendar from 'react-calendar'
import LedgerPage from './components/LedgerPage'
import { fancyMonth, isAnotherMonth } from '@/utils/formatDate'
import { isMobile } from '@/utils/isMobile'

const DailyView = ({ date: DATE }) => {

    return (
        <div className='h-full w-full flex justify-between fade-in overflow-x-hidden'>

        </div>
    )
}

export default DailyView