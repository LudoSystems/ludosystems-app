import React, { useState } from "react";
import AuthService from "../services/AuthService";

export const CurrentUserContext = React.createContext();

export const CurrentUserProvider = ({ children }) => {
    const [currentUser, setCurrentUser] = useState(AuthService.getCurrentUser());
    
    const updateCurrentUser = () => {
        setCurrentUser(AuthService.getCurrentUser());
    };

    const logout = () => {
        AuthService.logout();

        setCurrentUser(null);
    };

    return (
        <CurrentUserContext.Provider value={{currentUser, updateCurrentUser, logout }}>
            {children}
        </CurrentUserContext.Provider>
    )
}

export const useCurrentUser = () => React.useContext(CurrentUserContext);