<template>
  <div>
    <employee-form
      v-if="loading"
      :employee="employee"
      :fieds-disabled="fiedsDisabled"
      @submit="onSubmit"
    >
      <template slot="title">
        Edition de l'employé
      </template>
      <template slot="buttons">
        <ubi-btn
          type="submit"
          :disabled="fiedsDisabled"
          modifier="primary"
          data-testid="savebtn"
        >
          Enregistrer
        </ubi-btn>

        <ubi-btn
          type="submit"
          :disabled="fiedsDisabled"
          modifier="delete"
          data-testid="deletebtn"
          @click.prevent="onClickDelete"
        >
          Supprimer
        </ubi-btn>
      </template>
    </employee-form>
    <p
      v-else-if="!errorOccured"
      class="loading"
    >
      loading...
    </p>
  </div>
</template>

<script lang="ts">
import { Component, Mixins } from 'vue-property-decorator';
import EmployeeModel from '@/models/Employee';
import waitForModalToBeHidden from '@/helpers/waitForModalToBeHidden';
import EmployeeForm from '@/views/employee/EmployeeForm.vue';
import EmployeeMixin from '@/views/employee/EmployeeMixin';
import routesNames from '@/router/routesNames';

@Component({
  components: {
    EmployeeForm,
  },
  metaInfo() {
    return {
      title: "Ubi - Editer l'employé",
    };
  },
})
export default class EmployeeUpdate extends Mixins(EmployeeMixin) {
  get id(): string {
    return this.$route.params.id;
  }

  get employee() {
    return EmployeeModel.find(this.id); /* eslint-disable-line class-methods-use-this */
  }

  get loading(): boolean {
    return !!this.employee;
  }

  get fiedsDisabled(): boolean {
    return this.employeesModule.fetching || this.employeesModule.saving;
  }

  get saving(): boolean {
    return this.employeesModule.saving;
  }

  get errorOccured(): boolean {
    return this.employeesModule.errorOn !== '';
  }

  onSubmit() {
    if (this.employee) {
      this.employeesModule.saveEmployee(this.employee);
    }
  }

  async onClickDelete() {
    this.$modal.show('dialog', {
      title: 'Voulez-vous vraiment supprimer cet employé ?',
      text: '',
      buttons: [
        {
          title: 'Annuler',
          handler: async () => {
            this.$modal.hide('dialog');
          },
        },
        {
          title: 'Supprimer',
          handler: async () => {
            this.$modal.hide('dialog');

            // On attends que la modal soit bien fermée pour pouvoir la réouvrir
            // avec une alerte en cas d'erreur de l'api
            await waitForModalToBeHidden();
            if (this.employee) {
              this.employeesModule.deleteEmployee(this.employee)
                .then(() => {
                  this.$router.push({ name: routesNames.HOME });
                });
            }
          },
        },
      ],
    });
  }

  async mounted() {
    if (EmployeeModel.find(this.id) === null) {
      await this.employeesModule.fetchById(this.id);
    }
  }
}
</script>

<style lang="scss">
.loading {
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translateX(-50%) translateY(-50%);
}
</style>
