import { defineConfig } from 'vite';
import { resolve } from 'path';
import react from '@vitejs/plugin-react'
export default defineConfig({
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

  // 解析配置
  resolve: {
    alias: {
      '@': resolve(__dirname, 'src'),       // 路径别名
    },
    extensions: ['.js', '.json']          // 文件扩展名
  },
});