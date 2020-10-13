import {
  getModule,
  Module,
  VuexModule,
  Mutation,
  Action,
} from 'vuex-module-decorators';
import { Response } from '@vuex-orm/plugin-axios';
import store from '@/store/store';
import EmployeeModel from '@/models/Employee';
import errorTypes from '@/config/errorTypes';

interface InitPayloadT {
    page?: string;
    search?: string;
}

interface ErrorI {
  error: Error;
  on: string;
}

@Module({
  dynamic: true,
  name: 'employees',
  namespaced: false,
  store,
})
class Employees extends VuexModule {
  public page = 1;

  public total = 0;

  public search = '';

  public saving = false;

  public error: Error | void = undefined;

  public errorOn = '';

  private limit = 5;

  private employeeModel = EmployeeModel;

  get offset() {
    return (this.page - 1) * this.limit;
  }

  get searchResults() {
    return EmployeeModel.query()
      .search(this.search)
      .limit(this.limit)
      .offset(this.offset)
      .get();
  }

  get pagesNumber(): number {
    return Math.ceil(this.total / this.limit);
  }

  get numInCurrentPage(): number {
    return this.total - (this.page - 1) * this.limit;
  }

  get errorUserMessage(): string {
    switch (this.errorOn) {
      case errorTypes.FETCH:
        return "Une erreur s'est produite lors de la récupération des données. Veuillez recharger la page.";
      default:
        return "Une erreur inconnue s'est produite.";
    }
  }

  @Mutation
  public SET_SAVING(value: boolean) {
    this.saving = value;
  }

  @Mutation
  public SET_ERROR(payload: ErrorI) {
    this.error = payload.error;
    this.errorOn = payload.on;
  }

  @Mutation
  public SET_SEARCH(value: string) {
    this.search = value;
  }

  @Mutation
  public SET_PAGE(value: number) {
    this.page = value;
  }

  @Mutation
  public CALC_TOTAL() {
    this.total = EmployeeModel.query().search(this.search).get().length;
  }

  @Action
  public setPage(value: number) {
    this.SET_PAGE(value);
  }

  @Action
  public resetSearch(value: string) {
    this.SET_SEARCH(value);
    this.SET_PAGE(1);
    this.CALC_TOTAL();
  }

  @Action
  public async init(payload: InitPayloadT) {
    await this.fetchAll();
    this.resetSearch(payload.search || '');
    const page = (payload.page) ? parseInt(payload.page, 10) : 1;
    this.SET_PAGE(page);
  }

  @Action
  public async fetchAll() {
    return EmployeeModel.apiFetch()
      .catch((err) => {
        this.SET_ERROR({ error: err, on: errorTypes.FETCH_ALL });
      });
  }

  @Action
  public async fetchById(id: string) {
    try {
      await EmployeeModel.apiFetchById(id);
    } catch (err) {
      this.SET_ERROR({ error: err, on: errorTypes.FETCH });
    }
  }

  @Action({ rawError: true })
  public async saveEmployee(employee: EmployeeModel) {
    this.SET_SAVING(true);
    return EmployeeModel.apiPersist(employee)
      .catch((err) => {
        this.SET_ERROR({ error: err, on: errorTypes.SAVE });
        return Promise.reject(err);
      })
      .finally(() => {
        this.SET_SAVING(false);
      });
  }

  @Action
  public deleteEmployee(employee: EmployeeModel): Promise<void | Response> {
    this.SET_SAVING(true);
    return EmployeeModel.apiDelete(employee)
      .then(() => {
        this.CALC_TOTAL();
      })
      .catch((err) => {
        this.SET_ERROR({ error: err, on: errorTypes.DELETE });
        return Promise.reject();
      })
      .finally(() => {
        this.SET_SAVING(false);
      });
  }
}

export default getModule(Employees);
