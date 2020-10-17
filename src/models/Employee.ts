import qs from 'qs';
import { Model } from '@vuex-orm/core';
import { Response } from '@vuex-orm/plugin-axios';
import { AxiosResponse } from 'axios';
import isResponseOk from '@/helpers/isResponseOk';

export default class Employee extends Model {
  static entity = 'employees';

  static primaryKey = 'id';

  id!: string

  employee_name!: string

  employee_salary!: number

  employee_age!: number

  profile_image!: string

  static fields() {
    return {
      id: this.uid(),
      employee_name: this.string(''),
      employee_salary: this.number(0),
      employee_age: this.number(0),
      profile_image: this.string(''),
    };
  }

  set name(value: string) {
    this.employee_name = value;
    Employee.update(this);
  }

  get name(): string {
    return this.employee_name;
  }

  set salary(value: number) {
    this.employee_salary = value;
    Employee.update(this);
  }

  get salary(): number {
    return this.employee_salary;
  }

  set age(value: number) {
    this.employee_age = value;
    Employee.update(this);
  }

  get age(): number {
    return this.employee_age;
  }

  get photo(): string {
    return this.profile_image;
  }

  set photo(value: string) {
    this.profile_image = value;
    Employee.update(this);
  }

  static apiFetch(): Promise<Response> {
    return this.api().get('employees');
  }

  static apiFetchById(id: string): Promise<Response> {
    return this.api().get(`employee/${id}`);
  }

  static async apiPersist(data: Employee): Promise<Response> {
    const { id } = data;
    const toSend = {
      name: String(data.name).trim(),
      salary: data.salary,
      age: data.age,
      profile_image: String(data.photo).trim(),
    };
    const result = await this.api()
      .put(`update/${id}`, qs.stringify(toSend), {
        save: false,
        dataTransformer: (response) => ({
          id,
          employee_name: response.data.data.name || '',
          employee_age: parseInt(response.data.data.age, 10),
          employee_salary: parseFloat(response.data.data.salary),
          profile_image: response.data.data.profile_image || '',
        }),
      });

    if (isResponseOk(result.response as AxiosResponse)) {
      await result.save();
      return Promise.resolve(result);
    }
    return Promise.reject(result);
  }

  static async apiDelete(data: Employee): Promise<Response> {
    const id = String(data.id);
    const result = await this.api().delete(`delete/${id}`);

    if (isResponseOk(result.response as AxiosResponse)) {
      await Employee.softDelete(id);
      return Promise.resolve(result);
    }
    return Promise.reject(result);
  }

  static async apiCreate(data: Employee): Promise<Response> {
    const toSend = {
      name: String(data.name).trim(),
      salary: data.salary,
      age: data.age,
      profile_image: String(data.photo).trim(),
    };
    const result = await this.api()
      .post('create', qs.stringify(toSend), {
        save: false,
        dataTransformer: (response) => ({
          id: response.data.data.id,
          employee_name: String(response.data.data.name || '').trim(),
          employee_age: parseInt(response.data.data.age, 10),
          employee_salary: parseFloat(response.data.data.salary),
          profile_image: response.data.data.profile_image || '',
        }),
      });

    if (isResponseOk(result.response as AxiosResponse)) {
      await result.save();
      return Promise.resolve(result);
    }
    return Promise.reject(result);
  }
}
