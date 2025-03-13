import { defineConfig } from 'vite';
import { resolve } from 'path';
export default defineConfig({
  // base:'./',
  // 开发服务器配置
  server: {
    port: 3031,                // 自定义端口
    open: true,                // 自动打开浏览器
  },

  build: {
    // 库模式配置
    lib: {
      entry: resolve(__dirname, 'src/index.js'),
      name: 'MyLib',          // UMD 全局变量名
      formats: ['cjs'], // 输出格式
      fileName: (format) => `graphifyChart.js`
    },
    // 压缩配置
    minify: 'terser',
    // 输出目录
    outDir: 'dist',
    // 不生成空 CSS 文件
    cssCodeSplit: false,
    // Rollup 配置
    rollupOptions: {
      // 外部化第三方依赖（如 lodash）
      external: [],
      output: {
        // UMD 全局变量
        globals: {}
      }
    }
  },
  // 解析配置
  resolve: {
    alias: {
      '@': resolve(__dirname, 'src'),       // 路径别名
    },
  },

});