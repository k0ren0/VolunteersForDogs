// src/controllers/dogs.controller.js
import { addDog, getDogsByUserId, updateDog, deleteDog } from "../models/dogs.model.js";

export const _allDogs = async (req, res) => {
  try {
    const rows = await getDogsByUserId(req.user.user_id);
    res.json(rows);
  } catch (error) {
    console.log("_allDogs =>", error);
    res.status(404).json({ msg: "not found" });
  }
};

export const _addDog = async (req, res) => {
  const { name, breed, age } = req.body;
  const user_id = req.user.user_id;

  try {
    const row = await addDog(user_id, name, breed, age);
    res.json(row);
  } catch (error) {
    console.log("_addDog =>", error);
    res.status(500).json({ msg: "error adding dog" });
  }
};

export const _updateDog = async (req, res) => {
  const { id } = req.params;
  const { name, breed, age } = req.body;
  const user_id = req.user.user_id;

  try {
    const rowCount = await updateDog(id, user_id, name, breed, age);
    if (rowCount === 0) {
      return res.status(404).json({ msg: "dog not found" });
    }
    res.json({ msg: "dog updated successfully" });
  } catch (error) {
    console.log("_updateDog =>", error);
    res.status(500).json({ msg: "error updating dog" });
  }
};

export const _deleteDog = async (req, res) => {
  const { id } = req.params;
  const user_id = req.user.user_id;

  try {
    const rowCount = await deleteDog(id, user_id);
    if (rowCount === 0) {
      return res.status(404).json({ msg: "dog not found" });
    }
    res.json({ msg: "dog deleted successfully" });
  } catch (error) {
    console.log("_deleteDog =>", error);
    res.status(500).json({ msg: "error deleting dog" });
  }
};
