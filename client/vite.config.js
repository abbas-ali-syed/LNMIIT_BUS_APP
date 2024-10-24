import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      '/api': {
        target: 'https://lnmiit-bus-app.onrender.com/api',
        changeOrigin: true,
        pathRewrite: { '^/api': '' },

      },
    },
  },

})
