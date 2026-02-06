import { Route, Routes, useNavigate } from 'react-router-dom';
import NotificationsSystem, { atalhoTheme, useNotifications, setUpNotifications } from 'reapop'
import Home from '@/components/home/Home';
import LoginScreen from '@/components/login/LoginScreen';
import Navbar from '@/components/navbar/Navbar';
import Clients from '@/components/clients/Clients';
import Reservations from '@/components/reservations/Reservations';
import NotFound from '@/components/common/misc/NotFound';
import ClientDetails from '@/components/clients/ClientDetails';
import CreateClient from '@/components/clients/CreateClient';
import CreateReservation from '@/components/reservations/CreateReservation';
import ReservationDetails from '@/components/reservations/ReservationDetails';
import Rooms from '@/components/rooms/Rooms';
import RoomDetails from './components/rooms/RoomDetails';
import CreateRoom from './components/rooms/CreateRoom';
import ResetPassword from '@/components/user/ResetPassword';
import Layout from '@/components/common/misc/Layout';
import Profile from '@/components/user/Profile';
import Admin from '@/components/admin/Admin';
import PrivateRoutes from '@/components/common/misc/PrivateRoutes';
import Expenses from '@/components/expenses/Ledger';
import { mutate, SWRConfig } from 'swr';
import { deleteCookie, getCookie } from './utils/cookies';
import { isMobile } from './utils/isMobile';



function App() {
    const navigate = useNavigate()
    const mobile = isMobile()
    const { notifications, dismissNotification, notify } = useNotifications()

    setUpNotifications({
        defaultProps: {
            position: 'bottom-center',
            dismissible: true,
            dismissAfter: 3000
        }
    })

    const SWRcnfg = {
        shouldRetryOnError: false,
        onError: (error) => {
            const customError = error?.response?.data
            console.log("estoy en el customerror")
            console.log(customError)
            if (error.status !== 403 && error.status !== 404) {
                console.log("entro")
                // if the error is originated by a expired token...
                // notify and log out
                if (customError?.expiredToken) {
                    const content = customError.error.split(', '),
                        title = content[0],
                        message = content[1]

                    mutate(['/user/login', getCookie('userToken')], false)
                    deleteCookie('userToken')
                    notify({
                        title,
                        message,
                        status: 'warning',
                        dismissAfter: 10000
                    })
                    navigate('/login')
                } else {
                    // notify(customError?.error || error?.message || error, 'error')
                }

            }
        }
    }

    return (
        <SWRConfig value={SWRcnfg}>
            <div className={`APP ${mobile ? 'pl-16 pt-4' : 'pl-52 pt-12'}`}>
                <div>
                    <NotificationsSystem
                        notifications={notifications}
                        dismissNotification={(id) => dismissNotification(id)}
                        theme={atalhoTheme} />
                </div>

                <Routes>
                    <Route path='/' element={<Navbar />}>
                        <Route path="/login" element={<LoginScreen />} />
                        <Route path="/user/resetpassword" element={<ResetPassword />} />

                        <Route path="/" element={<PrivateRoutes />}>
                            <Route index element={<Home />} />

                            <Route path="clients" element={<Layout />} >
                                <Route index element={<Clients />} />
                                <Route path="create" element={<CreateClient />} />
                                <Route path="edit/:id" element={<CreateClient />} />
                                <Route path="details/:id" element={<ClientDetails />} />
                            </Route>

                            <Route path="reservations" element={<Layout />} >
                                <Route index element={<Reservations />} />
                                <Route path="create" element={<CreateReservation />} />
                                <Route path="edit/:id" element={<CreateReservation />} />
                                <Route path="details/:id" element={<ReservationDetails />} />
                            </Route>

                            <Route path="rooms" element={<Layout />} >
                                <Route index element={<Rooms />} />
                                <Route path="create" element={<CreateRoom />} />
                                <Route path="edit/:id" element={<CreateRoom />} />
                                <Route path="details/:id" element={<RoomDetails />} />
                            </Route>

                            <Route path="expenses" element={<Layout />} >
                                <Route index element={<Expenses />} />
                            </Route>

                            <Route path="user" element={<Profile />} />

                            <Route path="admin" element={<Admin />} />
                        </Route>

                        <Route path="*" element={<NotFound />} />
                    </Route>
                </Routes>

            </div>
        </SWRConfig >

    )
}

export default App
