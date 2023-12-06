import React, { useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { useGitContext } from '../api/GitContext';
import styled from 'styled-components';
import { ArrowBackOutlined, InsertLink } from '@mui/icons-material'

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
    `;

const DetailsStyle = styled.div`
    margin: 25px 0 0 100px;

    a {
        text-decoration: none;
        color: darkblue;
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

const ReposList = styled.div`
    margin: 25px 0 0 100px;

    a {
        text-decoration: none;
        color: darkblue;
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


const UserDetail = () => {
  const { login } = useParams();
  const { users, getUserDetails, userData, reposData } = useGitContext();
  const user = users.find((user) => user.login === login);

  useEffect(() => {
    getUserDetails(login);
    console.log(reposData);
  }, [login]);


  return (
    <div>
      <ContainerStyle>
        <div className='arrow'>
          <Link to="/"><span><ArrowBackOutlined /></span></Link>
        </div>

        <UserStyle>
          <img src={user.avatar_url} alt="avatar" height="200px" />
        </UserStyle>

        <DetailsStyle>
          <div className='title'>
            <h1>{userData.login}</h1>
          </div>

          <div className='description'>
            <p>{userData.bio}</p>
            <p>Usuario desde: {new Date(userData.created_at).toLocaleDateString()}</p>
            <span><InsertLink /><a href={userData.html_url} target="_blank" rel="noopener noreferrer">{userData.html_url}</a></span>
          </div>

          <ReposList>
            <h2>Repositorios:</h2>
            <ul>
                {reposData.map((repo) => (
                <li key={repo.name}>{repo.name} - Última actualización: {new Date(repo.last_updated).toLocaleDateString()}</li>
                ))}
                </ul>

            </ReposList>
        </DetailsStyle>
      </ContainerStyle>
    </div>
  );
};
export default UserDetail;
