import React, { useState } from 'react';
import { useGitContext } from '../api/GitContext';
import styled from 'styled-components';
import { Search } from '@mui/icons-material';

const ContainerStyle = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`;

const SearchStyle = styled.input`
  padding: 13px;
  margin-top: 20px;
  border: 2px solid #ccc;
  border-radius: 10px 0 0 10px;
  font-size: 15px;
  width: 400px;
`;

const ButtonStyle = styled.button`
    padding: 11px;
    margin: 20px 0 0 0px;
    border: 0px solid white;
    border-radius: 0 10px 10px 0;
    font-size: 5px;
    background-color: purple;
    color: black;

    span {
      color: white;
    }
    
`;

const SelectStyle = styled.select`
  padding: 10px;
  border-radius: 5px;
  font-size: 15px;
  margin-left: 10px;
`;


const SearchBar = ({ onFilterChange, selectedFilter }) => {
  const { searchRepoAndUser} = useGitContext();
  const [query, setQuery] = useState('');

  const handleSearch = (selectedFilter) => {
    if (query.trim() !== '') {
      searchRepoAndUser(query, selectedFilter);
    }
  };

  const handleKeyPress = (e, selectedFilter) => {
    if (e.key === 'Enter' && query.trim() !== '') {
      searchRepoAndUser(query, selectedFilter);
    }
  };
  
  const handleFilterChange = (e) => {
    const newFilter = e.target.value;

    console.log('selected Filter:', selectedFilter);
    console.log('New Filter:', newFilter);
    onFilterChange(newFilter);
  };


  return (
    <ContainerStyle>
      <SelectStyle value={selectedFilter} onChange={handleFilterChange}>
        <option value="">-</option>
        <option value="today">Hoy</option>
        <option value="2weeks">Hace 2 semanas</option>
        <option value="1month">Hace 1 mes</option>
      </SelectStyle>
      <SearchStyle
        type="text"
        placeholder="Buscar en GitHub"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        onKeyPress={handleKeyPress}
      />
      
      <ButtonStyle onClick={handleSearch}>
        <span>
          <Search />
        </span>
      </ButtonStyle>
    </ContainerStyle>
  );
};
export default SearchBar;
