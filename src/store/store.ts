import axios from 'axios';
import Vue from 'vue';
import Vuex from 'vuex';
import VuexORM from '@vuex-orm/core';
import VuexORMAxios from '@vuex-orm/plugin-axios';
import VuexORMSoftDelete from '@vuex-orm/plugin-soft-delete';
import VuexORMSearch from '@vuex-orm/plugin-search';
import database from '@/database/database';

Vue.use(Vuex);
VuexORM.use(VuexORMAxios, {
  axios,
  baseURL: 'http://dummy.restapiexample.com/api/v1/',
  headers: {
    'Content-Type': 'application/x-www-form-urlencoded',
  },
  dataKey: 'data',
});
VuexORM.use(VuexORMSoftDelete);
VuexORM.use(VuexORMSearch);

const store = new Vuex.Store({
  plugins: [VuexORM.install(database)],
});

export default store;
