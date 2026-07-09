import { createContext, useContext, useEffect, useState } from "react";
import API from "../services/axios";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {

    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    // Login
   const signin = async (email, password) => {
  const res = await API.post("/client/signin", {
    email,
    password,
  });

  console.log(res.data); // Add this

  localStorage.setItem("token", res.data.token);
  setUser(res.data.user);

  return res.data;
};

    // Signup
    const signup = async (fullname, email, password) => {

        const res = await API.post("/client/create", {
            fullname,
            email,
            password,
        });

        return res.data;
    };

    // Logout
    const logout = async () => {

        await API.get("/client/logout");

        localStorage.removeItem("token");

        setUser(null);
    };

    // Fetch Current User

    const getMe = async () => {

        try {

            const token = localStorage.getItem("token");

            if (!token) {
                setLoading(false);
                return;
            }

            const res = await API.get("/client/me", {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });

            setUser(res.data.user);

        } catch (error) {

            setUser(null);
            localStorage.removeItem("token");

        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        getMe();
    }, []);

    return (

        <AuthContext.Provider
            value={{
                user,
                loading,
                signin,
                signup,
                logout,
            }}
        >

            {children}

        </AuthContext.Provider>
    );
};

export const useAuth = () => useContext(AuthContext);