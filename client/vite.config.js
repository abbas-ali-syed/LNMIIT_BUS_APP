import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
   '/api': {
        target: 'https://your-app.render.com',
        changeOrigin: true,
        pathRewrite: { '^/api': '' },
      },
    },
  },

})
