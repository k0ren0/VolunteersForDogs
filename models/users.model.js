import { db } from "../config/db.js"; 

export const register = (email, password) => {
    // return db("users").insert({ email, password }, ["id", 'email', "password"]);
    return db("users").insert({ email, password });
};

export const login = (email) => {
    // return db("users").select("id", 'email', "password").where({ email });
    return db("users").select("email", "password").where({ email });
};

export const all = () => {
    // return db("users").select("id", 'email', "password").orderBy('id');
    return db("users").select("email", "password").orderBy('id');
};
