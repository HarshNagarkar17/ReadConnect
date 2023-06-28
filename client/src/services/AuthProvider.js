import React, { createContext, useContext, useState } from 'react'

const AuthContext = createContext(null);
export const AuthProvider = ({ children }) => {
    
    const [tokens, setTokens] = useState({
        access: "",
        refresh: ""
    });

    const addToken = (token) => {
        console.log("token: ", token);
        setTokens(token);
    }

    const removeToken = () => {
        setTokens({access: "", refresh: ""});
    }
  return (
    <AuthContext.Provider value={{addToken, removeToken, tokens}}>
        {children}
    </AuthContext.Provider>
  )
}

export const useAuth = () => {
    return useContext(AuthContext);
}