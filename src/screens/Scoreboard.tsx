import styled from 'styled-components';
import React from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';

import firebase from '@/firebase';

const S = {
  Screen: styled.div`
    width: 100%;
    height: 100%;
    * {
      text-align: left;
      color: ${p => p.theme.text.color};
      font-family: 'Poppins', sans-serif;
    }
  `,
  Content: styled.div`
    max-width: ${p => p.theme.containerWidth};
    width: 100%;
    height: 100%;
    overflow: auto;
    padding: 16px;
    margin: 0 auto;
    display: flex;
    flex-direction: column;
  `,
  Title: styled.h2`
    margin: 8px 0;
    margin-top: 16px;
    color: ${p => p.theme.text.color};
    font-family: 'Poppins', sans-serif;
  `,
  Left: styled.div`
    margin-right: 16px;
    padding: 16px;
    width: 100%;
    display: flex;
    align-items: center;
    flex-direction: column;
    background-color: ${p => p.theme.mainNav.dividerColor};
    border-radius: 4px;
  `,
  Right: styled.div`
    flex: 1;

    table,
    th,
    td {
      border: 1px solid ${p => p.theme.mainNav.dividerColor};
    }
    th,
    td {
      padding: 4px 8px;
    }
    th {
      background-color: ${p => p.theme.mainNav.dividerColor};
    }
    table {
      width: 100%;
      border-collapse: collapse;
      * {
        text-align: left;
        color: ${p => p.theme.text.color};
        font-family: 'Poppins', sans-serif;
      }
    }
  `,
  Avatar: styled.img`
    width: 128px;
    height: 128px;
    border-radius: 128px;
  `,
  Name: styled.h3``,
};

const Profile: React.FC = () => {
  const [user] = useAuthState(firebase.auth());

  if (!user) {
    return null;
  }

  return (
    <S.Screen>
      <S.Content>
        <S.Left>
          <S.Avatar src={user.photoURL} />
          <S.Name>{user.displayName}</S.Name>
        </S.Left>
        <S.Right>
          <S.Title>Statistics</S.Title>
          <p>
            Exercitation magna qui ea do magna laboris cupidatat officia incididunt ex in
            et fugiat. Lorem culpa duis qui amet adipisicing cillum dolore ut. Ea velit
            sit qui amet aliquip.
          </p>
          <S.Title>Leaderboards</S.Title>
          <table>
            <tr>
              <th>Rank</th>
              <th>User</th>
              <th>Points</th>
            </tr>
            <tr>
              <td>1</td>
              <td>John Doe</td>
              <td>9993</td>
            </tr>
            <tr>
              <td>2</td>
              <td>John Doe</td>
              <td>6712</td>
            </tr>
            <tr>
              <td>3</td>
              <td>John Doe</td>
              <td>5123</td>
            </tr>
            <tr>
              <td>4</td>
              <td>John Doe</td>
              <td>4312</td>
            </tr>
            <tr>
              <td>5</td>
              <td>John Doe</td>
              <td>1234</td>
            </tr>
          </table>
        </S.Right>
      </S.Content>
    </S.Screen>
  );
};

export default Profile;
