import React from 'react';
import { Route, Routes } from 'react-router-dom';
import UserDetail from './components/results/UserDetail';
import RepoDetail from './components/results/RepoDetail';
import SearchBar from './components/menu/SearchBar'; 
import RepoList from './components/results/RepoList';
import styled from 'styled-components';

const LogoStyle = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`;

function App() {
  return (
    <div>
      <LogoStyle>
        <img src={require('./img/github-mark.png')} alt="logo" />
      </LogoStyle>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/repo/:id" element={<RepoDetail />} />
        <Route path="/user/:login" element={<UserDetail />} />
      </Routes>
    </div>
  );
}

function Home() {
  return (
    <>
      <SearchBar />
      <RepoList />
    </>
  );
}

export default App;
