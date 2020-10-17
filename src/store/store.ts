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
  baseURL: process.env.VUE_APP_API_URL,
  headers: {
    'Content-Type': process.env.VUE_APP_API_CONTENT_TYPE,
  },
  dataKey: process.env.VUE_APP_API_DATA_KEY,
});
VuexORM.use(VuexORMSoftDelete);
VuexORM.use(VuexORMSearch);

const store = new Vuex.Store({
  plugins: [VuexORM.install(database)],
});

export default store;
