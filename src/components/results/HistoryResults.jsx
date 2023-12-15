import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useGitContext } from '../api/GitContext';
import styled from 'styled-components';
import StarRateIcon from '@mui/icons-material/StarRate';
import { FolderShared, PeopleAlt, InsertLink } from '@mui/icons-material';
import CircularProgress from '@mui/material/CircularProgress';

const ListStyle = styled.div`
  padding: 40px 50px 0 50px;
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
  gap: 40px;

  .list-container {
    flex: 1;
    border: 2px solid lightgrey;
    border-radius: 10px;
    box-shadow: 0px 0px 14px 0px #28133740;
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
    font-weight: 300;
  }

  .link {
    display: flex;
    align-items: center;
    gap: 10px;
    flex-direction: row;
    
  }
`;

const LoadingStyle = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 50px;
;`

const HistoryResults = () => {
  const { id } = useParams();
  const { loading, getSearchResultById, searchResults } = useGitContext();
  
  useEffect(() => {
    if (id && searchResults._id !== id) {
      getSearchResultById(id);
    }

  }, []);
  
if (loading) {
    return <div>
      <LoadingStyle>
      <CircularProgress color='secondary'></CircularProgress>
      </LoadingStyle>
      </div>
  };
  
  if (!searchResults.repos || !searchResults.users) {

    return (
      <div>
        <ListStyle>
          <p>Sin resultados</p>
        </ListStyle>
      </div>
    );
  }

  return (
      <div>
      <ListStyle>
        {searchResults.repos.length > 0 && (
          <div className="list-container">
            <ul>
              <h3><FolderShared/> Repositorios</h3>

              {searchResults.repos.map((item) => (
                <li key={item.id}>
                    <div className="repo-info">
                      {item.name}
                      <span><StarRateIcon />{item.stargazers_count}</span>
                    </div>
                  {item.description && <p>{item.description}</p>}
                  <p>Ultima actualizacion: {new Date(item.updated_at).toLocaleDateString()}</p>

                  <span className='link'><InsertLink/><a href={item.html_url} target="_blank" rel="noopener noreferrer">{item.html_url}</a></span>
                </li>
              ))}
            </ul>
          </div>
        )}

        {searchResults.repos.length > 0 && (
          <div className="list-container">
            <ul>
              <h3><PeopleAlt/> Usuarios</h3>
              {searchResults.users.map((item) => (
                <li key={item.login}>
                    <div className="user-info">
                      <img src={item.avatar_url} alt="avatar" height="60px"/>
                      {item.login}
                      <span className='link'><InsertLink/><a href={item.html_url} target="_blank" rel="noopener noreferrer">{item.html_url}</a></span>

                      </div>
              </li>
            ))}
          </ul>
        </div>
      )}
    </ListStyle>
    
  </div>

  );
  
};


export default HistoryResults;