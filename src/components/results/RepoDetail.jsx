import React, { useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { useGitContext } from '../api/GitContext';
import styled from 'styled-components';
import StarRateIcon from '@mui/icons-material/StarRate';
import { ArrowBackOutlined, InsertLink, Person } from '@mui/icons-material'


const ContainerStyle = styled.div`
    display:flex;
    margin-top: 30px;

    .arrow {
        margin-left: 100px;
        display: flex;
        align-items: center;
    }

    .arrow span {
        color: purple;
        
    }
    `;

const UserStyle = styled.div`
    padding: 50px;
    display: flex;
    flex-direction: column;
    align-items: center;
    border-right: 2px solid #ccc;
    margin-left: 50px;
    
    p {
        display: flex;
        margin-top: 20px;
        align-items: center;
        gap: 5px;
    }
    `;

const DetailsStyle = styled.div`
    margin: 25px 0 0 100px;

    a {
        text-decoration: none;
        color: darkblue;
    }

    .title {
        gap: 10px;
        display: flex;
    }

    .title span {
        display: flex;
        align-items: center;
        color: goldenrod;
        text-shadow: 0 0 black;
    }

    .description p {
        margin-top: 4px;
    }

    .description span {
        display: flex;
        align-items: center;
        gap: 5px;
    }
    `;

const RepoDetail = () => {
  const { id } = useParams();
  const { repos, loading, searchRepoAndUser } = useGitContext();

  useEffect(() => {
    if (loading) {
      searchRepoAndUser();
    }
  }, [loading, searchRepoAndUser]);

  const repo = loading ? null : repos.find((repo) => repo.id === Number(id));

  return (
      <div>
    <ContainerStyle>
        <div className='arrow'>
            <Link to="/"><span><ArrowBackOutlined/></span></Link>
        </div>

        <UserStyle>    
            <img src={repo.owner.avatar_url} alt="avatar" height="200px"/>
            <p><Person/>{repo.owner && repo.owner.login}</p>
        </UserStyle>
        
        <DetailsStyle>
            <div className='title'>
            <h1>{repo.name}</h1><span><StarRateIcon/> {repo.stargazers_count}</span>
            </div>
            
            <div className='description'>
            <p>{repo.description}</p>
            <p>Tamaño del repositorio: {`${(repo.size / (1024 * 1024)).toFixed(3)} MB`}</p>
            <p>Última actualización: {new Date(repo.updated_at).toLocaleDateString()}</p>
            <span><InsertLink/><a href={repo.html_url} target="_blank" rel="noopener noreferrer">{repo.html_url}</a></span>
            </div>

        </DetailsStyle>
    </ContainerStyle>
      </div>
  );
};

export default RepoDetail;
 