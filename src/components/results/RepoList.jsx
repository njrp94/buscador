import React from 'react';
import { Link } from 'react-router-dom';
import { useGitContext } from '../api/GitContext';
import styled from 'styled-components';

const ListStyle = styled.div`
  padding: 50px 0 0 150px;

  li {
    list-style-type: none;
    text-decoration: none;
  }

  h3 {
    color: black;
  }

  a {
    text-decoration: none;
  }
`;

const RepoList = () => {
  const { repos, users, loading, } = useGitContext();

  if (loading) {
    return <p>Buscando...</p>;
  }

  return (
    <div>
      <ListStyle>
        <ul>
          {/* Caracteristicas de repositorios */}
          {repos.map((item) => (
            <li key={item.id}>
              <Link to={`/repo/${item.id}`} state={{ repo: item }}>
                <h3>{item.name}</h3>
              </Link>
              {item.description && <p>{item.description}</p>}
              Favs: {item.stargazers_count}
            </li>
          ))}


          {/* Caracteristicas de usuarios */}
          {users.map((item) => (
          <li key={item.login}>
            {item.login && (
            <Link to={`/user/${item.login}`} 
              state={{ user: item }}>
              <h3>{item.login}</h3>
            </Link>
            )}
            </li>
          ))}
        </ul>
      </ListStyle>
    </div>
  );
};

export default RepoList;
