import * as DogsModel from '../models/dogs.model.js';

export const _addDog = async (req, res) => {
    const { name, breed, age } = req.body;
    const user_id = req.user.id; // Предполагаем, что ID пользователя доступен в req.user

    try {
        const newDog = await DogsModel.addDog(user_id, name, breed, age);
        res.status(201).json(newDog[0]);
    } catch (error) {
        res.status(500).json({ message: "Error adding dog", error });
    }
};

export const _getDogsByUserId = async (req, res) => {
    const user_id = req.user.id;

    try {
        const dogs = await DogsModel.getDogsByUserId(user_id);
        res.json(dogs);
    } catch (error) {
        res.status(500).json({ message: "Error fetching dogs", error });
    }
};

export const _updateDog = async (req, res) => {
    const { dog_id } = req.params;
    const { name, breed, age } = req.body;
    const user_id = req.user.id;

    try {
        const updatedDog = await DogsModel.updateDog(dog_id, user_id, name, breed, age);
        res.json(updatedDog[0]);
    } catch (error) {
        res.status(500).json({ message: "Error updating dog", error });
    }
};

export const _deleteDog = async (req, res) => {
    const { dog_id } = req.params;
    const user_id = req.user.id;

    try {
        await DogsModel.deleteDog(dog_id, user_id);
        res.status(204).send();
    } catch (error) {
        res.status(500).json({ message: "Error deleting dog", error });
    }
};
