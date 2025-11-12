import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import { Link } from 'react-router-dom'
import './App.scss'

function App() {
  const [count, setCount] = useState(0)

  const handleSubmit = () => {

  }

  return (
    <>
      <div className='login-in'>
      {/* {isLoading ? (
          <div className='loader'>
            <CircleLoader color={'#157dc2'} loading={true} css={override} size={75} />
          </div>
        ):
        <> */}
          <form className='form-login' onSubmit={handleSubmit}>
            <div className="login">
              <section className='login-container'> 
                <div className='login-title'>
                  <h1 className='title'>
                    <span className='title-main'>HOTEL</span>
                    <span className='title-sub'>BLANCO</span>
                  </h1>
                  {/* <h2 className='subtitle'>Blanco</h2> */}
                </div>
                <div className='login-email'>
                  {/* {errorsSignin.email?.type === "required" && ( */}
                    {/* <p className="error-input">Ingresa tu email</p> */}
                   {/* )} */}
                  {/* {errorsSignin.email?.type !== "required" && ( */}
                    {/* <label className='email lab'></label> */}
                  {/* )} */}
                  <p>Email o usuario</p>
                  <input 
                    type='text' 
                    className='email-input'
                    placeholder='Email'
                    // onChange={(e) => setEmail(e.target.value)} 
                    // {...registerSignin("email", {
                    //   required: true,
                    // })} 
                    // required
                    // onInvalid={(e) => e.target.setCustomValidity('Ingresa tu email')}
                    // onInput={(e) => e.target.setCustomValidity('')}
                  />
                </div>
                <div className='login-password'>
                  {/* {errorsSignin.password?.type === "required" && ( */}
                    {/* <p className="error-input">Ingresa tu contraseña</p> */}
                  {/* )} */}
                  {/* {errorsSignin.password?.type !== "required" && (
                    <label className='password lab'></label>
                  )} */}
                  <p>Contraseña</p>
                  <input 
                    type='password' 
                    className='password-input'
                    placeholder='Contraseña'
                    // onChange={(e) => setPassword(e.target.value)} 
                    // {...registerSignin("password", {
                    //   required: true,
                    // })}
                    // required
                    // onInvalid={(e) => e.target.setCustomValidity('Ingresa tu contraseña')}
                    // onInput={(e) => e.target.setCustomValidity('')} 
                  />
                  <Link className='password-save'>Recuperar contraseña</Link>
                </div>
                <div className='login-button'>
                  <button className='log-in' type='submit'>Log in</button>
                </div>
                <div className='login-recover'>
                  <div className='login-ask'>¿Necesitas una cuenta?</div>
                  <Link className='login-create'>Crear cuenta</Link>
                </div>
              </section>
            </div>
            {/* <div className="google-container">
              <span>O ingresa con tu cuenta de Google</span>
              <span className="google-signin-container" id="signInDiv"></span>
            </div> */}
          </form>

        {/* </> */}
        {/* } */}
      </div>
    </>
  )
}

export default App
