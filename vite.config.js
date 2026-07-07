import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import fs from 'fs'
import path from 'path'

// Check if real mkcert certs exist, use them. Otherwise fall back to no HTTPS.
const certsDir = path.resolve('./certs')
const certPath = path.join(certsDir, 'cert.pem')
const keyPath = path.join(certsDir, 'key.pem')
const hasCerts = fs.existsSync(certPath) && fs.existsSync(keyPath)

const httpsConfig = hasCerts
  ? { cert: fs.readFileSync(certPath), key: fs.readFileSync(keyPath) }
  : undefined

export default defineConfig({
  plugins: [
    react(),
    tailwindcss(),
  ],

  server: {
    host: '0.0.0.0',
    port: 5173,
    https: httpsConfig,
    allowedHosts: true,
    watch: {
      ignored: ['**/backend/**']
    },
    proxy: {
      '/api': {
        target: 'http://localhost:3001',
        changeOrigin: true,
      }
    }
  },

  preview: {
    host: '0.0.0.0',
    port: 5173,
    https: httpsConfig,
    allowedHosts: true,
    proxy: {
      '/api': {
        target: 'http://localhost:3001',
        changeOrigin: true,
      }
    }
  },
})