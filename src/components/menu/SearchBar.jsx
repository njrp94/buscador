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
  padding: 14px;
  margin-top: 20px;
  border: 2px solid #ccc;
  border-radius: 10px 0 0 10px;
  font-size: 15px;
  width: 400px;
`;

const ButtonStyle = styled.button`
    padding: 12px;
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

const SearchBar = () => {
  const { searchRepoAndUser } = useGitContext();
  const [query, setQuery] = useState('');

  const handleSearch = () => {
    if (query.trim() !== '') {
      searchRepoAndUser(query);
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && query.trim() !== '') {
      searchRepoAndUser(query);
    }
  };

  return (
    <ContainerStyle>
      <SearchStyle type="text" placeholder="Buscar en GitHub"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        onKeyPress={handleKeyPress}
      />
      <ButtonStyle onClick={handleSearch}><span><Search/></span></ButtonStyle>
    </ContainerStyle>
  );
};

export default SearchBar;
