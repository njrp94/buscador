import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useGitContext } from '../api/GitContext';
import styled from 'styled-components';
import { Search } from '@mui/icons-material';
import DeleteIcon from '@mui/icons-material/Delete';

const ContainerStyle = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

const SearchAndHistoryContainer = styled.div`
  display: flex;
  flex-direction: column;
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
  width: 375px;
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

const HistoryList = styled.ul`
  list-style: none;
  padding: 13px;
  margin-top: 0;
  border: 2px solid #ccc;
  border-radius: 0 0 10px 10px;
  width: 400px;
`;


const SearchBar = ({ onFilterChange, selectedFilter }) => {
  const navigate = useNavigate();
  const { getSearchHistory, searchRepoAndUser, history, deleteSearchById, deleteHistory, searchResults } = useGitContext();
  const [query, setQuery] = useState('');
  const [showHistory, setShowHistory] = useState(false);
  const [isHistoryLoaded, setIsHistoryLoaded] = useState(false);

  useEffect(() => {
    if (!isHistoryLoaded) {
      getSearchHistory();
      setIsHistoryLoaded(true);
    }
  }, [isHistoryLoaded, getSearchHistory]);

  const handleSearch = (selectedFilter) => {
    if (query.trim() !== '') {
      searchRepoAndUser(query, selectedFilter);
      getSearchHistory();
    }
  };

  const handleHistoryItemClick = (search) => {
    navigate(`/results/${search._id}`, {
      state: { term: search.term, searchResults: search.results }
    });
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


  const handleOutsideClick = (event) => {
    const searchBar = document.getElementById('search-bar');
    if (searchBar && !searchBar.contains(event.target)) {
      setShowHistory(false);
    }
  };
  
const handleSearchBarClick = () => {
    setShowHistory(!showHistory);
  };

  useEffect(() => {
    document.addEventListener('click', handleOutsideClick);

    return () => {
      document.removeEventListener('click', handleOutsideClick);
    };
  }, [showHistory]);

  return (
    <ContainerStyle>
      <SearchAndHistoryContainer>
      <SearchContainer id="search-bar">
        <SearchStyle
          type="text"
          placeholder="Buscar en GitHub"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onKeyPress={(e) => handleKeyPress(e, selectedFilter)}
          onClick={handleSearchBarClick}

        />
        <ButtonStyle onClick={() => { 
        handleSearch(selectedFilter);
      }}>
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
      
      {showHistory && (
      <HistoryList>
        {history.map((search) => (
        <li key={search.timestamp} onClick={() => handleHistoryItemClick(search)}>
          {search.term}
            <button onClick={() => handleDeleteSearch(search._id)}>Eliminar</button>
          </li>
        ))}
              <button onClick={handleDeleteHistory}><DeleteIcon></DeleteIcon></button>

      </HistoryList>
      )}
      </SearchAndHistoryContainer>
    </ContainerStyle>
  );
};

export default SearchBar;
