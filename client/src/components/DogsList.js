import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { fetchDogs } from '../features/dogs/dogsSlice';

const DogsList = () => {
    const dispatch = useDispatch();
    const { dogs, status, error } = useSelector((state) => state.dogs);

    useEffect(() => {
        dispatch(fetchDogs());
    }, [dispatch]);

    if (status === 'loading') return <div>Loading...</div>;
    if (error) return <div>Error: {error}</div>;

    return (
        <div>
            <h2>My Dogs</h2>
            {dogs.length ? (
                <ul>
                    {dogs.map(dog => (
                        <li key={dog.dog_id}>{dog.name} - {dog.breed} - {dog.age} years</li>
                    ))}
                </ul>
            ) : (
                <p>No dogs found</p>
            )}
        </div>
    );
};

export default DogsList;
