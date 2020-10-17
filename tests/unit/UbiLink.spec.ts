import { render } from '@testing-library/vue';
import '@testing-library/jest-dom';
import UbiLink from '@/components/UbiLink.vue';

describe('UbiBtn.vue', () => {
  it('must have a correct slot content', () => {
    const content = 'my link';
    const { getByTestId } = render(UbiLink, {
      stubs: ['router-link'],
      slots: {
        default: content,
      },
    });
    const link = getByTestId('ubilink');
    expect(link).toHaveTextContent(content);
  });
});
