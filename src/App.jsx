import React, { useState } from 'react';
import { Route, Routes } from 'react-router-dom';
import UserDetail from './components/results/UserDetail';
import RepoDetail from './components/results/RepoDetail';
import SearchBar from './components/menu/SearchBar'; 
import RepoList from './components/results/RepoList';
import HistoryResults from './components/results/HistoryResults';
import styled from 'styled-components';

const LogoStyle = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`;

function App() {
  const [filter, setFilter] = useState('');
  const [selectedFilter, setSelectedFilter] = useState('');


  const handleFilterChange = (newFilter) => {
    setFilter(newFilter);
    setSelectedFilter(newFilter);

  };


  return (
    <div>
      <LogoStyle>
        <img src={require('./img/GitHub-Logo.png')} alt="logo" height="220px"/>
      </LogoStyle>
      <Routes>
        <Route path="/" element={<Home handleFilterChange={handleFilterChange} filter={filter} selectedFilter={selectedFilter}/>} />
        <Route path="/repo/:id" element={<RepoDetail />} />
        <Route path="/user/:login" element={<UserDetail />} />
        <Route path="/results/:id" element={<HistoryResults />} />

      </Routes>
    </div>
  );
}

function Home({ handleFilterChange, filter, selectedFilter }) {

  return (
    <>
      <SearchBar onFilterChange={handleFilterChange}
       selectedFilter={selectedFilter}/>
      <RepoList filter={filter}/>
      
    </>
  );
}

export default App;
