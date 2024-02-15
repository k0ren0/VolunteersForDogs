import { register, login, getAllUsers, updateUserById, getUserById, getUserDogsById, getUserEventsById, checkEmailExists } from "../models/users.model.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config();

export const _login = async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await login(email.toLowerCase());

        if (!user || !user.password) {
            return res.status(404).json({ msg: "Email not found or wrong password" });
        }

        const match = bcrypt.compareSync(password, user.password);
        if (!match) {
            return res.status(400).json({ msg: "Wrong password" });
        }

        const user_id = user.user_id;
        const secret = process.env.ACCESS_TOKEN_SECRET;

        const token = jwt.sign({ user_id }, secret, { expiresIn: '1h' });

        const userResponse = { user_id: user.user_id, email: user.email, /* другие безопасные данные пользователя */ };

        res.cookie("token", token, {
            maxAge: 3600 * 1000, // 1 hour
            httpOnly: true,
        });

        res.json({ token, user: userResponse });
    } catch (error) {
        console.log("_login =>", error);
        res.status(500).json({ msg: "Something went wrong!!!" });
    }
};
export const _register = async (req, res) => {
    const { email, password } = req.body;
    const lowerEmail = email.toLowerCase();

    try {
        const emailExists = await checkEmailExists(lowerEmail);
        if (emailExists) {
            return res.status(400).json({ msg: "Email already exists" });
        }

        const salt = bcrypt.genSaltSync(10);
        const hash = bcrypt.hashSync(password, salt);

        const registrationResult = await register(lowerEmail, hash);
        if (registrationResult.success) {
            res.status(201).json({ message: 'User created successfully' });
        } else {
            res.status(400).json({ message: registrationResult.message });
        }
    } catch (error) {
        console.log("_register =>", error);
        res.status(500).json({ msg: "An error occurred during registration" });
    }
};

export const _all = async (req, res) => {
    try {
        const users = await getAllUsers();
        res.json(users);
    } catch (error) {
        res.status(500).json({ message: "Error fetching users", error });
    }
};

export const _updateUserById = async (req, res) => {
    const user_id = req.params.id;
    const { username, email, password, role_id, availability } = req.body;

    try {
        const userData = { username, email, password, role_id, availability };
        await updateUserById(user_id, userData);
        res.json({ message: "User profile updated successfully" });
    } catch (error) {
        res.status(500).json({ message: "Error updating user profile", error });
    }
};

export const _getUserById = async (req, res) => {
    const user_id = req.params.id;

    try {
        const user = await getUserById(user_id);

        if (!user) {
            return res.status(404).json({ msg: "User not found" });
        }

        res.json(user);
    } catch (error) {
        console.log("getUserById =>", error);
        res.status(500).json({ msg: "Something went wrong" });
    }
};

export const _fetchUserDogs = async (req, res) => {
    const user_id = req.user.user_id;
    try {
        const dogs = await getUserDogsById(user_id);
        res.json(dogs);
    } catch (error) {
        res.status(500).json({ msg: "Error fetching user's dogs" });
    }
};

export const _fetchUserEvents = async (req, res) => {
    const user_id = req.user.user_id;
    try {
        const events = await getUserEventsById(user_id);
        res.json(events);
    } catch (error) {
        res.status(500).json({ msg: "Error fetching user's events" });
    }
};


// import { register, login, getAllUsers, updateUserById, getUserById, getUserDogsById, getUserEventsById } from "../models/users.model.js";
// import bcrypt from "bcrypt";
// import jwt from "jsonwebtoken";
// import dotenv from "dotenv";
// dotenv.config();

// export const _login = async (req, res) => {
//     try {
//         const { email, password } = req.body;
//         const user = await login(email.toLowerCase());

//         if (!user || !user.password) {
//             return res.status(404).json({ msg: "Email not found or wrong password" });
//         }

//         const match = bcrypt.compareSync(password, user.password);
//         if (!match) {
//             return res.status(400).json({ msg: "Wrong password" });
//         }

//         const user_id = user.user_id;
//         const secret = process.env.ACCESS_TOKEN_SECRET;

//         const token = jwt.sign({ user_id }, secret, { expiresIn: '1h' });

//         res.cookie("token", token, {
//             maxAge: 3600 * 1000, // 1 hour
//             httpOnly: true,
//         });

//         res.json({ token });
//     } catch (error) {
//         console.log("_login =>", error);
//         res.status(500).json({ msg: "Something went wrong!!!" });
//     }
// };

// export const _register = async (req, res) => {
//     const { email, password } = req.body;
//     const lowerEmail = email.toLowerCase();

//     const salt = bcrypt.genSaltSync(10);
//     const hash = bcrypt.hashSync(password, salt);

//     try {
//         await register(lowerEmail, hash);
//         res.status(201).json({ message: 'User created successfully' });
//     } catch (error) {
//         console.log("_register =>", error);
//         res.status(500).json({ msg: "Email exists" });
//     }
// };

// export const _all = async (req, res) => {
//     try {
//         const users = await getAllUsers();
//         res.json(users);
//     } catch (error) {
//         res.status(500).json({ message: "Error fetching users", error });
//     }
// };

// export const _updateUserById = async (req, res) => {
//     const user_id = req.params.id;
//     const { username, email, password, role_id, availability } = req.body;

//     try {
//         const userData = { username, email, password, role_id, availability };
//         await updateUserById(user_id, userData);
//         res.json({ message: "User profile updated successfully" });
//     } catch (error) {
//         res.status(500).json({ message: "Error updating user profile", error });
//     }
// };

// export const _getUserById = async (req, res) => {
//     const user_id = req.params.id;

//     try {
//         const user = await getUserById(user_id);

//         if (!user) {
//             return res.status(404).json({ msg: "User not found" });
//         }

//         res.json(user);
//     } catch (error) {
//         console.log("getUserById =>", error);
//         res.status(500).json({ msg: "Something went wrong" });
//     }
// };

// export const _fetchUserDogs = async (req, res) => {
//     const user_id = req.user.user_id;
//     try {
//         const dogs = await getUserDogsById(user_id);
//         res.json(dogs);
//     } catch (error) {
//         res.status(500).json({ msg: "Error fetching user's dogs" });
//     }
// };

// export const _fetchUserEvents = async (req, res) => {
//     const user_id = req.user.user_id;
//     try {
//         const events = await getUserEventsById(user_id);
//         res.json(events);
//     } catch (error) {
//         res.status(500).json({ msg: "Error fetching user's events" });
//     }
// };
