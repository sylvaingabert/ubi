import Vue from 'vue';
import VModal from 'vue-js-modal';
import VueMeta from 'vue-meta';
import { ValidationProvider, ValidationObserver, configure } from 'vee-validate';
import '@/core/validation/validation';

Vue.use(VModal, { dialog: true });
Vue.use(VueMeta);

configure({
  classes: {
    valid: 'is-valid',
    invalid: 'is-invalid',
  },
});

Vue.component('validation-provider', ValidationProvider);
Vue.component('validation-observer', ValidationObserver);
