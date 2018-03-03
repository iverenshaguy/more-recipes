import React from 'react';
import { MemoryRouter } from 'react-router-dom';
import { arrayToObject } from '../../utils';
import { formHelpers } from '../../helpers';
import { FormComponent } from '../../components/shared/Forms';

const { formFields } = formHelpers;
const dispatchMock = jest.fn();
const formComponentSetup = (type) => {
  const props = {
    type,
    state: {
      values: arrayToObject(formFields[type], ''),
      touched: arrayToObject(formFields[type], false),
      error: arrayToObject(formFields[type], null),
      pristine: true,
      formValid: false,
      asyncValidating: false,
      rating: 0
    },
    handlers: {
      handleBlur: jest.fn(),
      handleChange: jest.fn(),
      handleFocus: jest.fn(),
      handleSubmit: jest.fn()
    }
  };

  return { props };
};

const mainFormSetup = (type, meta) => {
  const props = {
    submitting: false,
    submitError: null,
    type,
    meta
  };

  const mountRoot = mount( //eslint-disable-line
    <MemoryRouter>
      <FormComponent {...props} dispatch={dispatchMock} />
    </MemoryRouter>);

  const shallowRoot = shallow(<FormComponent {...props} dispatch={dispatchMock} />);

  return {
    props, dispatchMock, mountRoot, shallowRoot
  };
};

export default { formComponentSetup, mainFormSetup };
