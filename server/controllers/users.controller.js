import { register, login, all, updateUser, getUserById } from "../models/users.model.js";
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

    const userid = user.id;
    const useremail = user.email;

    const secret = process.env.ACCESS_TOKEN_SECRET;
    const token = jwt.sign({ userid, useremail }, secret, { expiresIn: "90s" });

    res.cookie("token", token, {
      maxAge: 90 * 1000,
      httpOnly: true,
    });

    res.json({ token });
  } catch (error) {
    console.log("_login =>", error);
    res.status(500).json({ msg: "Something went wrong!!!" });
  }
};

export const _register = async (req, res) => {
  const { email, password, user_id } = req.body;
  const lowerEmail = email.toLowerCase();

  const salt = bcrypt.genSaltSync(10);
  const hash = bcrypt.hashSync(password + "", salt);

  try {
    await register(lowerEmail, hash, user_id);
    res.status(201).json({ message: 'User created successfully' });
  } catch (error) {
    console.log("_register =>", error);
    res.status(500).json({ msg: "Email exists" });
  }
};

export const _all = async (req, res) => {
  try {
    const users = await all();
    res.json(users);
  } catch (error) {
    res.status(500).json({ message: "Error fetching users", error });
  }
};

export const _updateUserProfile = async (req, res) => {
  const user_id = req.params.id;
  const userData = req.body;

  try {
      await updateUser(user_id, userData);
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



