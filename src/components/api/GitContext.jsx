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


//llamada a la API para obtener repositorios y usuarios
  const searchRepoAndUser = async (query) => {
    setLoading(true);
    try {
      const repoResponse = await axios.get(`https://api.github.com/search/repositories?q=${query}`);
      const userResponse = await axios.get(`https://api.github.com/search/users?q=${query}`);
      setRepos(repoResponse.data.items);
      setUsers(userResponse.data.items);

    } catch (error) {
      setRepos([]);
      setUsers([]);

    } finally {
      setLoading(false);
    }
  };

//llamada a la API para obtener data del usuario seleccionado,seguidos y seguidores. Agregar mas llamados para otras caracteristcas
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
  <GitContext.Provider value={{ repos, users, searchRepoAndUser, getUserDetails, data, loading }}>
    {children}
  </GitContext.Provider>
);
};



export default GitContext;
