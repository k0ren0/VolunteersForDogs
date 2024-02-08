import { db } from "../config/db.js";

export const addDog = async (user_id, breed_id, name, age, size) => {
    return db('dogs').insert({ user_id, breed_id, name, age, size }).returning('*'); // Возвращаем добавленную запись
};

export const getDogsByUserId = async (user_id) => {
    return db('dogs').select('*').where({ user_id });
};

export const getDogById = async (dog_id) => {
    return db('dogs').select('*').where({ dog_id }).first();
};

export const updateDog = async (dog_id, user_id, breed_id, name, age, size) => {
    return db('dogs').where({ dog_id, user_id }).update({ breed_id, name, age, size }).returning('*'); // Возвращаем обновленную запись
};

export const deleteDog = async (dog_id, user_id) => {
    return db('dogs').where({ dog_id, user_id }).del();
};

