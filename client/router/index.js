import Vue from "vue";
import VueRouter from "vue-router";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "home",
    component: () => import('@/pages/home/index'),
    redirect: {name: 'pageList'},
    children: [
      {
        path: 'page-list',
        name: 'pageList',
        component: () => import('@/pages/home/page-list')
      },
      {
        path: 'my-template',
        name: 'myTemplate',
        component: () => import('@/pages/home/my-template')
      }
    ]
  },
  {
    path: "/about",
    name: "about",
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () =>
      import(/* webpackChunkName: "about" */ "../pages/About.vue")
  },
  {
    path: '/editor',
    name: 'editor',
    component:() => import("@/pages/editor/Index.vue")
  },
  {
    path: '/login',
    name: 'login',
    component: () => import('@/pages/login'),
    meta: {
      hideHeader: true,
      trust: true,
      noNeedLogin: true
    }
  }
];

const router = new VueRouter({
  routes
});

export default router;
