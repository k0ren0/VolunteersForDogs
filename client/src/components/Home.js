import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchUsers } from '../features/users/usersSlice';

const Home = () => {
  const dispatch = useDispatch();
  const { users, status, error } = useSelector((state) => state.users);
  const currentUser = useSelector((state) => state.auth.user);

  useEffect(() => {
    dispatch(fetchUsers());
  }, [dispatch]);

  if (status === 'loading') return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  // Убедитесь, что currentUser определен перед тем, как искать email
  const loggedInUserEmail = currentUser && users.find(user => user.user_id === currentUser.user_id)?.email;

  return (
    <div>
      <h1>Home Page</h1>
      {loggedInUserEmail ? (
        <div>Email: {loggedInUserEmail}</div>
      ) : (
        // Показывайте это сообщение, если пользователь не найден или не залогинен
        <div>User not found or not logged in</div>
      )}
    </div>
  );
};

export default Home;



// import React, { useEffect } from 'react';
// import { useDispatch, useSelector } from 'react-redux';
// import { fetchUsers } from '../features/users/usersSlice';

// const Home = () => {
//   const dispatch = useDispatch();
//   const { users, status, error } = useSelector((state) => state.users);

//   useEffect(() => {
//     dispatch(fetchUsers());
//   }, [dispatch]);

//   if (status === 'loading') return <div>Loading...</div>;
//   if (error) return <div>Error: {error}</div>;

//   return (
//     <div>
//       <h1>Home Page</h1>
//       <ul>
//         {users.map(user => (
//           <li key={user.user_id}>{user.email}</li>
//         ))}
//       </ul>
//     </div>
//   );
// };

// export default Home;
