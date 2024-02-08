import { db } from "../config/db.js"; 

export const register = (email, password) => {

    return db("users").insert({ email, password });
};

export const login = (email) => {

    return db("users").select("email", "password").where({ email });
};

export const all = () => {

    return db("users").select("email", "password").orderBy('user_id');
};

export const updateUser = async (user_id, userData) => {
    return db('users').where({ user_id }).update(userData);
};
