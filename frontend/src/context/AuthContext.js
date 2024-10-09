import React, { createContext, useState, useEffect } from "react";
import { getUserProfile } from "../services/UserService"; // Ensure this is defined in UserService

export const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUser = async () => {
      const token = localStorage.getItem("token");
      if (token) {
        try {
          const userData = await getUserProfile();
          setUser(userData);
        } catch (error) {
          console.error("Error fetching user profile:", error);
        }
      }
      setLoading(false);
    };

    fetchUser();
  }, []);

  return (
    <AuthContext.Provider value={{ user, setUser, loading }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
