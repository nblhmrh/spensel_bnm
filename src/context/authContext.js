"use client";
import { createContext, useContext, useEffect, useState } from "react";
import axios from "../utils/axios";
import { useRouter } from "next/navigation";
export const AuthContext = createContext();

export const AuthProvider = ({children})=>{
    const[user, setUser]=useState(null)
    const[loading, setLoading]=useState(true)
    const router=useRouter()
    useEffect(()=>{
        const getUser=async()=>{
            try{
                const response=await axios.get('/user')
                setUser(response.data)
            }catch(error){  
                return error
            }
        }
        getUser() 
    },[])

    const login=async(form)=>{
        try{
            const response=await axios.post('/login',form)
            localStorage.setItem('auth_token',response.data.token)
            setUser(response.data.user)
            router.push('/dashboard')
        }
        catch(error){
            return error
        }
    }
    const logout=async()=>{
        try{
            await axios.post('/logout')
            localStorage.removeItem('auth_token')
            setUser(null)
            router.push('/login')
        }
        catch(error){
            return error
        }
    }
    return(
        <AuthContext.Provider value={{user, login, logout, loading}}>
            {children}
        </AuthContext.Provider>
    )
}
export const useAuth=()=>useContext(AuthContext)