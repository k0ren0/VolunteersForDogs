import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom"; 

// ln -s /Users/koren0/Documents/DI-Bootcamp-TTA8/week11/day4/jwt-lesson/config/db.js

function Users() {
  const [users, setUsers] = useState([]);
  const navigate = useNavigate(); 

  useEffect(() => {
    
    if (!localStorage.getItem("token")) {
      navigate("/login"); 
    } else {
      axios
        .get("http://localhost:5005/users", {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`, 
          },
        })
        .then((response) => {
          console.log("Data acquisition:", response.data); 
          setUsers(response.data);
        })
        .catch((error) => {
          console.error("Fault download data:", error);
        });
    }
  }, [navigate]);

  return (
    <div>
      <h1>Users</h1>
      <ul>
        {users.map((user) => (
          <li key={user.id}>{user.name || "Unnamed User"} - {user.email}</li>
        ))}
      </ul>
    </div>
  );
}

export default Users;
