import React from 'react';
import { Query } from 'react-apollo';
import { GET_USERS_QUERY } from '../test-queries/test-queries';

export default () => (
  <Query query={GET_USERS_QUERY}>
    {({ loading, data, error }) => {
      if (loading) return <p>Loading...</p>;
      if (error) {
        console.log(error);
        return <p>Error!</p>;
      }
      return data.users.map(
        ({ id, username, userProfileImage, bio, email }) => (
          <div key={username}>
            <p>{id}</p>
            <p>{username}</p>
            <img src={userProfileImage} />
            <p>{bio}</p>
            <p>{email}</p>
          </div>
        )
      );
    }}
  </Query>
);