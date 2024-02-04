import { useState, useEffect } from "react";
import axios from "axios";

const Home = (props) => {
        const[users, setUsers] = useState([]);

    
    useEffect(() => {
        getusers()
    },[])

    const getusers = async() => {
        try {
            const response = await axios.get("http://localhost:5005/users/");
            if(response === 200) setUsers(response.data);
        } catch (error) {
            
        }
    }

    return (
      <>
        <h1>Home</h1>
        {
            users.map(user=> {
                return <div key={user.id}> {user.email} </div>

            })
        }
      </>
    );
  };
  export default Home;