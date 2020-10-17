<template>
  <div>
    <employee-form
      :employee="employee"
      :fieds-disabled="fiedsDisabled"
      :display-id="false"
      @submit="onSubmit"
    >
      <template slot="title">
        Création d'un employé
      </template>
      <template slot="buttons">
        <ubi-btn
          type="submit"
          :disabled="fiedsDisabled"
          modifier="primary"
          data-testid="savebtn"
        >
          Ajouter
        </ubi-btn>
      </template>
    </employee-form>
  </div>
</template>

<script lang="ts">
import { Component, Mixins } from 'vue-property-decorator';
import Employee from '@/models/Employee';
import EmployeeForm from '@/views/employee/EmployeeForm.vue';
import EmployeeMixin from '@/views/employee/EmployeeMixin';
import routesNames from '@/router/routesNames';

@Component({
  components: {
    EmployeeForm,
  },
  metaInfo() {
    return {
      title: 'Ubi - Créer un employé',
    };
  },
})
export default class EmployeeCreate extends Mixins(EmployeeMixin) {
  employee = new Employee();

  get fiedsDisabled(): boolean {
    return this.employeesModule.saving;
  }

  onSubmit() {
    this.employeesModule.createEmployee(this.employee)
      .then(() => {
        this.$modal.show('dialog', {
          title: "L'employé a bien été créé",
          text: '',
          buttons: [
            {
              title: 'Ok',
              handler: () => {
                this.$modal.hide('dialog');
                this.$router.push({ name: routesNames.HOME });
              },
            },
          ],
        });
      });
  }
}
</script>
