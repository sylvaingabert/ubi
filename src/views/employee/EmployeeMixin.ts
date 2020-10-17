import { Component, Vue, Watch } from 'vue-property-decorator';
import EmployeesModule from '@/store/Employees';
import errorTypes from '@/types/errorTypes';

@Component
export default class EmployeeMixin extends Vue {
  employeesModule = EmployeesModule;

  @Watch('employeesModule.errorOn')
  onError(value: string) {
    if (value === '') {
      return;
    }

    this.$modal.show('dialog', {
      title: 'Erreur',
      text: this.employeesModule.errorUserMessage,
      buttons: [
        {
          title: 'Ok',
          handler: () => {
            this.$modal.hide('dialog');
            if (value === errorTypes.FETCH) {
              window.location.reload();
            }
          },
        },
      ],
    });
  }
}
