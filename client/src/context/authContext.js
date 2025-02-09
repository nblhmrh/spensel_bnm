"use client";
import { createContext, useContext, useEffect, useState } from "react";
import axios from "../utils/axios";
import { useRouter } from "next/navigation";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const router = useRouter();

    useEffect(() => {
        const getUser = async () => {
            try {
                const response = await axios.get('/user');
                setUser(response.data);
            } catch (error) {
                console.error("Error fetching user:", error);
            } finally {
                setLoading(false);
            }
        };
        getUser();
    }, []);

    const login = async (form) => {
        setLoading(true);
        try {
            const response = await axios.post('/login', form);
            localStorage.setItem('auth_token', response.data.token);
            setUser(response.data.user);
            router.push('/dashboard');
        } catch (error) {
            console.error("Login error:", error);
            return error;
        } finally {
            setLoading(false);
        }
    };

    const logout = async () => {
        setLoading(true);
        try {
            await axios.post('/logout');
            localStorage.removeItem('auth_token');
            setUser(null);
            router.push('/login');
        } catch (error) {
            console.error("Logout error:", error);
            return error;
        } finally {
            setLoading(false);
        }
    };

    return (
        <AuthContext.Provider value={{ user, login, logout, loading }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => useContext(AuthContext);
