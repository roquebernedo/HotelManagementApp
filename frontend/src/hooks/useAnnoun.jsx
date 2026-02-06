import { api } from '@/services/api'
import useSWR from "swr"

const useAnnoun = () => {
    const { data, error, isLoading, } = useSWR('/user/announcement', api)

    return {
        data: data?.announcements[0] || false,
        title: data?.announcements[0]?.title || false,
        text: data?.announcements[0]?.text || false,
        style: data?.announcements[0]?.style || false,
        from: data?.announcements[0]?.from || false,
        error,
        isLoading
    }
}

export default useAnnoun