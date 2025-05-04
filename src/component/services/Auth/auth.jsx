import { createContext, useContext } from 'react'

export const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {

    const storetokenInLs = (serverToken) => {
        return localStorage.setItem("token", serverToken)
    }

    return (
        <AuthContext.Provider value={{ storetokenInLs }}>
            {children}
        </AuthContext.Provider>
    )
}

export const useAuth = () =>{
    const authContextValue = useContext(AuthContext)
    if(!authContextValue){
        throw new Error("useAuth used outside of the Provider");
    }
    return authContextValue
}