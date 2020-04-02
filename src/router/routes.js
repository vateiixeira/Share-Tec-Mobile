
const routes = [
  {
    path: '/',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      { path: '', component: () => import('pages/Index.vue') },
      { path: 'account', component: () => import('pages/Account.vue') },
      { path: 'filtro', component: () => import('pages/Filtro.vue') },
      { path: 'favoritos', name: 'favorito', component: () => import('pages/Favoritos.vue') },
      { path: '/product/:product', name: 'produto', props: true, component: () => import('pages/Product.vue') },
      { path: '/publish', component: () => import('pages/Publish.vue') },
      { path: '/login', component: () => import('pages/Login.vue') },
      { path: '/loja/:idUser', name: 'loja', props: true, component: () => import('pages/Loja.vue') }
    ]
  },
  {
    path: '/register',
    component: () => import('pages/Register.vue')
  },
  {
    path: '/Error404',
    component: () => import('pages/Error404.vue')
  }
]

// Always leave this as last one
if (process.env.MODE !== 'ssr') {
  routes.push({
    path: '*',
    component: () => import('pages/Error404.vue')
  })
}

export default routes
