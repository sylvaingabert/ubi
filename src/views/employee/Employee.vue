<template>
  <main class="container employee">
    <employee-top
      :prev-route="getPrevRouteTo(prevRoute)"
    />
    <router-view />
  </main>
</template>

<script lang="ts">
import { Component, Mixins } from 'vue-property-decorator';
import { Location, Route } from 'vue-router';
import routesNames from '@/router/routesNames';
import EmployeeTop from '@/views/employee/EmployeeTop.vue';
import EmployeeMixin from '@/views/employee/EmployeeMixin';
import PrevRouteMixin from '@/mixins/PrevRouteMixin';

@Component({
  components: {
    EmployeeTop,
  },
})
export default class Employee extends Mixins(PrevRouteMixin, EmployeeMixin) {
  private routes = {
    home: { name: routesNames.HOME },
  };

  getPrevRouteTo(prevRoute: Route | null): Location {
    if (prevRoute) {
      return (prevRoute as Location);
    }
    return this.routes.home;
  }
}
</script>

<style lang="scss" scoped>
@import '@/assets/style/views/employee.scss';
</style>
