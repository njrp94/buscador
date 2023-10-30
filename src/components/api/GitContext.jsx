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
  const [data, setData] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;
  
  const changePage = (pageNumber) => {
    setCurrentPage(pageNumber);
    };

//llamada a la API para obtener repositorios y usuarios. Utilizada en RepoDetail / RepoList
const searchRepoAndUser = async (query, page, perPage) => {
  setLoading(true);
  try {
    const repoResponse = await axios.get(`https://api.github.com/search/repositories?q=${query}&page=${page}&per_page=${perPage}`);
    const userResponse = await axios.get(`https://api.github.com/search/users?q=${query}&page=${page}&per_page=${perPage}`);

    setRepos(repoResponse.data.items);
    setUsers(userResponse.data.items);
    
  } catch (error) {
    setRepos([]);
    setUsers([]);
  } finally {
    setLoading(false);
  }
};

//llamada a la API para obtener data del usuario. Utilizada en UserDetail
const getUserDetails = async (username) => {
  setLoading(true);
  try {
    const userDataRespose = await axios.get(`https://api.github.com/users/${username}`);
    const data = userDataRespose.data;
    setData(data);
    
  } catch (error) {
    setData([]);
    
  } finally {
    setLoading(false);
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
        }}>
    {children}
  </GitContext.Provider>
);
};

export default GitContext;
