import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { useGitContext } from '../api/GitContext';
import styled from 'styled-components';
import StarRateIcon from '@mui/icons-material/StarRate';
import { ArrowBackOutlined, InsertLink, Person } from '@mui/icons-material'


const ContainerStyle = styled.div`
    display:flex;
    justify-content: center;
    margin-top: 30px;

    .arrow {
        display: flex;
        flex-direction: row;
        gap: 40px;
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
        padding-left: 40px;
        
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
  const { repos } = useGitContext();
  const repo = repos.find((repo) => repo.id === Number(id));
    
  return (
      <div>
    <ContainerStyle>


        <UserStyle>    
        <div className='arrow'>
            <Link to="/"><span><ArrowBackOutlined/></span></Link>
            <img src={repo.owner.avatar_url} alt="avatar" height="200px"/>
            </div>
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
 