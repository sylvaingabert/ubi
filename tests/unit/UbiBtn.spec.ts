import { fireEvent, render } from '@testing-library/vue';
import '@testing-library/jest-dom';
import UbiBtn from '@/components/UbiBtn.vue';

describe('UbiBtn.vue', () => {
  it('should mount be a button of type "button"', () => {
    const type = 'button';
    const { getByTestId } = render(UbiBtn, {
      props: {
        type,
      },
    });
    expect(getByTestId('ubibtn')).toHaveAttribute('type', type);
  });

  it('must be a submit button', () => {
    const type = 'submit';
    const { getByTestId } = render(UbiBtn, {
      props: {
        type,
      },
    });
    expect(getByTestId('ubibtn')).toHaveAttribute('type', type);
  });

  it('must have a correct slot content', () => {
    const content = 'Ok';
    const { getByTestId } = render(UbiBtn, {
      slots: {
        default: content,
      },
    });
    expect(getByTestId('ubibtn')).toHaveTextContent(content);
  });

  it('must have a click listener', async () => {
    const spy = jest.fn();
    const { getByTestId } = render(UbiBtn, {
      slots: {
        default: 'Ok',
      },
      listeners: {
        click: spy,
      },
    });
    const btn = getByTestId('ubibtn');
    await fireEvent.click(btn);
    expect(spy).toHaveBeenCalledTimes(1);
  });
});
