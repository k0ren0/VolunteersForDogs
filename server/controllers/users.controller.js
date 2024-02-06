import { register, login, all, updateUser, getUserById } from "../models/users.model.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config();

export const _login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await login(email.toLowerCase());

    // Проверка наличия пользователя и его пароля
    if (!user || !user.password) {
      return res.status(404).json({ msg: "Email not found or wrong password" });
    }

    const match = bcrypt.compareSync(password, user.password);
    if (!match) {
      return res.status(400).json({ msg: "Wrong password" });
    }

    const userid = user.id; // Предполагаем, что ваша функция login возвращает id пользователя
    const useremail = user.email; // и его email

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
  const { email, password, user_id } = req.body; // Включаем user_id в теле запроса
  const lowerEmail = email.toLowerCase();

  const salt = bcrypt.genSaltSync(10);
  const hash = bcrypt.hashSync(password + "", salt);

  try {
    // Создаем пользователя с указанным user_id
    await register(lowerEmail, hash, user_id); // Передаем user_id

    res.status(201).json({ message: 'User created successfully' });
  } catch (error) {
    console.log("_register =>", error);
    res.status(500).json({ msg: "email exists" });
  }
};

export const _all = async (req, res) => {
  // Код для получения всех пользователей...
};

export const _updateUserProfile = async (req, res) => {
  const user_id = req.params.id; // Получаем user_id из параметров маршрута
  const userData = req.body;

  try {
      // Обновляем профиль пользователя с указанным user_id
      await updateUser(user_id, userData);

      res.json({ message: "User profile updated successfully" });
  } catch (error) {
      res.status(500).json({ message: "Error updating user profile", error });
  }
};

export const _getUserById = async (req, res) => {
  const user_id = req.params.id;

  try {
    const user = await getUserById(user_id); // Замените на функцию, которая получает пользователя из базы данных

    if (!user) {
      return res.status(404).json({ msg: "User not found" });
    }

    res.json(user);
  } catch (error) {
    console.log("getUserById =>", error);
    res.status(500).json({ msg: "Something went wrong" });
  }
};
