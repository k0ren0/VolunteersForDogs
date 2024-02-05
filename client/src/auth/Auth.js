import { useEffect, useContext } from "react";
import axios from "axios";
import { AuthContext } from "../App";
import { useNavigate } from "react-router-dom";

axios.defaults.withCredentials = true;

const Auth = ({ children }) => {
    const { token, setToken } = useContext(AuthContext); // Используем setToken вместо setAuthStatus
    const navigate = useNavigate();

    useEffect(() => {
        const verify = async () => {
            if (!token) {
                navigate("/login");
                return;
            }

            try {
                await axios.get("http://localhost:5005/users/verify", {
                    headers: {
                        "x-access-token": token,
                    },
                });
                // Предполагаем, что успешный ответ означает, что токен валиден
                // Нет необходимости обновлять токен через setToken, если он валиден
            } catch (error) {
                console.error("Verification failed:", error);
                if (error.response && error.response.status === 403) {
                    // При ошибке 403 (например, токен недействителен) мы могли бы очистить токен
                    setToken(null); // Удаляем токен из контекста, что подразумевает необходимость повторного входа
                    navigate("/login");
                } else {
                    // Обработка других ошибок, например, показ сообщения об ошибке или логирование
                }
            }
        };

        verify();
    }, [navigate, token, setToken]); // Обновляем зависимости useEffect

    return children; // Рендерим дочерние компоненты, если верификация прошла успешно
};

export default Auth;
