import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function Profile() {
  const [users, setUsers] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    // Проверяем, есть ли токен в localStorage
    const token = localStorage.getItem("token");
    if (!token) {
      // Если токена нет, перенаправляем на страницу входа
      navigate("/login");
    } else {
      // Если токен есть, делаем запрос к серверу для получения данных пользователей
      axios
        .get("http://localhost:5005/users", {
          headers: {
            "x-access-token": token, // Отправляем токен через заголовок x-access-token
          },
        })
        .then((response) => {
          // Обрабатываем успешный ответ от сервера
          console.log("Data acquisition:", response.data);
          setUsers(response.data); // Сохраняем полученные данные пользователей в состояние
        })
        .catch((error) => {
          // Обрабатываем возможные ошибки
          console.error("Failed to fetch user data:", error);
          // Дополнительно можно обработать разные типы ошибок
          // Например, если ошибка 403, перенаправить на страницу входа
          if (error.response && error.response.status === 403) {
            navigate("/login");
          }
        });
    }
  }, [navigate]); // Зависимость от navigate для useEffect

  return (
    <div>
      <h1>Users</h1>
      <ul>
        {users.map((user) => (
          <li key={user.email}>
            {user.name || "Unnamed User"} - {user.email}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Profile;


// import React, { useEffect, useState } from "react";
// import axios from "axios";
// import { useNavigate } from "react-router-dom";

// function Profile() {
//   const [users, setUsers] = useState([]);
//   const navigate = useNavigate();

//   useEffect(() => {
//     // Проверяем, есть ли токен в localStorage
//     const token = localStorage.getItem("token");
//     if (!token) {
//       // Если токена нет, перенаправляем на страницу входа
//       navigate("/login");
//     } else {
//       // Если токен есть, делаем запрос к серверу для получения данных пользователей
//       axios
//         .get("http://localhost:5005/users", {
//           headers: {
//             "x-access-token": token, // Отправляем токен через заголовок x-access-token
//           },
//         })
//         .then((response) => {
//           // Обрабатываем успешный ответ от сервера
//           console.log("Data acquisition:", response.data);
//           setUsers(response.data); // Сохраняем полученные данные пользователей в состояние
//         })
//         .catch((error) => {
//           // Обрабатываем возможные ошибки
//           console.error("Fault download data:", error);
//           // Дополнительно можно обработать разные типы ошибок
//           // Например, если ошибка 403, перенаправить на страницу входа
//           if (error.response && error.response.status === 403) {
//             navigate("/login");
//           }
//         });
//     }
//   }, [navigate]); // Зависимость от navigate для useEffect

//   return (
//     <div>
//       <h1>Users</h1>
//       <ul>
//         {users.map((user) => (
//           <li key={user.id}>{user.name || "Unnamed User"} - {user.email}</li>
//         ))}
//       </ul>
//     </div>
//   );
// }

// export default Profile;
