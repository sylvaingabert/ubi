import Vue from 'vue';
import VueRouter, { RouteConfig } from 'vue-router';
import routesNames from '@/router/routesNames';

Vue.use(VueRouter);

const routes: Array<RouteConfig> = [
  {
    path: '/employee',
    component: () => import(/* webpackChunkName: "employee" */ '@/views/employee/Employee.vue'),
    children: [
      {
        path: ':id',
        name: routesNames.EMPLOYEE_UPDATE,
        component: () => import(/* webpackChunkName: "employee-update" */ '@/views/employee/EmployeeUpdate.vue'),
      },
      {
        path: 'create/new',
        name: routesNames.EMPLOYEE_CREATE,
        component: () => import(/* webpackChunkName: "employee-create" */ '@/views/employee/EmployeeCreate.vue'),
      },
    ],
  },
  {
    path: '/:page?',
    name: routesNames.HOME,
    component: () => import(/* webpackChunkName: "home" */ '@/views/Home.vue'),
  },
  {
    path: '/:page?/:search?',
    name: routesNames.SEARCH,
    component: () => import(/* webpackChunkName: "home" */ '@/views/Home.vue'),
  },
];

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes,
});

export default router;
