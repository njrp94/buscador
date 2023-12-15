import React, { createContext, useContext, useState } from 'react';
import axios from 'axios';

const GitContext = createContext();

export const useGitContext = () => {
  return useContext(GitContext);
};

export const GitProvider = ({ children }) => {
  const [repos, setRepos] = useState([]);
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [data] = useState([]);
  const [userData, setUserData] = useState({});
  const [reposData, setReposData] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [history, setHistory] = useState([]);
  const [searchResults, setSearchResults] = useState([]);
  const [searchPerformed, setSearchPerformed] = useState(false);


  const itemsPerPage = 10;
  
  const changePage = (pageNumber) => {
    setCurrentPage(pageNumber);
    };

const searchRepoAndUser = async (query, page, perPage) => {
  setLoading(true);
  try {
    const response = await axios.post('http://localhost:3000/api/v1/search', { keyword: query, page, perPage });
    setRepos(response.data.repos);
    setUsers(response.data.users);

    getSearchHistory();
    setSearchPerformed(true);

  } catch (error) {
    setRepos([]);
    setUsers([]);
  } finally {
    setLoading(false);

  }
};

  const getUserDetails = async (username) => {
  setLoading(true);
  try {
    const response = await axios.get(`http://localhost:3000/api/v1/user/${username}`);
    setUserData(response.data.userData);
    setReposData(response.data.reposData);

    getSearchHistory();

  } catch (error) {
    setUserData({});
    setReposData([]);
  } finally {
    setLoading(false);
  }
};

const getSearchHistory = async () => {
  setLoading(true);
  try {
    const response = await axios.get('http://localhost:3000/api/v1/search/history');
    setHistory(response.data);

  } catch (error) {
    console.error('Error al obtener el historial:', error.message);
    setHistory([]);
  } finally {
    setLoading(false);
  }
};

const getSearchResultById = async (id) => {
  setLoading(true);
  try {
    const response = await axios.get(`http://localhost:3000/api/v1/search/history/${id}`);
    setSearchResults(response.data);
    setSearchPerformed(true);
    
  } catch (error) {
    console.error('Error al obtener resultados por ID:', error.message);
    setSearchResults({ repos: [], users: [] });
  } finally {
    setLoading(false);
  }
};

const deleteHistory = async () => {
  try {
    await axios.delete('http://localhost:3000/api/v1/search');
    setHistory([]);
  } catch (error) {
    console.error('Error al eliminar todo el historial:', error);
  }
};

const deleteSearchById = async (id) => {
  try {
    await axios.delete(`http://localhost:3000/api/v1/search/${id}`);
    setHistory((prevHistory) => prevHistory.filter((item) => item._id !== id)); 
  } catch (error) {
    console.error('Error al eliminar la búsqueda:', error);
  }
};


return (
  <GitContext.Provider value={{
    repos,
    users,
    searchRepoAndUser,
    getUserDetails,
    data,
    loading,
    changePage,
    currentPage,
    itemsPerPage,
    userData,
    reposData,
    history,
    getSearchHistory,
    deleteSearchById,
    deleteHistory,
    getSearchResultById,
    searchResults,
    setSearchResults,
    searchPerformed,
    setSearchPerformed,

        }}>
    {children}
  </GitContext.Provider>
);
};

export default GitContext;
