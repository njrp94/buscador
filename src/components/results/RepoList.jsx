import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useGitContext } from '../api/GitContext';
import Pagination from './Pagination';
import styled from 'styled-components';

const ListStyle = styled.div`
  padding: 50px 0 0 100px;
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
  gap: 40px;

  .list-container {
    flex: 1;
    min-width: 400px;
    max-width: 800px;
    padding: 20px;
    border: 1px solid #ccc;
    border-radius: 5px;
    ;
  }

  li {
    list-style-type: none;
    text-decoration: none;
    margin-bottom: 30px;
  }

  h4 {
    color: black;
  }

  a {
    text-decoration: none;
  }
`;

const RepoList = () => {
  const { repos, users, loading, currentPage, itemsPerPage} = useGitContext();


  if (loading) {
    return <p>Buscando...</p>;
  }

  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const reposToShow = repos.slice(startIndex, endIndex);
  const usersToshow = users.slice(startIndex, endIndex);
  
  return (
    <div>
      <ListStyle>
        {repos.length > 0 && (
          <div className="list-container">
            <h3>Repositorios</h3>
            <ul>
              {reposToShow.map((item) => (
                <li key={item.id}>
                  <Link to={`/repo/${item.id}`} state={{ repo: item }}>
                    <h4>{item.name} Favs: {item.stargazers_count} </h4>
                  </Link>
                  {item.description && <p>{item.description}</p>}
                </li>
              ))}
            </ul>
          </div>
        )}

        {users.length > 0 && (
          <div className="list-container">
            <h3>Usuarios</h3>
            <ul>
              {usersToshow.map((item) => (
                <li key={item.login}>
                  {item.login && (
                    <Link to={`/user/${item.login}`} state={{ user: item }}>
                      <h4>{item.login}</h4>
                    </Link>
              )}
              </li>
            ))}
          </ul>
          <Pagination/>
        </div>
        
      )}
      
    </ListStyle>
    
  </div>
  );
};

export default RepoList;
