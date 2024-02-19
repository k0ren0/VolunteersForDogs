import { useEffect, useContext } from "react";
import axios from "axios";
import { AuthContext } from "../App";
import { useNavigate } from "react-router-dom";

const Auth = ({ children }) => {
  const { token, setToken, setUser } = useContext(AuthContext);
  const navigate = useNavigate();

  useEffect(() => {
    const verifyToken = async () => {
      if (!token) {
        navigate("/login");
        return;
      }
      
      axios.defaults.withCredentials = true; // SetwithCredentials to true

      try {
        const response = await axios.get(`${process.env.REACT_APP_API_URL}/api/verifytoken`, {
          headers: {
            "Authorization": `Bearer ${token}`,
          },
        });

        const { user } = response.data;
        console.log('User data:', user);
        setUser(user); // Set data about user
        
      } catch (error) {
        console.error("Verification failed:", error);
        if (error.response && error.response.status === 403) {
          setToken(null);
          navigate("/login");
        } else {
          console.error("Error:", error.response ? error.response.data : error.message);
        }
      }
    };

    verifyToken(); 
  }, [token, setToken, setUser, navigate]);

  return children;
};

export default Auth;





// import { useEffect, useContext } from "react";
// import axios from "axios";
// import { AuthContext } from "../App";
// import { useNavigate } from "react-router-dom";
// import { verifytoken } from "../middleware/verifyToken";

// axios.defaults.withCredentials = true;

// const Auth = ({ children }) => {
//     const { token, setToken } = useContext(AuthContext);
//     const navigate = useNavigate();

//     useEffect(() => {
//         const verifytoken = async () => {
//             if (!token) {
//                 navigate("/login");
//                 return;
//             }
           
//             try {
//                 await axios.get("http://localhost:5005/api/verifytoken", {
//                     headers: {
//                         "authorization": `Bearer ${token}`,
//                     },
//                 });
//             } catch (error) {
//                 console.error("Verification failed:", error);
//                 if (error.response && error.response.data) {
//                     if (error.response.status === 403) {
//                         // In case of 403 error (e.g., token is invalid), we could clear the token
//                         setToken(null); // Remove token from context, implying the need for re-login
//                         navigate("/login");
//                     } else {
//                         // Handling other errors, e.g., showing error message or logging
//                         console.error("Other error:", error.response.data);
//                     }
//                 } else {
//                     // Handling other errors not related to server response
//                     console.error("Network error or server is not responding:", error);
//                 }
//             }
//         };

//         verifytoken(); 
//     }, [navigate, token, setToken]);

//     return children;
// };

// export default Auth;
