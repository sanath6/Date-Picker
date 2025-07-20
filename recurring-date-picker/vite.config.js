import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    allowedHosts: ['date-picker-wc4s.onrender.com'], // ✅ add your Render domain here
  }
})
