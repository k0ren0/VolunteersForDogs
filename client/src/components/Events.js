import React, { useEffect, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import axios from "axios";

const Events = () => {
  const [isAuthorized, setIsAuthorized] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    axios.get("http://localhost:5005/users/verify", { withCredentials: true })
      .then(() => {
        setIsAuthorized(true); // Пользователь аутентифицирован
      })
      .catch((error) => {
        console.error("Verification failed:", error);
        setIsAuthorized(false); // Нет перенаправления, устанавливаем статус неавторизованности
      });
  }, [navigate]);

  // Сообщение для неаутентифицированных пользователей
  if (!isAuthorized) {
    return (
      <div>
        <h1>Access Denied</h1>
        <p>Доступ к этой странице возможен только после авторизации.</p>
        <p>Пожалуйста, <Link to="/login">войдите в свой аккаунт</Link>, чтобы получить доступ к защищенной информации.</p>
      </div>
    );
  }

  // Отображаем контент для аутентифицированных пользователей
  return (
    <div>
      <h1>Information</h1>
      <p>Это защищенная страница с информацией, доступной только после авторизации.</p>
      <Link to="/">Вернуться на главную</Link>
    </div>
  );
};

export default Events;
