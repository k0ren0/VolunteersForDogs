import React, { useEffect, useContext } from "react";
import axios from "axios";
import { AuthContext } from "../App";
import { useNavigate } from "react-router-dom";

const Auth = ({ children }) => {
    const { token } = useContext(AuthContext);
    const navigate = useNavigate();

    useEffect(() => {
        const verify = async () => {
            try {
                const response = await axios.get("http://localhost:5005/users/verify", {
                    headers: {
                        "x-access-token": token, // Отправляем токен через x-access-token
                    },
                });

                if (response.status !== 200) {
                    // Если статус ответа не 200, считаем пользователя неавторизованным
                    throw new Error('Unauthorized');
                }
            } catch (error) {
                console.error("Verification failed:", error);
                if (error.response && error.response.status === 403) {
                    // Особая обработка для статуса 403 Forbidden
                    navigate("/login"); // Перенаправляем на страницу входа
                } else {
                    // Обработка других видов ошибок
                    navigate("/login"); // В этом примере также перенаправляем на страницу входа для упрощения
                }
            }
        };

        verify();
    }, [navigate, token]); // Добавляем navigate и token в массив зависимостей

    return children; // Рендерим дочерние компоненты, если верификация прошла успешно
};

export default Auth;
