// https://umijs.org/config/
import path from 'path'
import pageRoutes from './router.config'
import theme from '../src/theme'

export default {
  publicPath: 'https://doublechain.oss-cn-hangzhou.aliyuncs.com/mobileweb/dist/',
  base: '/mobile/',
  // history: 'hash',
  // add for transfer to umi
  plugins: [
    [
      'umi-plugin-react',
      {
        antd: true,
        dva: {
          hmr: true,
          exclude: [/model-tools/, /model-center/],
        },
        // dynamicImport: {
        //   loadingComponent: './common/page-loading/',
        //   webpackChunkName: true,
        // },
        title: {
          defaultTitle: '双链科技',
        },
        dll: false,
        pwa: false,
        hd: false,
        routes: {
          exclude: [],
        },
        hardSource: false,
      },
    ],
  ],
  //   exportStatic: {},
  // 路由配置
  routes: pageRoutes,
  // Theme for antd-mobile
  // https://github.com/ant-design/ant-design-mobile/blob/master/components/style/themes/default.less
  theme: {
    'brand-primary': theme.primaryColor,
  },
  //   ignoreMomentLocale: true,
  lessLoaderOptions: {
    javascriptEnabled: true,
  },
  cssnano: {
    mergeRules: false,
  },
  targets: {
    android: 5,
    ios: 7,
    chrome: 58,
    ie: 9,
  },
  // outputPath: './deploy/dist',
  hash: true,
  alias: {
    '@': path.resolve(__dirname, 'src'),
  },
}
