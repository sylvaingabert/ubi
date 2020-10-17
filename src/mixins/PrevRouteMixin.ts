import { Component, Vue } from 'vue-property-decorator';
import { Route } from 'vue-router';

interface PrevRouteI extends Vue {
  prevRoute: Route | null;
}

@Component({
  beforeRouteEnter(to, from, next) {
    next((vm) => {
      if (from) {
        (vm as PrevRouteI).prevRoute = from; /* eslint-disable-line no-param-reassign */
      }
    });
  },
})
export default class PrevRouteMixin extends Vue implements PrevRouteI {
  prevRoute = null;
}
