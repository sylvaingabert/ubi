import qs from 'qs';
import { Model } from '@vuex-orm/core';
import { Response } from '@vuex-orm/plugin-axios';

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

  static apiFetch(): Promise<Response> {
    return this.api().get('employees');
  }

  static apiFetchById(id: string): Promise<Response> {
    return this.api().get(`employee/${id}`);
  }

  static apiPersist(data: Employee): Promise<Response> {
    const { id } = data;
    return this.api().put(`update/${id}`, qs.stringify({
      name: data.name,
      salary: data.salary,
      age: data.age,
    }), {
      dataTransformer: (response) => ({
        id,
        employee_name: response.data.data.name,
        employee_age: parseInt(response.data.data.age, 10),
        employee_salary: parseFloat(response.data.data.salary),
      }),
    });
  }

  static apiDelete(data: Employee): Promise<void | Response> {
    const id = String(data.id);
    return this.api().delete(`delete/${id}`)
      .then(() => {
        Employee.softDelete(id);
      });
  }
}
