import { db } from "../config/db.js";

export const register = (email, password) => {
    return db("users").insert({ email, password })
        .then(() => {
            return { success: true, message: "Registration successful" };
        })
        .catch((error) => {
            return { success: false, message: "Registration failed", error };
        });
};

export const login = (email) => {
    return db("users").select("email", "password", "user_id").where({ email }).first();
};

export const all = () => {
    return db("users").select("email", "password", "user_id").orderBy('user_id');
};

export const getUserById = async (id) => {
    try {
        const user = await db("users").where({ user_id: id }).first();
        return user;
    } catch (error) {
        console.error(error);
        throw new Error("Failed to get user by id");
    }
};

export const updateUser = async (user_id, userData) => {
    try {
        const result = await db('users').where({ user_id }).update(userData);
        return { success: true, message: 'User updated successfully' };
    } catch (error) {
        return { success: false, message: 'Failed to update user', error };
    }
};

export const getUserDogs = async (userId) => {
    try {
        const dogs = await db('dogs').where({ user_id: userId });
        return dogs;
    } catch (error) {
        console.error("Error fetching user's dogs:", error);
        throw new Error("Failed to fetch user's dogs");
    }
};

export const getUserEvents = async (userId) => {
    try {
        const events = await db('events').where({ user_id: userId });
        return events;
    } catch (error) {
        console.error("Error fetching user's events:", error);
        throw new Error("Failed to fetch user's events");
    }
};


