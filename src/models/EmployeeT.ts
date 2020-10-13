export interface EmployeeApiDataI {
    id: string;
    employee_age: number;
    employee_name: string;
    employee_salary: number;
    profile_image: string;
}

export interface EmployeeAttributesI {
  id: string;
  name: string;
  salary: number;
  age: number;
  photo: string;
}

export interface EmployeeApiResponseI {
  data: EmployeeApiDataI;
}
