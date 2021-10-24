/* eslint-disable react/no-array-index-key */
/* eslint-disable react/prop-types */
import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import {
  Select,
  Option,
  Pagination,
  PaginationItem,
  PaginationLink,
} from '@bootstrap-styled/v4';

function StyledPagination(props) {
  let startPage = 1;
  let endPage = 5;
  const [pages, setPages] = useState([]);
  useEffect(() => {
    const getPages = [...Array(endPage + 1 - startPage).keys()].map(
      i => startPage + i,
    );
    setPages(getPages);
  }, []);

  function updatePage(currentPage) {
    if (currentPage <= 3) {
      startPage = 1;
      endPage = 5;
    } else if (currentPage + 2 >= props.totalPages) {
      startPage = props.totalPages - 4 === 0 ? 1 : props.totalPages - 4;
      endPage =
        props.totalPages - 4 === 0 ? props.totalPages + 1 : props.totalPages;
    } else {
      startPage = currentPage - 2;
      endPage = currentPage + 2;
    }
    const getPages = [...Array(endPage + 1 - startPage).keys()].map(
      i => startPage + i,
    );
    setPages(getPages);
    return pages;
  }
  return (
    <Pagination>
      <PaginationItem className={props.pageNo === 1 ? 'active' : ''}>
        <PaginationLink
          href="#"
          onClick={() => {
            updatePage(1);
            props.setPageNo(1);
            props.onChangePage();
          }}
        >
          First
        </PaginationLink>
      </PaginationItem>
      <PaginationItem>
        <PaginationLink
          previous
          disabled={props.pageNo <= 1}
          href="#"
          onClick={() => {
            const previousPage = props.pageNo - 1;
            if (previousPage >= 1) {
              updatePage(previousPage);
              props.setPageNo(previousPage);
              props.onChangePage();
            }
          }}
        />
      </PaginationItem>
      {pages.map(page => (
        <PaginationItem
          key={page}
          className={props.pageNo === page ? 'active' : ''}
          disabled={page > props.totalPages}
        >
          <PaginationLink
            onClick={() => {
              props.setPageNo(page);
              props.onChangePage();
            }}
          >
            {page}
          </PaginationLink>
        </PaginationItem>
      ))}
      <PaginationItem disabled={props.totalPages === props.pageNo}>
        <PaginationLink
          next
          disabled={props.totalPages === props.pageNo}
          href="#"
          onClick={() => {
            const nextPage = props.pageNo + 1;
            updatePage(nextPage);
            props.setPageNo(nextPage);
            props.onChangePage();
          }}
        />
      </PaginationItem>
      <PaginationItem
        className={props.pageNo === props.totalPages ? 'active' : ''}
      >
        <PaginationLink
          href="#"
          onClick={() => {
            props.setPageNo(props.totalPages);
            props.onChangePage();
          }}
        >
          Last
        </PaginationLink>
      </PaginationItem>
      <PaginationItem>
        <PaginationLink href="#">
          <Select
            defaultValue={props.perPage}
            onChange={e => {
              props.setPerPage(parseInt(e.currentTarget.value, 10));
              props.onChangePage();
            }}
          >
            <Option value="20" disabled={props.totalRecord < 20}>
              20 Records
            </Option>
            <Option value="50" disabled={props.totalRecord < 50}>
              50 Records
            </Option>
            <Option value="100" disabled={props.totalRecord < 100}>
              100 Records
            </Option>
            <Option value="500" disabled={props.totalRecord < 500}>
              500 Records
            </Option>
          </Select>
        </PaginationLink>
      </PaginationItem>
    </Pagination>
  );
}

StyledPagination.propTypes = {
  totalRecord: PropTypes.number,
  pageNo: PropTypes.number,
  perPage: PropTypes.number,
  totalPages: PropTypes.number,
  setPageNo: PropTypes.func,
  setPerPage: PropTypes.func,
  onChangePage: PropTypes.func,
};

export default StyledPagination;
