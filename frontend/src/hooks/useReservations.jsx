import { api } from '@/services/api'
import useSWR from 'swr'

const useReservations = (shoudFetch = true) => {
    const { data, error, isLoading, mutate } = useSWR(shoudFetch ? `/reservation/all` : null, api)

    return {
        reservations: data?.reservationList || [],
        isLoading,
        error,
        setReservations: mutate
    }
}

export default useReservations