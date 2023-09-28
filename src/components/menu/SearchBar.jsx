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
  border: 3px solid gray;
  border-radius: 10px;
  font-size: 15px;
`;

const ButtonStyle = styled.button`
  padding: 10px 20px;
  border: 3px solid gray;
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

  return (
    <ContainerStyle>
      <SearchStyle type="text" placeholder="Buscar en GitHub"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
      />
      <ButtonStyle onClick={handleSearch}>Buscar</ButtonStyle>
    </ContainerStyle>
  );
};

export default SearchBar;
