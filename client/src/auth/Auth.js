import { useEffect, useContext } from "react";
import axios from "axios";
import { AuthContext } from "../App";
import { useNavigate } from "react-router-dom";

axios.defaults.withCredentials = true;

const Auth = ({ children }) => {
    const { token, setToken } = useContext(AuthContext);
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
                        "authorization": `Bearer ${token}`,
                    },
                });
                // Предполагаем, что успешный ответ означает, что токен валиден
                // Нет необходимости обновлять токен через setToken, если он валиден
            } catch (error) {
                console.error("Verification failed:", error);
                if (error.response) {
                    if (error.response.status === 403) {
                        // При ошибке 403 (например, токен недействителен) мы могли бы очистить токен
                        setToken(null); // Удаляем токен из контекста, что подразумевает необходимость повторного входа
                        navigate("/login");
                    } else {
                        // Обработка других ошибок, например, показ сообщения об ошибке или логирование
                        console.error("Other error:", error.response.data);
                    }
                } else {
                    // Обработка других ошибок, которые не связаны с ответом сервера
                    console.error("Network error or server is not responding:", error);
                }
            }
        };

        verify();
    }, [navigate, token, setToken]);

    return children;
};

export default Auth;

