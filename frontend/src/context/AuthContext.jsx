import { createContext, useContext, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";

const AuthContext = createContext();
const BACKEND_URL = "http://localhost:5000/api/auth";

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(JSON.parse(localStorage.getItem("user")) || null);

  const register = async (name, email, password) => {
    try {
      const res = await axios.post(`${BACKEND_URL}/register`, { name, email, password });
      localStorage.setItem("user", JSON.stringify(res.data.user));
      setUser(res.data.user);
    } catch (error) {
      const errorMsg = error.response?.data?.message || "Registration failed!";
      throw new Error(errorMsg);
    }
  };

  const login = async (email, password) => {
    try {
      const res = await axios.post(`${BACKEND_URL}/login`, { email, password });
      localStorage.setItem("user", JSON.stringify(res.data.user));
      setUser(res.data.user);
    } catch (error) {
      const errorMsg = error.response?.data?.message || "Invalid credentials!";
      throw new Error(errorMsg);
    }
  };

  const deleteAccount = async () => {
    try {
      const userId = user?._id; 
      if (!userId) {
        console.error("No user ID found");
        return;
      }
  
      const res = await axios.delete(`${BACKEND_URL}/delete`, {
        data: { userId }, 
      });
  
      if (res.status === 200) {
        localStorage.removeItem("user"); 
        setUser(null);
        window.location.href = "/"; 
        alert(res.data.message);
      }
    } catch (error) {
      console.error("Error deleting account:", error.response?.data?.message);
    }
  };
  

  const logout = () => {
    localStorage.removeItem("user");
    setUser(null);
    toast.success("Logged out successfully!");
    window.location.href = "/"; 
  };

  return (
    <AuthContext.Provider value={{ user, register, login,deleteAccount , logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
