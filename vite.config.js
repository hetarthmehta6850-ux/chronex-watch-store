import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import basicSsl from '@vitejs/plugin-basic-ssl'

export default defineConfig(({ mode }) => {
  const isSecure = mode === 'secure';
  return {
    plugins: [
      react(),
      tailwindcss(),
      isSecure ? basicSsl() : null
    ].filter(Boolean),

    server: {
      host: '0.0.0.0',
      allowedHosts: true,
      https: isSecure,
    },
  }
})