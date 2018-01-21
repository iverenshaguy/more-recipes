import React from 'react';
import { RenderFileInput } from '../index';

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

  // const dirtyProps = {
  //   input: { name: 'pic' },
  //   type: 'file',
  //   meta: {
  //     touched: true,
  //     error: 'This is an error'
  //   }
  // };

  it('renders correctly', () => {
    const mountedWrapper = mount(<RenderFileInput {...cleanProps} />);
    expect(toJson(mountedWrapper)).toMatchSnapshot();
    mountedWrapper.unmount();
  });

  it('renders correctly with image preview', () => {
    const mountedWrapper = mount(<RenderFileInput {...touchedProps} />);
    expect(toJson(mountedWrapper)).toMatchSnapshot();
    mountedWrapper.unmount();
  });

  // it('loads file into image preview when selected', () => {
  //   const mountedWrapper = mount(<RenderFileInput {...touchedProps} />);
  //   const preview = mountedWrapper.find('img.photo-preview');

  //   console.log(mountedWrapper.find('input').simulate('change'));

  //   const fileContents = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAOEAAADhCAMAAAAJbSJIAAAAUVBMVEX///8AAABkZGTAwMAaGhqsrKzb29t8fHyKioo9PT3MzMwcHBzDw8OGhoaoqKjp6emfn59ERETy8vJfX19zc3MyMjKxsbFMTEzOzs4JCQkTExORgjcqAAABLklEQVR4nO3Yy1ICMRRFURARoUEQ5aH//6FOmJEiDBrSp11rfqvOrswymQAAAAAAAAAAAADA023er2yOrUf1alrw0npUrxTmU5hPYT6F+RTmU5hPYT6F+RTmU5hPYT6F+RTmU5hPYT6FA7ef1axLhad17Wy1b512sSrt78PhrXXaxcMKlwqfZfyF59EXjv8NFSpU2J5ChQrbU6hQYXvjLzxPX2/rutL+n65y9nsaSuH2Y15xLBV+1q7ms6H8RN2hVBj0m3gHhfkU5lOYT2E+hfkU5lOYT2E+hfkU5lOYT2E+hfkU5lOYT2E+hfkU5lOYT2E+hfkU5lOYT2E+hfkU5lOYT2E+hfkU5lOYT2E+hfkU5lOYr1T41XpUr74X13atRwEAAAAAAAAAAADwH/0BIuUXeviAMRwAAAAASUVORK5CYII=';
  //   const file = new File([fileContents], { type: 'image/png' });
  //   const readAsDataURL = jest.fn();
  //   const onload = jest.fn(() => {
  //     if (preview) {
  //       preview.src = fileContents;
  //     }
  //   });
  //   const dummyFileReader = { onload, readAsDataURL, result: fileContents };
  //   window.FileReader = jest.fn(() => dummyFileReader);

  //   mountedWrapper.find('input').simulate('change', {
  //     target: {
  //       files: [
  //         // import('./testfile.png')
  //         file
  //       ]
  //     }
  //   });

  //   expect(toJson(mountedWrapper)).toMatchSnapshot();
  //   expect(FileReader).toHaveBeenCalled();
  //   expect(onload).toHaveBeenCalledWith();
  //   expect(readAsDataURL).toHaveBeenCalledWith(file);
  //   expect(mountedWrapper.find('img[src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAOEAAADhCAMAAAAJbSJIAAAAUVBMVEX///8AAABkZGTAwMAaGhqsrKzb29t8fHyKioo9PT3MzMwcHBzDw8OGhoaoqKjp6emfn59ERETy8vJfX19zc3MyMjKxsbFMTEzOzs4JCQkTExORgjcqAAABLklEQVR4nO3Yy1ICMRRFURARoUEQ5aH//6FOmJEiDBrSp11rfqvOrswymQAAAAAAAAAAAADA023er2yOrUf1alrw0npUrxTmU5hPYT6F+RTmU5hPYT6F+RTmU5hPYT6F+RTmU5hPYT6FA7ef1axLhad17Wy1b512sSrt78PhrXXaxcMKlwqfZfyF59EXjv8NFSpU2J5ChQrbU6hQYXvjLzxPX2/rutL+n65y9nsaSuH2Y15xLBV+1q7ms6H8RN2hVBj0m3gHhfkU5lOYT2E+hfkU5lOYT2E+hfkU5lOYT2E+hfkU5lOYT2E+hfkU5lOYT2E+hfkU5lOYT2E+hfkU5lOYT2E+hfkU5lOYT2E+hfkU5lOYr1T41XpUr74X13atRwEAAAAAAAAAAADwH/0BIuUXeviAMRwAAAAASUVORK5CYII="]')).toBeTruthy();
  //   mountedWrapper.unmount();
  // });

  // it('shows error when found', () => {
  //   const mountedWrapper = mount(<RenderFileInput {...dirtyProps} />);

  //   expect(toJson(mountedWrapper)).toMatchSnapshot();
  //   expect(mountedWrapper.find('.invalid-feedback').text()).toEqual('This is an error');
  //   expect(mountedWrapper.find('input').hasClass('is-invalid')).toBeTruthy();
  //   mountedWrapper.unmount();
  // });

  // it('shows \'Checking\' when async validating', () => {
  //   const mountedWrapper = mount(<RenderFileInput
  //     {...cleanProps}
  //     meta={{ asyncValidating: true, touched: true }}
  //   />);

  //   expect(toJson(mountedWrapper)).toMatchSnapshot();
  //   expect(mountedWrapper.find('small').hasClass('form-text')).toBeTruthy();
  //   expect(mountedWrapper.find('small').text()).toEqual('Checking...');
  //   mountedWrapper.unmount();
  // });
});
