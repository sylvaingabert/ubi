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
import errorTypes from '@/types/errorTypes';

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

  private orderBy = 'employee_name';

  public search = '';

  public saving = false;

  public fetching = false;

  public error: Error | void = undefined;

  public errorOn = '';

  private limit = 10;

  private itemsFetched = false;

  get offset() {
    return (this.page - 1) * this.limit;
  }

  get searchResults() {
    if (this.search === '') {
      return EmployeeModel.query()
        .orderBy(this.orderBy)
        .limit(this.limit)
        .offset(this.offset)
        .get();
    }
    return EmployeeModel.query()
      .search(this.search)
      .orderBy(this.orderBy)
      .limit(this.limit)
      .offset(this.offset)
      .get();
  }

  get total(): number {
    return EmployeeModel.query().get().length;
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
      case errorTypes.DELETE:
        return "Une erreur s'est produite lors de la suppression des données.";
      case errorTypes.SAVE:
        return "Une erreur s'est produite lors de la sauvegarde des données.";
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
  public UNSET_ERROR() {
    this.error = undefined;
    this.errorOn = '';
  }

  @Mutation
  public SET_SEARCH(value: string) {
    this.search = value;
  }

  @Mutation
  public SET_FETCHING(value: boolean) {
    this.fetching = value;
  }

  @Mutation
  public SET_PAGE(value: number) {
    this.page = value;
  }

  @Mutation
  public SET_ITEMS_FETCHED() {
    this.itemsFetched = true;
  }

  @Action
  public setPage(value: number) {
    this.SET_PAGE(value);
  }

  @Action
  public resetSearch(value: string) {
    this.SET_SEARCH(value);
    this.SET_PAGE(1);
  }

  @Action({ rawError: true })
  public async init(payload: InitPayloadT) {
    if (!this.itemsFetched) {
      this.fetchAll()
        .then(() => {
          this.SET_ITEMS_FETCHED();
        })
        .catch(() => null);
    }
    this.resetSearch(payload.search || '');
    const page = (payload.page) ? parseInt(payload.page, 10) : 1;
    this.SET_PAGE(page);
  }

  @Action({ rawError: true })
  public async fetchAll(): Promise<Response> {
    this.UNSET_ERROR();
    return EmployeeModel.apiFetch()
      .catch((err) => {
        this.SET_ERROR({ error: err, on: errorTypes.FETCH_ALL });
        return Promise.reject(err);
      });
  }

  @Action({ rawError: true })
  public async fetchById(id: string): Promise<Response> {
    this.UNSET_ERROR();
    this.SET_FETCHING(true);
    return EmployeeModel.apiFetchById(id)
      .catch((err) => {
        this.SET_ERROR({ error: err, on: errorTypes.FETCH });
        return Promise.reject(err);
      })
      .finally(() => {
        this.SET_FETCHING(false);
      });
  }

  @Action({ rawError: true })
  public async saveEmployee(employee: EmployeeModel): Promise<Response> {
    this.SET_SAVING(true);
    this.UNSET_ERROR();
    return EmployeeModel.apiPersist(employee)
      .catch((err) => {
        this.SET_ERROR({ error: err, on: errorTypes.SAVE });
        return Promise.reject(err);
      })
      .finally(() => {
        this.SET_SAVING(false);
      });
  }

  @Action({ rawError: true })
  public deleteEmployee(employee: EmployeeModel): Promise<Response> {
    this.SET_SAVING(true);
    this.UNSET_ERROR();
    return EmployeeModel.apiDelete(employee)
      .catch((err) => {
        this.SET_ERROR({ error: err, on: errorTypes.DELETE });
        return Promise.reject(err);
      })
      .finally(() => {
        this.SET_SAVING(false);
      });
  }

  @Action({ rawError: true })
  public createEmployee(employee: EmployeeModel): Promise<Response> {
    this.SET_SAVING(true);
    this.UNSET_ERROR();
    return EmployeeModel.apiCreate(employee)
      .catch((err) => {
        this.SET_ERROR({ error: err, on: errorTypes.CREATE });
        return Promise.reject(err);
      })
      .finally(() => {
        this.SET_SAVING(false);
      });
  }
}

export default getModule(Employees);
