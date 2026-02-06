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
                start_url: '/',
                icons: [
                    {
                        src: "/android-chrome-512x512.png",
                        sizes: "512x512",
                        type: "image/png",
                        purpose: "any maskable"
                    },
                    {
                        src: "/android-chrome-192x192.png",
                        sizes: "192x192",
                        type: "image/png",
                        purpose: "any maskable"
                    }
                ]
            }
        })
    ],
    server: {
        port: 3000,
    },
    resolve: {
        alias: {
            '@': path.resolve(__dirname, './src'),
        },
    },
})
