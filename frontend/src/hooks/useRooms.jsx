import { api } from '@/services/api'
import useSWR from 'swr'

const useRooms = () => {
    const { data, error, isLoading, mutate } = useSWR(`/room/all`, api)
    console.log(data)
    const compare = (a, b) => { 
        if (a.identifier < b.identifier) {
            return -1;
        } else if (a.identifier > b.identifier) {
            return 1;
        }
        return 0;
    }

    return {
        rooms: data?.sort(compare),
        error,
        isLoading,
        setRooms: mutate
    }
}

export default useRooms