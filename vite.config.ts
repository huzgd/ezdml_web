import { fileURLToPath, URL } from 'node:url'

import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import vueJsx from '@vitejs/plugin-vue-jsx'

// https://vitejs.dev/config/
export default defineConfig({
  base: '/v/',
  plugins: [
    vue(),
    vueJsx()
  ],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url))
    }
  },

  optimizeDeps: {
    //include: ['@/../lib/dmlgraph/dmlgraph.umd.js']
  },

  build:{
  },
  
  server: {
    port: 8081,
    host: true,
    open: true,
    proxy: {
      // https://cn.vitejs.dev/config/#server-proxy
      ['/ez']: {
        target: 'http://ezdml.com/ez',
        rewrite: (p) => p.replace(/^\/ez/, ''),
        changeOrigin: true
      }
    }
  },
})
