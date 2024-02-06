import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchUsers, updateUserProfile, fetchDogs } from '../features/users/usersSlice';

const Profile = () => {
    const dispatch = useDispatch();
    const { token } = useSelector((state) => state.auth);
    const { users, dogs, status, error } = useSelector((state) => state.users);
    const [email, setEmail] = useState('');
    const [username, setUsername] = useState('');

    useEffect(() => {
        if (token) {
            dispatch(fetchUsers());
            dispatch(fetchDogs());
        }
    }, [dispatch, token]);

    useEffect(() => {
        if (users.length > 0) {
            setEmail(users[0].email);
            setUsername(users[0].username); // Предположим, что username теперь часть модели пользователя
        }
    }, [users]);

    const handleUpdateProfile = () => {
        const userId = users[0].id; // Предположим, что ID пользователя доступен в users[0]
        dispatch(updateUserProfile({ userId, userData: { email, username } }));
    };

    if (status === 'loading') return <div>Loading...</div>;
    if (error) return <div>Error: {error}</div>;

    return (
        <div>
            <h1>User Profile</h1>
            <div>
                <input
                    type="text"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Email"
                />
                <input
                    type="text"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    placeholder="Username"
                />
                <button onClick={handleUpdateProfile}>Update Profile</button>
            </div>
            <h2>My Dogs</h2>
            {dogs.map((dog) => (
                <div key={dog.id}>
                    <p>{dog.name}</p>
                    <p>{dog.breed}</p>
                    <p>{dog.age} years old</p>
                </div>
            ))}
        </div>
    );
};

export default Profile;
