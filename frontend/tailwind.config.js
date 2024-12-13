/** @type {import('tailwindcss').Config} */
const plugin = require('flowbite/plugin');

module.exports = {
  content: [
    './src/**/*.{html,js,vue}', // 扫描你的 HTML 和 JS 文件
    './node_modules/flowbite/**/*.js' // 添加 Flowbite 的组件文件
  ],
  theme: {
    extend: {
      colors: {
        primary: {"50":"#eff6ff","100":"#dbeafe","200":"#bfdbfe","300":"#93c5fd","400":"#60a5fa","500":"#3b82f6","600":"#2563eb","700":"#1d4ed8","800":"#1e40af","900":"#1e3a8a","950":"#172554"}
      }
    },
  },
  plugins: [
    plugin, // 添加 Flowbite 插件
  ],
};
