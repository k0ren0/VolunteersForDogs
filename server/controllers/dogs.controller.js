import * as DogsModel from '../models/dogs.model.js';

export const _addDog = async (req, res) => {
  const { breed_id, name, age, size } = req.body;
  const user_id = req.user.user_id;

  try {
    const newDog = await DogsModel.addDog(user_id, breed_id, name, age, size);
    res.status(201).json(newDog[0]);
  } catch (error) {
    res.status(500).json({ message: "Error adding dog", error });
  }
};

export const _getDogsByUserId = async (req, res) => {
  console.log("_getDogsByUserId work");
  const {user_id }= req.query;
  console.log("user_id ", user_id );

  try {
    const dogs = await DogsModel.getDogsByUserId(user_id);
    res.json(dogs);
  } catch (error) {
    res.status(500).json({ message: "Error fetching dogs", error });
  }
};

export const _updateDog = async (req, res) => {
  const { dog_id } = req.params;
  const { breed_id, name, age, size } = req.body;
  const user_id = req.user.user_id;

  try {
    const updatedDog = await DogsModel.updateDog(dog_id, user_id, breed_id, name, age, size);
    res.json(updatedDog[0]);
  } catch (error) {
    res.status(500).json({ message: "Error updating dog", error });
  }
};

export const _deleteDog = async (req, res) => {
  const { dog_id } = req.params;
  const user_id = req.user.user_id;

  try {
    await DogsModel.deleteDog(dog_id, user_id);
    res.status(204).send();
  } catch (error) {
    res.status(500).json({ message: "Error deleting dog", error });
  }
};
