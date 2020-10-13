<template>
    <li class="flex bg-white odd:bg-gray-200">
        <div class="flex-shrink">{{ employee.id }}</div>
        <div class="flex-1 flex-grow">{{ employee.name }}</div>
        <div class="flex-1 flex-grow">
            <router-link :to="{ name: 'Profile', params: { id: employee.id } }">Voir</router-link>
        </div>
    </li>
</template>

<script lang="ts">
import { Vue, Component, Prop } from 'vue-property-decorator';
import EmployeeModel from '@/models/Employee';

@Component
export default class EmployeeLine extends Vue {
  @Prop() readonly employee!: EmployeeModel;
}
</script>
