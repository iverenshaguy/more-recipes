import React from 'react';
import { RenderInput } from '../index';

describe('Form Components: RenderInput', () => {
  const cleanProps = {
    input: { name: 'email' },
    placeholder: 'jane',
    type: 'email',
    meta: {
      touched: false,
      error: null,
      asyncValidating: false
    }
  };

  const dirtyProps = {
    input: { name: 'email' },
    placeholder: 'jane',
    type: 'email',
    meta: {
      touched: true,
      error: 'This is an error',
      asyncValidating: false
    }
  };

  it('renders correctly', () => {
    const mountedWrapper = mount(<RenderInput {...cleanProps} />);
    expect(toJson(mountedWrapper)).toMatchSnapshot();
    expect(mountedWrapper.find('div.invalid-feedback').exists()).toBeFalsy();
    expect(mountedWrapper.find('input').hasClass('is-invalid')).toBeFalsy();
    mountedWrapper.unmount();
  });

  it('shows error when found', () => {
    const mountedWrapper = mount(<RenderInput {...dirtyProps} />);

    expect(toJson(mountedWrapper)).toMatchSnapshot();
    expect(mountedWrapper.find('.invalid-feedback').text()).toEqual('This is an error');
    expect(mountedWrapper.find('input').hasClass('is-invalid')).toBeTruthy();
    mountedWrapper.unmount();
  });

  it('shows \'Checking\' when async validating', () => {
    const mountedWrapper = mount(<RenderInput
      {...cleanProps}
      meta={{ asyncValidating: true, touched: true }}
    />);

    expect(toJson(mountedWrapper)).toMatchSnapshot();
    expect(mountedWrapper.find('small').hasClass('form-text')).toBeTruthy();
    expect(mountedWrapper.find('small').text()).toEqual('Checking...');
    mountedWrapper.unmount();
  });
});
