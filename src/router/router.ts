import Vue from 'vue';
import VueRouter, { RouteConfig } from 'vue-router';

Vue.use(VueRouter);

const routes: Array<RouteConfig> = [
  {
    path: '/employee/:id',
    name: 'Profile',
    component: () => import(/* webpackChunkName: "employee" */ '@/views/Employee.vue'),
  },
  {
    path: '/:page?',
    name: 'Home',
    component: () => import(/* webpackChunkName: "home" */ '@/views/Home.vue'),
  },
  {
    path: '/:page?/:search?',
    name: 'Search',
    component: () => import(/* webpackChunkName: "home" */ '@/views/Home.vue'),
  },
];

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes,
});

export default router;
