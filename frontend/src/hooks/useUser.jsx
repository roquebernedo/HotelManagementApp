import useSWR from 'swr'
import { getCookie } from "@/utils/cookies"

const useUser = () => {
    const { data, error, isLoading, mutate } = useSWR(['/user/login', getCookie('userToken')])
    console.log(data)
    return {
        user: data,
        isLoading,
        error,
        setUser: mutate,
        role: data?.role || undefined,
        admin: data?.role === 'admin' || data?.role === 'master',
        master: data?.role === 'master'
    }
}

export default useUser
