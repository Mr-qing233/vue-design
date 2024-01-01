import { fileURLToPath, URL } from 'node:url'

import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import vueJsx from '@vitejs/plugin-vue-jsx'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue(), vueJsx()],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url))
    }
  },
  //前端跨域问题解决
  server: {
    port: 5174, //前端启动端口
    https: false, //是否开启https
    // host: "localhost",//本地主机地址
    open: true, //启动时是否自动打开
    proxy: {
      //跨域代理
      '/api': {
        target: 'http://localhost:9195/',
        changeOrigin: true, //是否设置同源
        rewrite: (path) => path.replace(/^\/api/, '')
      }
    }
  }
})
