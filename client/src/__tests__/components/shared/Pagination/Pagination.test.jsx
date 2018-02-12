import React from 'react';
import Pagination from '../../../../components/shared/Pagination';

const props = {
  items: [{ id: 1, recipeName: 'Rice' }, { id: 5, recipeName: 'Beans' }],
  onPageChange: jest.fn(),
  metadata: {
    firstPage: 1,
    lastPage: 3,
    page: 2,
    itemsPerPage: 5,
    pages: [1, 2, 3],
    totalCount: 13,
  }
};

const currentPageProps = {
  items: [{ id: 1, recipeName: 'Rice' }, { id: 5, recipeName: 'Beans' }],
  onPageChange: jest.fn(),
  metadata: {
    firstPage: 1,
    lastPage: 3,
    page: 1,
    itemsPerPage: 5,
    pages: [1, 2, 3],
    totalCount: 13,
  }
};

const lastPageProps = {
  items: [{ id: 1, recipeName: 'Rice' }, { id: 5, recipeName: 'Beans' }],
  onPageChange: jest.fn(),
  metadata: {
    firstPage: 1,
    lastPage: 3,
    page: 3,
    itemsPerPage: 5,
    pages: [1, 2, 3],
    totalCount: 13,
  }
};

const metadata = {
  firstPage: 1,
  lastPage: 1,
  page: 1,
  itemsPerPage: 2,
  pages: [1],
  totalCount: 2,
};

describe('Pagination', () => {
  it('renders correctly', () => {
    const mountedWrapper = mount(<Pagination {...props} />);
    expect(toJson(mountedWrapper)).toMatchSnapshot();
    mountedWrapper.unmount();
  });

  it('renders correctly when there is only one page', () => {
    const mountedWrapper = mount(<Pagination {...props} metadata={metadata} />);
    expect(toJson(mountedWrapper)).toMatchSnapshot();
    mountedWrapper.unmount();
  });

  it('disables first and previous links when current page == firstpage', () => {
    const mountedWrapper = mount(<Pagination {...currentPageProps} />);

    expect(toJson(mountedWrapper)).toMatchSnapshot();
    expect(mountedWrapper.find('li.page-item').at(0).hasClass('disabled')).toBeTruthy();
    expect(mountedWrapper.find('li.page-item').at(1).hasClass('disabled')).toBeTruthy();
    expect(mountedWrapper.find('li.page-item').at(5).hasClass('disabled')).toBeFalsy();
    expect(mountedWrapper.find('li.page-item').at(6).hasClass('disabled')).toBeFalsy();
    mountedWrapper.unmount();
  });

  it('goes to next page when next button is clicked', () => {
    const mountedWrapper = mount(<Pagination {...currentPageProps} />);

    const setPageSpy = jest.spyOn(mountedWrapper.instance(), 'setPage');

    mountedWrapper.find('a.page-link').at(5).simulate('click');

    expect(setPageSpy).toHaveBeenCalledWith(2);
    mountedWrapper.unmount();
  });

  it('goes to last page when last button is clicked', () => {
    const mountedWrapper = mount(<Pagination {...currentPageProps} />);

    const setPageSpy = jest.spyOn(mountedWrapper.instance(), 'setPage');

    mountedWrapper.find('a.page-link').at(6).simulate('click');

    expect(setPageSpy).toHaveBeenCalledWith(3);
    mountedWrapper.unmount();
  });

  it('disables first and previous links when current page == lastpage', () => {
    const mountedWrapper = mount(<Pagination {...lastPageProps} />);

    expect(toJson(mountedWrapper)).toMatchSnapshot();
    expect(mountedWrapper.find('li.page-item').at(5).hasClass('disabled')).toBeTruthy();
    expect(mountedWrapper.find('li.page-item').at(6).hasClass('disabled')).toBeTruthy();
    expect(mountedWrapper.find('li.page-item').at(0).hasClass('disabled')).toBeFalsy();
    expect(mountedWrapper.find('li.page-item').at(1).hasClass('disabled')).toBeFalsy();
    mountedWrapper.unmount();
  });

  it('goes to previous page when previous button is clicked', () => {
    const mountedWrapper = mount(<Pagination {...lastPageProps} />);

    const setPageSpy = jest.spyOn(mountedWrapper.instance(), 'setPage');

    mountedWrapper.find('a.page-link').at(1).simulate('click');

    expect(setPageSpy).toHaveBeenCalledWith(2);
    mountedWrapper.unmount();
  });

  it('goes to first page when first button is clicked', () => {
    const mountedWrapper = mount(<Pagination {...lastPageProps} />);

    const setPageSpy = jest.spyOn(mountedWrapper.instance(), 'setPage');

    mountedWrapper.find('a.page-link').at(0).simulate('click');

    expect(setPageSpy).toHaveBeenCalledWith(1);
    mountedWrapper.unmount();
  });

  it('goes to correct page when clicked: page 1', () => {
    const mountedWrapper = mount(<Pagination {...props} />);

    const setPageSpy = jest.spyOn(mountedWrapper.instance(), 'setPage');

    mountedWrapper.find('a.page-link').at(3).simulate('click');
    mountedWrapper.find('a.page-link').at(2).simulate('click');

    expect(setPageSpy).toHaveBeenCalledWith(1);
    mountedWrapper.unmount();
  });

  it('goes to correct page when clicked: page 2', () => {
    const mountedWrapper = mount(<Pagination {...props} />);

    const setPageSpy = jest.spyOn(mountedWrapper.instance(), 'setPage');

    mountedWrapper.find('a.page-link').at(3).simulate('click');

    expect(setPageSpy).toHaveBeenCalledWith(2);
    mountedWrapper.unmount();
  });

  it('goes to correct page when clicked: page 3', () => {
    const mountedWrapper = mount(<Pagination {...props} />);

    const setPageSpy = jest.spyOn(mountedWrapper.instance(), 'setPage');

    mountedWrapper.find('a.page-link').at(4).simulate('click');

    expect(setPageSpy).toHaveBeenCalledWith(3);
    mountedWrapper.unmount();
  });
});
