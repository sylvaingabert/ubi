<template>
  <div class="employee">
    <router-link :to="prevRouteTo">Retour</router-link>
    <template v-if="employee">
      <h1><input type="text" v-model="employee.name"></h1>
      <p>Salaire : <input type="text" v-model="employee.salary">€</p>
      <p>Age : <input type="number" min="1" max="130" step="1" v-model="employee.age"> ans</p>
      <button
        v-if="!saving"
        type="button"
        :disabled="saving"
        @click.prevent="onClickSave"
      >Enregistrer</button>

      <button
        v-if="!saving"
        type="button"
        :disabled="saving"
        @click.prevent="onClickDelete"
      >Supprimer</button>
    </template>
    <p v-else-if="!errorOccured">loading...</p>
  </div>
</template>

<script lang="ts">
import { Vue, Component, Watch } from 'vue-property-decorator';
import { Route } from 'vue-router';
import EmployeeModel from '@/models/Employee';
import EmployeesModule from '@/store/Employees';

interface EmployeeI extends Vue {
  prevRoute: Route | null;
}

@Component({
  beforeRouteEnter(to, from, next) {
    next((vm) => {
      (vm as EmployeeI).prevRoute = from; /* eslint-disable-line no-param-reassign */
    });
  },
})
export default class Employee extends Vue implements EmployeeI {
  private employeesModule = EmployeesModule;

  prevRoute = null;

  private routes = {
    home: { name: 'Home' },
  };

  get id(): string {
    return this.$route.params.id;
  }

  get employee() {
    return EmployeeModel.find(this.id); /* eslint-disable-line class-methods-use-this */
  }

  get saving() {
    return this.employeesModule.saving;
  }

  get errorOccured(): boolean {
    return this.employeesModule.errorOn !== '';
  }

  get prevRouteTo() {
    return this.prevRoute || this.routes.home;
  }

  @Watch('employeesModule.errorOn')
  onError() {
    this.$modal.show('dialog', {
      title: 'Erreur',
      text: this.employeesModule.errorUserMessage,
      buttons: [
        {
          title: 'Ok',
          handler: () => {
            window.location.reload();
          },
        },
      ],
    });
  }

  onClickSave() {
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
            if (this.employee) {
              await this.employeesModule.deleteEmployee(this.employee);
              this.$router.push(this.prevRouteTo);
            }
          },
        },
      ],
    });
  }

  async mounted() {
    await this.employeesModule.fetchById(this.id);
  }
}
</script>
