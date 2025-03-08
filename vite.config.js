import { defineConfig } from 'vite';
import { resolve } from 'path';
export default defineConfig({
  base:'./',
  // 开发服务器配置
  server: {
    port: 3000,                // 自定义端口
    open: true,                // 自动打开浏览器
    hmr: {
      overlay: true           // 显示错误覆盖层
    },
  },

  // 构建配置
  build: {
    outDir: 'dist',           // 输出目录
    target: 'esnext',         // 使用最新ES特性
    // sourcemap: true,          // 生成sourcemap
    rollupOptions: {
      external: [],
      input: {
        // 入口文件路径（例如打包 src/utils/my-script.js）
        index: resolve(__dirname, 'src/index.js'),
      },
      output: {
        // 输出文件名格式（[name] 会替换为入口的 key，此处为 "main"）
        entryFileNames: '[name].min.js',
        // 压缩配置（默认生产环境会自动启用）
        compact: true
      }
    },
    // 启用代码压缩（默认为 true，生产环境自动启用）
    // minify: 'terser',
  },

  // 解析配置
  resolve: {
    alias: {
      '@': resolve(__dirname, 'src'),       // 路径别名
    },
  },

});