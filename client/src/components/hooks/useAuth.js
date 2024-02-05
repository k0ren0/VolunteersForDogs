// hooks/useAuth.js
import { useContext } from "react";
import { AuthContext } from "../App";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";

export const useAuth = () => {
  const { token } = useContext(AuthContext);
  const navigate = useNavigate();

  useEffect(() => {
    if (!token) {
      navigate("/login");
    }
  }, [token, navigate]);

  return token;
};
