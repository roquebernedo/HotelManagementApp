import React, { useState } from 'react'
import useLogin from '@/hooks/useLogin';
import { login, postApi } from '@/services/api';
import Login from './Login';
import Signin from './Signin';
import Password from './Password';
import LoginMessage from './LoginMessage';
import { Navigate, useLocation, useNavigate } from 'react-router-dom';
import { useNotifications } from 'reapop';
import { AiOutlineLoading } from 'react-icons/ai'
import { isMobile } from '@/utils/isMobile';

const LoginScreen = () => {
    const navigate = useNavigate()
    const [frame, setFrame] = useState(0)
    const [error, setError] = useState(false)
    const [message, setMessage] = useState(false)
    const { notify } = useNotifications()
    const { user, isLoading, reLog } = useLogin()
    const mobile = isMobile()

    const location = useLocation();
    const hasPreviousState = location.key !== "default";

    const handleSubmit = async (e) => {
        e.preventDefault()
        console.log("entro al handleSubmit")
        console.log(user)
        setError(() => false)
        const [{ value: email }, { value: password }] = e.target,
            data = { email, password };
        console.log(email)
        console.log(password)
        console.log(data)
        const user_data = await login(data)
        console.log(user_data)
        if (!user_data.error) {
            console.log("entro al 1er if osea esta bien")
            console.log(user_data.token)
            reLog(['/user/login', user_data.token])
            console.log(user)
            notify(user_data?.message, 'info')
            setTimeout(() => {
                if (hasPreviousState) {
                    console.log("entro aca")
                    navigate("/");
                } else {
                    console.log("o aca")
                    navigate("/");
                }
            }, 100);
        } else {
            notify({ message: user_data.error, status: 'error', dismissAfter: 0 })
            // setError(() => user_data.error)
        }
    }

    const handlePW = async (e) => {
        e.preventDefault()
        setError(() => false)

        const [{ value: email }] = e.target,
            data = { email };

        try {
            const res = await postApi(['/user/forgotPassword', data])
            if (!!res?.result?.accepted.length) {
                setError(() => false)
            } else {
                console.log('no OK', res?.error);
            }
        } catch (err) {
            console.log('no OK', err)
        } finally {
            setFrame(() => 3)
            setMessage(() => 'Si la dirección es correcta, se envió un correo para continuar con la actualización de tu contraseña.')
        }
    }

    const handleSignin = async (e) => {
        e.preventDefault()
        setError(() => false)

        const [{ value: user_name }, { value: email }, { value: password }, { value: repeat_password }] = e.target,
            data = { user_name, email, password };

        if (password !== repeat_password) {
            setError(() => 'Las contraseñas no coinciden')
            return
        }

        try {
            const res = await postApi(['/user/signin', data])
            if (!res.error) {
                setMessage(() => 'Tu cuenta se ha creado correctamente, pero, por cuestiones de seguridad, para poder acceder a ella, primero debe ser autorizada por un administrador. Contacta con uno para continuar.')
                setFrame(() => 3)
            } else {
                setError(() => res?.error)
            }
        } catch (err) {
            console.warn(err);
            notify({ message: err?.message || err?.response?.message || 'Algo salió mal', status: 'error', dismissAfter: 0 })
            // setError(() => err?.response?.message || 'Algo salió mal')
        }
    }

    const back = () => {
        setError(() => false)
        setMessage(() => false)
        setFrame(() => 0)
    }

    const changePassword = () => {
        setError(() => false)
        setMessage(() => false)
        setFrame(() => 2)
    }

    const createAccount = () => {
        setError(() => false)
        setMessage(() => false)
        setFrame(() => 1)
    }

    const frames = [
        <Login handler={handleSubmit} error={error} password={changePassword} signIn={createAccount} />,
        <Signin handler={handleSignin} back={back} error={error} />,
        <Password handler={handlePW} back={back} />,
        <LoginMessage message={message} back={back} />
    ]
    const correctFrame = frames[frame]

    return (
        user?.id
            ? <Navigate to='/' />
            : <div className={`flex-1 w-screen ${mobile ? '' : '-ml-48'} flex flex-col justify-center`}>
                <div className='w-full md:w-1/2 lg:w-1/4 h-fit m-auto flex flex-col gap-2'>

                    {/* <h1 className='text-center text-8xl my-8 logo-font'>Piso Blanco</h1> */}

                    <div className='py-20'>
                        <div className='flex flex-col justify-center items-center text-center font-poppins font-medium text-[70px] leading-[0.9]'>
                            PISO
                            <span className="
                                font-bebas
                                text-[70px]
                                tracking-[8px]
                                font-normal
                            ">
                                BLANCO
                            </span>
                        </div>
                    </div>

                    {(!isLoading)
                        ? correctFrame
                        : <div className='w-full flex justify-center items-center backdrop-brightness-75 fade-in'>
                            <AiOutlineLoading className='text-4xl animate-spin' />
                        </div>}
                </div>
            </div>
    )
}

export default LoginScreen