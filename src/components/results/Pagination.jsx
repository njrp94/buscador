import React from 'react';
import { useGitContext } from '../api/GitContext';
import ReactPaginate from 'react-paginate';
import styled from 'styled-components';

const PaginationStyle = styled.div`

`;

const Pagination = () => {
    const { totalItems, itemsPerPage, changePage } = useGitContext();

    const pageCount = Math.ceil(totalItems / itemsPerPage);
    console.log('pageCount:', pageCount);

  

  const handlePageClick = (selected) => {
    changePage(selected + 1);
  };

  return (
    <PaginationStyle>
        <ReactPaginate
        pageCount={pageCount}
        pageRangeDisplayed={5}
        marginPagesDisplayed={2}
        onPageChange={({ selected }) => handlePageClick(selected)}
        containerClassName={'pagination'}
        activeClassName={'active'}
/>
    </PaginationStyle>
  );
};

export default Pagination;
