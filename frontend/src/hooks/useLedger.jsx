import { api } from '@/services/api'
import useSWR from 'swr'

const useLedger = (date) => {
    const { data, error, isLoading, isValidating, mutate } = useSWR(date ? `/ledger?date=${date}` : null, api)

    return {
        week: data?.week,
        error,
        isLoading: isLoading || isValidating,
        mutate
    }
}

export default useLedger