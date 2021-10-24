import React, { useState } from 'react';
import PropTypes from 'prop-types';
import ReactPaginate from 'react-paginate';
import './style.scss';

export default function Paging({ onPage, page, perPage, total }) {
  const [{ isOnLoad }, setLoad] = useState({ isOnLoad: true });
  const handlePageClick = async (data, selected) => {
    const params = new URLSearchParams(window.location.search);
    let query = '';
    let hasPage = false;
    let canQuery = true;
    const selectedPage = selected;
    params.forEach((value, key) => {
      if (key === 'page') {
        query += `${query ? '&' : ''}${key}=${selectedPage}`;
        hasPage = true;
        canQuery = value !== selectedPage;
      } else {
        query += `${query ? '&' : ''}${key}=${value}`;
      }
    });
    if (!hasPage) {
      canQuery = false;
      if (query === '' && selectedPage > 1) {
        query += `${query ? '&' : ''}page=${selectedPage}`;
        canQuery = true;
      } else {
        query += `${query ? '&' : ''}page=${selectedPage}`;
        canQuery = true;
      }
    }
    if (canQuery && !isOnLoad) {
      onPage(query);
    }
  };

  return (
    <React.Fragment>
      <ReactPaginate
        previousLabel="previous"
        nextLabel="next"
        breakLabel="..."
        breakClassName="break-me"
        pageCount={Math.ceil(total / perPage)}
        initialPage={page - 1}
        forcePage={page - 1}
        marginPagesDisplayed={2}
        pageRangeDisplayed={5}
        onPageChange={data => {
          handlePageClick(data, data.selected + 1);
          setLoad({ isOnLoad: false });
        }}
        containerClassName="pagination"
        subContainerClassName="pages pagination"
        activeClassName="active"
      />
    </React.Fragment>
  );
}

Paging.propTypes = {
  onPage: PropTypes.func,
  page: PropTypes.number,
  perPage: PropTypes.number,
  total: PropTypes.number,
};
