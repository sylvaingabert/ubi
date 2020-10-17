import { render } from '@testing-library/vue';
import '@testing-library/jest-dom';
import EmployeesList from '@/components/EmployeesList.vue';
import Employee from '@/models/Employee';

describe('EmployeesList.vue', () => {
  it('must mount with children', () => {
    const { getByTestId } = render(EmployeesList, {
      stubs: ['ubi-link'],
      props: {
        items: [
          new Employee(),
          new Employee(),
        ],
      },
    });
    const list = getByTestId('list');
    expect(list.children).toHaveLength(2);
  });
});
