import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useGitContext } from '../api/GitContext';
import styled from 'styled-components';
import { Search, Clear } from '@mui/icons-material';
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

const HistoryList = styled.ul`
  list-style: none;
  padding: 13px;
  margin-top: 0;
  border: 2px solid #ccc;
  border-radius: 0 0 10px 10px;
  width: 400px;
  display: inline-grid;
  background-color: white;
  
  li {

  }

  .delete {
    float: right;
    margin-bottom: 10px;

  }

  .delete button {
    color: lightslategray;
    background: none;
    border: none;
  }

  .deleteAll {
    display: grid;
    border-top: 1px solid purple;
    padding: 10px 0 0 10px;
  }
  
  .deleteAll button {
    background: none;
    border: none;
  }

  

`;


const SearchBar = ({ onFilterChange, selectedFilter }) => {
  const { setSearchPerformed, getSearchHistory, searchRepoAndUser, history, deleteSearchById, deleteHistory, searchResults } = useGitContext();
  const [query, setQuery] = useState('');
  const [showHistory, setShowHistory] = useState(false);
  const [isHistoryLoaded, setIsHistoryLoaded] = useState(false);


  useEffect(() => {
    if (!isHistoryLoaded) {
      getSearchHistory();
      setIsHistoryLoaded(true);
    }
  }, [isHistoryLoaded, getSearchHistory]);


  const handleSearch = async (selectedFilter) => {
    if (query.trim() !== '') {
      searchRepoAndUser(query, selectedFilter);
      getSearchHistory();
      setSearchPerformed(true);
    }
  };
  

  const handleHistoryItemClick = (search) => {
    const newTab = window.open(`/results/${search._id}`, '_blank');
    newTab.focus();
  };
  
  
  
  const handleDeleteSearch = async (searchId, event) => {
    event.stopPropagation();
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
            {history.length === 0 ? (
              <li>El historial esta vacio</li>
            ) : (
              history.map((search) => (
                <li key={search.timestamp} onClick={() => handleHistoryItemClick(search)}>
                  {search.term}
                  <div className='delete'>
                    <button onClick={(event) => handleDeleteSearch(search._id, event)}>
                      <Clear />
                    </button>
                  </div>
                </li>
              ))
            )}
            {history.length > 0 && (
              <div className='deleteAll'>
                <button onClick={handleDeleteHistory}>
                  <DeleteIcon />
                </button>
              </div>
            )}
          </HistoryList>
        )}
      </SearchAndHistoryContainer>
    </ContainerStyle>
  );
};

export default SearchBar;
