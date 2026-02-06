import { api } from '@/services/api'
import useSWR from 'swr'

const useLedgerMonth = (date) => {
    const { data, error, isLoading, isValidating, mutate } = useSWR(date ? `/ledger/month?date=${date}` : null, api)

    return {
        month: data?.ledger,
        error,
        isLoading,
        isValidating,
        mutate
    }
}

export default useLedgerMonth