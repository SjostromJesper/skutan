import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import {VitePWA} from "vite-plugin-pwa"

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
      vue(),
      VitePWA({
          registerType: 'autoUpdate',
          devOptions: {
              enabled: true
          },
          manifest: {
              name: 'Skutan',
              short_name: 'Skutan',
              description: 'farfar martins skuta',
              theme_color: '#ffffff',
              icons: [
                  {
                      src: './assets/icons/boat.png',
                      sizes: '512x512',
                      type: 'image/png',
                      purpose: ['any', 'maskable']
                  }
              ]
          }

      })
  ],
})
