import { defineConfig } from 'vite';
import { resolve } from 'path';

export default defineConfig({
  // 基础路径
  root: './src',
  base:'./',
  // 开发服务器配置
  server: {
    port: 3000,                // 自定义端口
    open: true,                // 自动打开浏览器
    hmr: {
      overlay: true           // 显示错误覆盖层
    },
    // proxy: {                 // 代理配置示例
    //   '/api': {
    //     target: 'http://localhost:8080',
    //     changeOrigin: true
    //   }
    // }
  },

  // 构建配置
  build: {
    outDir: 'dist',           // 输出目录
    target: 'esnext',         // 使用最新ES特性
    sourcemap: true,          // 生成sourcemap

  },
  optimizeDeps: {
    esbuildOptions: {
      target: 'esnext' // 同步esbuild配置
    }
  },

  // 解析配置
  resolve: {
    alias: {
      '@': resolve(__dirname, 'src'),       // 路径别名
    },
    extensions: ['.js', '.json']          // 文件扩展名
  },

  // CSS 配置
  // css: {
  //   postcss: {
  //     plugins: [require('autoprefixer')]  // 自动前缀
  //   },
  //   preprocessorOptions: {
  //     scss: {
  //       additionalData: `@import "@/styles/vars.scss";` // 全局SCSS变量
  //     }
  //   }
  // },

  // 插件配置
  plugins: []  // 可扩展插
});