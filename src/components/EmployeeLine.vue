<template>
  <li
    v-if="employee"
    class="employee-line"
  >
    <span
      class="col col--1"
      data-testid="name"
    >{{ employee.name }}</span>
    <div class="col">
      <ubi-link
        :to="profileRoute"
        modifier="primary"
        data-testid="link"
      >
        Voir
      </ubi-link>
    </div>
  </li>
</template>

<script lang="ts">
import { Vue, Component, Prop } from 'vue-property-decorator';
import { Location } from 'vue-router';
import EmployeeModel from '@/models/Employee';
import routesNames from '@/router/routesNames';

@Component
export default class EmployeeLine extends Vue {
  @Prop({ type: EmployeeModel, required: true }) readonly employee!: EmployeeModel;

  get profileRoute(): Location {
    return {
      name: routesNames.EMPLOYEE_UPDATE,
      params: {
        id: this.employee.id,
      },
    };
  }
}
</script>

<style lang="scss" scoped>
.employee-line {
  display: flex;
  align-items: center;
  padding: 0.5rem;

  &:nth-child(odd) {
    background: $alternateBkg;
  }
}

.col {
  &--1 {
    flex-grow: 1;
    padding: 0 0.5rem;
    text-align: left;
  }
}
</style>
