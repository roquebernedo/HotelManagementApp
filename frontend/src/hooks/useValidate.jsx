import { api } from "@/services/api"
import { useSearchParams } from "react-router-dom"
import useSWR from 'swr'

const useValidateToken = () => {
    const [searchParams] = useSearchParams({})
    const token = searchParams.get('token')

    const { data, error, isLoading } = useSWR(token ? `/user/checkPasswordToken?t=${token}` : null, api)

    return {
        data,
        error,
        isLoading
    }
}

export default useValidateToken