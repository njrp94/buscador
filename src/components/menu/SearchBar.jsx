import React, { useState, useEffect } from 'react';
import { useGitContext } from '../api/GitContext';
import styled from 'styled-components';
import { Search } from '@mui/icons-material';

const ContainerStyle = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;

`;

const SearchContainer = styled.div`
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

const FilterStyle = styled.div`
display: flex;
  align-items: center;
  flex-direction: column;

`;

const SelectStyle = styled.select`
padding: 10px;
  border-radius: 5px;
  font-size: 15px;
  margin-top: 10px;
  margin-left: 10px;
`;


const HistoryContainer = styled.div`
display: flex;
flex-direction: row;
align-content: center;
align-items: baseline;
justify-content: center;
border: 2px solid gray;
`;

const HistoryStyle = styled.div`
  border: 2px solid black;
  padding: 10px;
  width: 400px;
`;

const SearchBar = ({ onFilterChange, selectedFilter }) => {
  const { searchRepoAndUser, history, getSearchHistory, deleteSearchById, deleteHistory } = useGitContext();
  const [query, setQuery] = useState('');

  useEffect(() => {
    getSearchHistory();
  },[]);

  const handleSearch = (selectedFilter) => {
    if (query.trim() !== '') {
      searchRepoAndUser(query, selectedFilter);
    }
  };

  const handleDeleteSearch = async (searchId) => {
    await deleteSearchById(searchId);
  };

  const handleDeleteHistory = async () => {
    await deleteHistory();
  };

  const handleKeyPress = (e, selectedFilter) => {
    if (e.key === 'Enter' && query.trim() !== '') {
      searchRepoAndUser(query, selectedFilter);
    }
  };

  const handleFilterChange = (e) => {
    const newFilter = e.target.value;
    onFilterChange(newFilter);
  };

  return (
    <ContainerStyle>
      <SearchContainer>
        <SearchStyle
          type="text"
          placeholder="Buscar en GitHub"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onKeyPress={(e) => handleKeyPress(e, selectedFilter)}
        />
        <ButtonStyle onClick={() => handleSearch(selectedFilter)}>
          <span>
            <Search />
          </span>
        </ButtonStyle>
        <FilterStyle>
        <span>Ultima actualización</span>
        <SelectStyle value={selectedFilter} onChange={handleFilterChange}>
          <option value="">-</option>
          <option value="today">Hoy</option>
          <option value="2weeks">Hace 2 semanas</option>
          <option value="1month">Hace 1 mes</option>
        </SelectStyle>
      </FilterStyle>
      </SearchContainer>


      <HistoryContainer>
        <HistoryStyle>
          <span>Historial de búsquedas</span>
          <ul>
            {history.map((search) => (
              <li key={search.timestamp}>
                {search.term} {search.results.length}
                <button onClick={() => handleDeleteSearch(search._id)}>Eliminar</button>

              </li>
            ))}
          </ul>
          <button onClick={handleDeleteHistory}>Eliminar Todo el Historial</button>

        </HistoryStyle>
      </HistoryContainer>
    </ContainerStyle>
  );
};

export default SearchBar;
