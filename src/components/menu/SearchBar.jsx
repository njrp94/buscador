import React, { useState } from 'react';
import { useGitContext } from '../api/GitContext';
import styled from 'styled-components';

const ContainerStyle = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`;

const SearchStyle = styled.input`
  padding: 10px;
  margin-top: 10px;
  border: 2px solid #ccc;
  border-radius: 10px;
  font-size: 15px;
  width: 300px;
`;

const ButtonStyle = styled.button`
  padding: 10px 20px;
  margin: 10px 0 0 10px;
  border: 2px solid #ccc;
  border-radius: 10px;
  font-size: 15px;
  background-color: white;
  color: black;
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
      <ButtonStyle onClick={handleSearch}>Buscar</ButtonStyle>
    </ContainerStyle>
  );
};

export default SearchBar;
