import React, { Component } from 'react';
import { Pagination as PaginationWrapper, PaginationItem, PaginationLink } from 'reactstrap';
import PropTypes from 'prop-types';
import { multiRecipePropTypes } from '../../../helpers/proptypes';
import './Pagination.scss';

/**
 * @exports
 * @class Pagination
 * @extends Component
 * @returns {component} Pagination
 */
class Pagination extends Component {
  static propTypes = {
    items: PropTypes.arrayOf(PropTypes.any).isRequired,
    onPageChange: PropTypes.func.isRequired,
    ...multiRecipePropTypes.metadata
  };

  /**
   * @constructor
   * @memberof Pagination
   * @param {object} props
   * @returns {nothing} - Returns nothing
   */
  constructor(props) {
    super(props);

    this.state = {
      pager: {}
    };
  }

  /**
   * @memberof Pagination
   * @return {nothing} Returns nothing
   */
  componentWillMount() {
    const { metadata } = this.props;
    const {
      totalCount, page, itemsPerPage, firstPage, lastPage, pages
    } = metadata;

    if (this.props.items && this.props.items.length) {
      this.setState({
        pager: {
          initialPage: firstPage,
          currentPage: page,
          totalPages: pages.length,
          pages,
          itemsPerPage,
          totalCount,
          lastPage
        }
      });
    }
  }

  /**
   * @memberof Pagination
   * @param {number} page
   * @return {nothing} Returns nothing
   */
  setPage(page) {
    // call change page function in parent component
    this.props.onPageChange(page);
  }

  /**
   * @memberof Pagination
   * @returns {component} Pagination
   */
  render() {
    const { pager } = this.state;

    if (!pager.pages || pager.pages.length <= 1) {
      // don't display pager if there is only 1 page
      return null;
    }

    return (
      <div className="mt-5">
        <nav aria-label="Page navigation">
          <PaginationWrapper className="justify-content-center">
            <PaginationItem className={`${pager.currentPage === 1 ? 'disabled' : ''}`}>
              <PaginationLink onClick={() => this.setPage(1)}>
                First
              </PaginationLink>
            </PaginationItem>
            <PaginationItem className={`${pager.currentPage === 1 ? 'disabled' : ''}`}>
              <PaginationLink onClick={() => this.setPage(pager.currentPage - 1)}>
                <span aria-hidden="true">&laquo;</span>
                <span className="sr-only">Previous</span>
              </PaginationLink>
            </PaginationItem>
            {pager.pages.map(page => (
              <PaginationItem
                key={page}
                className={`${pager.currentPage === page ? 'active' : ''}`}
              >
                <PaginationLink onClick={() => this.setPage(page)}>
                  {page}
                </PaginationLink>
              </PaginationItem>
            ))}
            <PaginationItem className={`${pager.currentPage === pager.totalPages ? 'disabled' : ''}`}>
              <PaginationLink onClick={() => this.setPage(pager.currentPage + 1)}>
                <span aria-hidden="true">&raquo;</span>
                <span className="sr-only">Next</span>
              </PaginationLink>
            </PaginationItem>
            <PaginationItem className={`${pager.currentPage === pager.totalPages ? 'disabled' : ''}`}>
              <PaginationLink onClick={() => this.setPage(pager.totalPages)}>
                Last
              </PaginationLink>
            </PaginationItem>
          </PaginationWrapper>
        </nav>
      </div>
    );
  }
}

export default Pagination;
