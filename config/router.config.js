export default [
  {
    path: '/',
    component: '../layouts/base.layout',
    routes: [
      { path: '/exception/403', title: '权限异常', component: './exception/403' },
      { path: '/exception/500', title: '服务器错误', component: './exception/500' },
      { path: '/', component: './editor-page', title: 'GenericPage Editor' },
      { path: '/login', component: './login-page', title: '登录' },

      { component: '404', title: '页面可能是被外星人偷走了' },
    ],
  },
]
