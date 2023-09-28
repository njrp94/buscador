import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { useGitContext } from '../api/GitContext';
import styled from 'styled-components';

const ContainerStyle = styled.div`
    display:flex;

    `;

const UserStyle = styled.div`
    margin-left: 100px;
    
    `;

const DetailsStyle = styled.div`
    margin-left: 50px;

    `;

const RepoDetail = () => {
  const { id } = useParams();
  const { repos } = useGitContext();
  const repo = repos.find((repo) => repo.id === Number(id));
    
  return (
      <div>
    <ContainerStyle>
        <UserStyle>
            <Link to="/">Volver al listado</Link>
            <p>Creado por: {repo.owner && repo.owner.login}</p>
            <img src={repo.owner.avatar_url} alt="avatar" height="200px"/>
        </UserStyle>
        
        <DetailsStyle>
            <h1>{repo.name}</h1>
            <p>{repo.description}</p>
      
            <p>Lenguaje principal: {repo.language}</p>
            <p>Tamaño del repositorio: {`${(repo.size / (1024 * 1024)).toFixed(3)} MB`}</p>
            <p>Última actualización: {new Date(repo.updated_at).toLocaleDateString()}</p>
            <p>Favs: {repo.stargazers_count}</p>
            <p>Link a GitHub: <a href={repo.html_url} target="_blank" rel="noopener noreferrer">{repo.html_url}</a></p>
        </DetailsStyle>

    </ContainerStyle>
      </div>
  );
};

export default RepoDetail;
 