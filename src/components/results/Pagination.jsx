import React from 'react';
import { useGitContext } from '../api/GitContext';
import ReactPaginate from 'react-paginate';
import styled from 'styled-components';

const PaginationStyle = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 20px;

  ul {
    display: flex;
    list-style: none;
    padding: 0;
  }

  li {
    margin: 0 5px;
    cursor: pointer;

    a {
        text-decoration: none;
        color: #333;
        padding: 5px 10px;
        border: 1px solid #ccc;
        border-radius: 4px;
        background-color: #fff;
      }
  
      &.previous,
      &.next {
        a {
          background-color: purple;
          color: #fff;
        }
      }
    }
  `;
  

const Pagination = () => {
    const { repos, itemsPerPage, changePage } = useGitContext();

const pageCount = Math.ceil(repos.length / itemsPerPage);

const handlePageClick = (selected) => {
    changePage(selected + 1);
  };

  return (
    <PaginationStyle>
        <ReactPaginate
        pageCount={pageCount}
        pageRangeDisplayed={2}
        marginPagesDisplayed={2}
        onPageChange={({ selected }) => handlePageClick(selected)}
        containerClassName={'pagination'}
        activeClassName={'active'}
        previousLabel={'<<'}
        nextLabel={'>>'}
/>
    </PaginationStyle>
  );
};

export default Pagination;
