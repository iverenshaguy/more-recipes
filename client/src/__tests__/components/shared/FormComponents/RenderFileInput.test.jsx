import React from 'react';
import { RenderFileInput } from '../../../../components/shared/FormComponents/RenderFileInput';

describe('Form Components: RenderFileInput', () => {
  const cleanProps = {
    input: { name: 'pic' },
    type: 'file',
    meta: {
      touched: false,
      error: null
    }
  };

  const touchedProps = {
    input: { name: 'pic' },
    type: 'file',
    meta: {
      touched: true,
      error: null
    }
  };

  const dirtyProps = {
    input: { name: 'pic' },
    type: 'file',
    meta: {
      touched: true,
      error: 'This is an error'
    }
  };

  it('renders correctly', () => {
    const mountedWrapper = mount(<RenderFileInput {...cleanProps} />);
    expect(toJson(mountedWrapper)).toMatchSnapshot();
    mountedWrapper.unmount();
  });

  it('renders correctly when touched', () => {
    const mountedWrapper = mount(<RenderFileInput {...touchedProps} />);
    expect(toJson(mountedWrapper)).toMatchSnapshot();
    mountedWrapper.unmount();
  });

  it('renders correctly with errors', () => {
    const mountedWrapper = mount(<RenderFileInput {...dirtyProps} />);

    expect(toJson(mountedWrapper)).toMatchSnapshot();
    expect(mountedWrapper.find('.file-feedback')).toBeTruthy();
    mountedWrapper.unmount();
  });
});
