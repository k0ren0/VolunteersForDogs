// UserDetails.js
import React from 'react';
import { useSelector } from 'react-redux';
import { selectUserById } from '../features/users/usersSlice';

const UserDetails = ({ userId }) => {
  const user = useSelector(state => selectUserById(state, userId));

  if (!user) {
    return <div>User not found</div>;
  }

  return (
    <div>
      <h2>User Details</h2>
      <p>Username: {user.username}</p>
      <p>Email: {user.email}</p>
      {/* Дополнительные данные пользователя */}
    </div>
  );
};

export default UserDetails;
