export default [
  {
    path: '/',
    component: '../layouts/base.layout',
    routes: [

      { path: '/exception/403', title: '权限异常', component: './exception/403' },
      { path: '/exception/500', title: '服务器错误', component: './exception/500' },
      { path: '/', component: './home/home.page',title: '首页' },
      { path: '/me', component: './account/me.page',title: '我的' },
      { path: '/ours', component: './account/ours.page',title: '大家的' },

      { component: '404', title: '页面可能是被外星人偷走了' },
    ],
  },
]
