import { api } from '@/services/api'
import useSWRImmutable from 'swr/immutable'

const useLedgerChartMonth = (month, year) => {
    const { data, error, isLoading, mutate } = useSWRImmutable((month && year) ? `/statistics/month?month=${month}&year=${year}` : null, api)

    return {
        chart: data,
        error,
        isLoading,
        mutate
    }
}

export default useLedgerChartMonth