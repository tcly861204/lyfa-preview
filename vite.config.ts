import { defineConfig } from 'vite'
import { resolve } from 'path'
import typescript from "@rollup/plugin-typescript";
const env = process.argv[process.argv.length - 1]
const isProd = env === 'production'
export default defineConfig({
  base: '/',
  publicDir: 'dist',
  mode: 'development',
  resolve: {
    alias: {
      '@': resolve(__dirname, 'src'),
    },
  },
  server: {
    host: '0.0.0.0',
    port: 3000,
    open: true,
  },
  css: {
    preprocessorOptions: {
      scss: {
        charset: false,
      }
    }
  },
  plugins: [
    typescript()
  ],
  build: {
    lib: {
      entry: resolve(__dirname, 'src/main.ts'),
      name: 'Preview',
      formats: ['umd'],
      fileName: () => 'main.min.js',
    },
    rollupOptions: {
      output: {
        assetFileNames: `[name].min.[ext]`
      }
    },
    minify: 'terser',
    terserOptions: {
      compress: {
        drop_console: isProd,
        drop_debugger: isProd
      }
    },
    sourcemap: false,
  }
})