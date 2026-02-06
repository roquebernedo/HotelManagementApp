import useUser from "@/hooks/useUser";
import { Navigate, Outlet } from "react-router-dom";

const PrivateRoutes = () => {
    const { user } = useUser()

    return (
        user?.id ? <Outlet /> : <Navigate to='/login' />
    )
};

export default PrivateRoutes