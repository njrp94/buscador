import React, { useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { useGitContext } from '../api/GitContext';
import styled from 'styled-components';

const ContainerStyle = styled.div`
  display: flex;
`;

const UserStyle = styled.div`
  margin-left: 100px;
`;

const DetailsStyle = styled.div`
  margin-left: 50px;
`;

const UserDetail = () => {
  const { login } = useParams();
  const { users, getUserDetails, data } = useGitContext();

  const user = users.find((user) => user.login === login);

//llamo a la funcion cuando se ingresa al usuario
  useEffect(() => {
    getUserDetails(login);
  }, [login]);

  return (
    <div>
      <ContainerStyle>
        <UserStyle>
          <Link to="/">Volver al listado</Link>
          <p>{user.login}</p>
          <img src={user.avatar_url} alt="avatar" height="200px" />

        </UserStyle>

        <DetailsStyle>
          <h4>Bio:</h4>
          <p>{data.bio}</p>
          <p>Usuario desde: {new Date(data.created_at).toLocaleDateString()}</p>
          <p>Link a GitHub: <a href={data.html_url} target="_blank" rel="noopener noreferrer">{data.html_url}</a></p>
        </DetailsStyle>
      </ContainerStyle>
    </div>
  );
};

export default UserDetail;
