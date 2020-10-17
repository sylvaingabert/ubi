import { render } from '@testing-library/vue';
import '@testing-library/jest-dom';
import store from '@/store/store';
import EmployeeLine from '@/components/EmployeeLine.vue';
import Employee from '@/models/Employee';

describe('EmployeeLine.vue', () => {
  it('must mount with children', () => {
    const employee = new Employee();
    employee.id = '1';
    employee.name = 'Jean';
    employee.salary = 38000;
    employee.age = 32;
    const { getByTestId } = render(EmployeeLine, {
      stubs: ['ubi-link'],
      store,
      props: {
        employee,
      },
    });
    const name = getByTestId('name');
    expect(name).toHaveTextContent('Jean');
  });
});
