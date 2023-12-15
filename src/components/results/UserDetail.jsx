import React, { useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { useGitContext } from '../api/GitContext';
import styled from 'styled-components';
import { ArrowBackOutlined, InsertLink } from '@mui/icons-material'
import CircularProgress from '@mui/material/CircularProgress';

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

    `;

const DetailsStyle = styled.div`
    display: flex;
    flex-direction: column;
    align-items: baseline;
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

const ReposList = styled.div`

    a {
        text-decoration: none;
        color: darkblue;
    }

    li {
      list-style: none;
      margin-bottom: 20px;
        }

    span {
      font-size: 20px;
    }

    ul {

        }

    h2 {
      font-weight: 300;
      color: darkpurple;
    }
    `;

const LoadingStyle = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 50px;

;`


const UserDetail = () => {
  const { login } = useParams();
  const { loading, users, getUserDetails, userData, reposData } = useGitContext();
  const user = users.find((user) => user.login === login);

  useEffect(() => {
    getUserDetails(login);
  }, []);

  if (loading) {
    return <div>
      <LoadingStyle>
      <CircularProgress color='secondary'></CircularProgress>
      </LoadingStyle>
      </div>
  };

  return (
    <div>
      <ContainerStyle>

        <UserStyle>
        <div className='arrow'>
          <Link to="/"><span><ArrowBackOutlined /></span></Link>
          <img src={user.avatar_url} alt="avatar" height="200px" />
        </div>
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
            <ul>
            <h2>Repositorios:</h2>
                {reposData.map((repo) => (
                <li key={repo.name}>
                  <div className='repo'>
                  <span>{repo.name}</span>
                  </div>
                 Última actualización: {new Date(repo.last_updated).toLocaleDateString()}</li>
                ))}
                </ul>

            </ReposList>
        </DetailsStyle>
      </ContainerStyle>
    </div>
  );
};
export default UserDetail;
