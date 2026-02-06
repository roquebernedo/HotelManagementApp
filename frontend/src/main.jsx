import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import { NotificationsProvider } from 'reapop'
import App from '@/App'
import '@/index.css'

//: TODO learn about the provider function https://swr.vercel.app/docs/advanced/cache
//: TODO error handling for notifications https://swr.vercel.app/docs/error-handling
ReactDOM.createRoot(document.getElementById('root')).render(
    <BrowserRouter>
        <NotificationsProvider>
            <App />
        </NotificationsProvider>
    </BrowserRouter>
)
