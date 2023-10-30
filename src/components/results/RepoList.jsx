import React from 'react';
import { Link } from 'react-router-dom';
import { useGitContext } from '../api/GitContext';
import Pagination from './Pagination';
import styled from 'styled-components';
import StarRateIcon from '@mui/icons-material/StarRate';
import { FolderShared, PeopleAlt } from '@mui/icons-material';

const ListStyle = styled.div`
  padding: 40px 50px 0 50px;
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
  gap: 40px;

  .list-container {
    flex: 1;
    padding: 20px;
    border: 2px solid purple;
    border-radius: 10px;
    ;
  }

  .repo-info {
    display: flex; 
    align-items: center;
    color: black;
    font-size: 18px;
    font-weight: 500;
    margin-left:
  }

  .user-info {
    display: flex; 
    align-items: center;
    color: black;
    gap: 30px;
    font-size: 18px;
    font-weight: 300;
  }

  .repo-info span {
    display: flex; 
    align-items: center;
    color: goldenrod;
    margin-left: 10px;
    font-size: 12px;
    text-shadow: 0 0 black;
  }

  li {
    list-style-type: none;
    text-decoration: none;
    margin-bottom: 30px;
  }

  p {
    font-size: 15px;
    font-weight: 300;
  }

  a {
    text-decoration: none;
  }

  ul h3 {
    gap: 10px;
    display: flex;
    align-items: center;
  }
`;

const LoadingStyle = styled.div`
  display: flex;
  justify-content: center;

;`

const RepoList = () => {
  const { repos, users, loading, currentPage, itemsPerPage} = useGitContext();

  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const reposToShow = repos.slice(startIndex, endIndex);
  const usersToshow = users.slice(startIndex, endIndex);

  const showPagination = reposToShow.length > 0 || usersToshow.length > 0;

  if (loading) {
    return <div>
      <LoadingStyle>
      <p>Buscando...</p>
      </LoadingStyle>
      </div>
  };
  
  return (
    <div>
      <ListStyle>
        {repos.length > 0 && (
          <div className="list-container">
            <ul>
              <h3><FolderShared/> Repositorios</h3>

              {reposToShow.map((item) => (
                <li key={item.id}>
                  
                  <Link to={`/repo/${item.id}`} state={{ repo: item }}>
                    <div className="repo-info">
                      {item.name}
                      <span><StarRateIcon />{item.stargazers_count}</span>
                    </div>
                    </Link>
                    
                  {item.description && <p>{item.description}</p>}
                </li>
              ))}
            </ul>
          </div>
        )}

        {users.length > 0 && (
          <div className="list-container">
            <ul>
              <h3><PeopleAlt/> Usuarios</h3>

              {usersToshow.map((item) => (
                <li key={item.login}>
                  {item.login && (
                    <Link to={`/user/${item.login}`} state={{ user: item }}>

                    <div className="user-info">
                      <img src={item.avatar_url} alt="avatar" height="60px"/>
                      {item.login}
                      </div>
                    </Link>
              )}
              </li>
            ))}
          </ul>
        </div>
      )}
    </ListStyle>
    {showPagination && <Pagination />}
  </div>

  );
  
};



export default RepoList;
