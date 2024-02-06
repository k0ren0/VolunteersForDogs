import { register, login, all } from "../models/users.model.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config();

export const _login = async (req, res) => {
  try {
    const { email, password } = req.body;

    const row = await login(email.toLowerCase());
    
    if (row.length === 0)
      return res.status(404).json({ msg: "email not found" });

    const match = bcrypt.compareSync(password + "", row[0].password);
    if (!match) return res.status(400).json({ msg: "wrong password" });

    const userid = row[0].id;
    const useremail = row[0].email;

    const secret = process.env.ACCESS_TOKEN_SECRET;

    const token = jwt.sign({ userid, useremail }, secret, {
      expiresIn: "90s",
    });

    res.cookie("token", token, {
      maxAge: 90 * 1000,
      httpOnly: true,
    });

    res.json({ token: token });
  } catch (error) {
    console.log("_login =>", error);
    res.status(500).json({ msg: "something went wrong!!!" });
  }
};

export const _register = async (req, res) => {
  const { email, password } = req.body;
  const lowerEmail = email.toLowerCase();

  const salt = bcrypt.genSaltSync(10);
  const hash = bcrypt.hashSync(password + "", salt);

  try {
    const row = await register(lowerEmail, hash);
    res.json(row);
  } catch (error) {
    console.log("_register =>", error);
    res.status(500).json({ msg: "email exists" });
  }
};

export const _all = async (req, res) => {
  try {
    const rows = await all();
    res.json(rows);
  } catch (error) {
    console.log("_all=>", error);
    res.status(404).json({ msg: "not found" });
  }
};

export const _updateUserProfile = async (req, res) => {
  const user_id = req.params.id; // или используйте ID из req.user, если вы его там сохраняете после верификации токена
  const userData = req.body;

  try {
      await updateUser(user_id, userData);
      res.json({ message: "User profile updated successfully" });
  } catch (error) {
      res.status(500).json({ message: "Error updating user profile", error });
  }
};
