<template>
  <ul
    class="employees-list"
    data-testid="list"
  >
    <employee-line
      v-for="(employee, index) in items"
      :key="index"
      :employee="employee"
      data-testid="item"
    />
  </ul>
</template>

<script lang="ts">
import { Component, Vue, Prop } from 'vue-property-decorator';
import EmployeeLine from '@/components/EmployeeLine.vue';
import Employee from '@/models/Employee';

@Component({
  components: {
    EmployeeLine,
  },
})
export default class EmployeesList extends Vue {
 @Prop({ type: Array, default: [] }) readonly items!: Employee[];
}
</script>

<style lang="scss" scoped>
.employees-list {
  display: block;
  margin: 0 auto;
  padding: 0;
}
</style>
