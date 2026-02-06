import { api } from '@/services/api'
import useSWRImmutable from 'swr/immutable'

const useStatistics = () => {
    const { data, error, isLoading, mutate } = useSWRImmutable(`/statistics`, api)

    return {
        stats: data,
        error,
        isLoading,
        mutate
    }
}

export default useStatistics