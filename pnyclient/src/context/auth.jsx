

import { createContext, useState , useEffect, useContext} from "react";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [auth, setAuth] = useState({
        user: null,
        token: ' ',
        refreshToken: ' '
    });
    useEffect(() => {
        const authUser = JSON.parse(localStorage.getItem('auth'));
        authUser && setAuth(authUser)
    }, []);
    return (
        <AuthContext.Provider value={[ auth, setAuth ]}>
            {children}
        </AuthContext.Provider>
    );
}   

export const useAuth = () => useContext(AuthContext);
export default AuthProvider;