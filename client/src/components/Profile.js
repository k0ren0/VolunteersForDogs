// Profile.js
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchUsers } from '../features/users/usersSlice';

const Profile = () => {
  const dispatch = useDispatch();
  const { token } = useSelector((state) => state.auth);
  const { users, status, error } = useSelector((state) => state.users);

  useEffect(() => {
    if (token) {
      dispatch(fetchUsers());
    }
  }, [dispatch, token]);

  if (status === 'loading') return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div>
      <h1>User Profile</h1>
      {/* Вывод информации о пользователе, предполагая, что users[0] - это текущий пользователь */}
      {users.length > 0 && (
        <div>
          <p>Email: {users[0].email}</p>
          {/* Дополнительные поля пользователя */}
        </div>
      )}
    </div>
  );
};

export default Profile;
