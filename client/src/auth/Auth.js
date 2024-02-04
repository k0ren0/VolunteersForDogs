import React, { useEffect, useState, useContext } from "react";
import axios from "axios";
import { AuthContext } from "./App";
import { useNavigate } from "react-router-dom";

const PrivateRoute = ({ children }) => {
    const { token } = useContext(AuthContext);
    const [redirect, setRedirect] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        verify();
    }, []);

    const verify = async () => {
        try {
            const response = await axios.get("http://localhost:3001/users/verify", {
                headers: {
                    "x-access-token": token?.token,
                },
            });

            if (response.status === 200) {
                setRedirect(true);
            } else {
                setRedirect(false);
            }
        } catch (error) {
            console.error("Fault of verification:", error);
            setRedirect(false);
        }
    };

    return redirect ? children : <>not authorized</>;
};

export default PrivateRoute;
