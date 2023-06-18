import { defineConfig } from 'umi';
export default defineConfig({
  routes: [{ path: '/', component: '@/pages/index' }],
  fastRefresh:true,
  publicPath: process.env.NODE_ENV === 'development' ? '/' : '/h5/',
  base: process.env.NODE_ENV === 'development' ? '/' : '/h5/',
  proxy: {
    '/api': {
      target: '',
      changeOrigin: true,
      'pathRewrite': { '^/api' : '' },
    },
  },
  mfsu: {},

});

