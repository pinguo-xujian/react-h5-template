// @ts-ignore
import px2vw from 'postcss-px-to-viewport';
import pxtorem from 'postcss-pxtorem';
import { defineConfig } from 'umi';

export default defineConfig({
  routes:[
    { path: '/', redirect: '/home' },
    { path: '/home', component: '@/pages/index' },
    { path: '*', component: '@/pages/docs.tsx' },
  ],
  fastRefresh: true,
  // publicPath: process.env.NODE_ENV === 'development' ? '/' : '/h5/',
  // base: process.env.NODE_ENV === 'development' ? '/' : '/h5/',
  proxy: {
    '/api': {
      target: '',
      changeOrigin: true,
      'pathRewrite': { '^/api': '' },
    },
  },
  mfsu: {},
  extraPostCSSPlugins: [
    pxtorem({
      rootValue: 75, // 换算的基数
      // 忽略转换正则匹配项。插件会转化所有的样式的px。比如引入了三方UI，也会被转化。目前我使用 selectorBlackList字段，来过滤
      //如果个别地方不想转化px。可以简单的使用大写的 PX 或 Px 。
      // selectorBlackList: ["am"],
      exclude: /node_modules/i,
      propList: ['*'],
    }),
    px2vw({
      unitToConvert: 'px', // 要转化的单位
      viewportWidth: 750, // 视窗的宽度，可根据自己的需求调整（这里是以PC端为例）
      // viewportHeight: 1080, 		// 视窗的高度
      unitPrecision: 6, // 转换后的精度，即小数点位数
      propList: ['*'], // 指定转换的css属性的单位，*代表全部css属性的单位都进行转换
      viewportUnit: 'vw', // 指定需要转换成的视窗单位，默认vw
      fontViewportUnit: 'vw', // 指定字体需要转换成的视窗单位，默认vw
      // selectorBlackList: ['wrap'],// 指定不转换为视窗单位的类名，
      minPixelValue: 1, // 默认值1，小于或等于1px则不进行转换
      mediaQuery: false, // 是否在媒体查询的css代码中也进行转换，默认false
      replace: true, // 是否转换后直接更换属性值
      exclude: [/node_modules/], // 设置忽略文件，用正则做目录名匹配
      landscape: false, // 是否处理横屏情况
    }),
  ],
  npmClient: 'yarn',
});
