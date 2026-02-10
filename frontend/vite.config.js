import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import eslint from 'vite-plugin-eslint'
import path from 'path'
import { VitePWA } from 'vite-plugin-pwa'

// https://vitejs.dev/config/
export default defineConfig({
    plugins: [
        react(),
        // eslint(),
        VitePWA({
            manifest: {
                name: 'Piso Blanco',
                short_name: 'Administración',
                description: 'Sistema de administración de Piso Blanco',
                theme_color: '#0f172a',
                start_url: '/'
            }
        })
    ],
    server: {
        port: process.env.PORT || 3000,
    },
    resolve: {
        alias: {
            '@': path.resolve(__dirname, './src'),
        },
    },
})
