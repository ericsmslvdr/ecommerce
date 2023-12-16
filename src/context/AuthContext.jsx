import { onAuthStateChanged } from "firebase/auth";
import { createContext, useContext, useEffect, useState } from "react";
import { auth } from "../config/firebase";

const UserContext = createContext()

const AuthContextProvider = ({ children }) => {
    const [currentUser, setCurrentUser] = useState(null)

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (user) => {
            setCurrentUser(user)
        })
        return () => {
            unsubscribe()
        }
    }, [currentUser])

    return (
        <UserContext.Provider value={{ currentUser }}>
            {children}
        </UserContext.Provider>
    )
}

const UserAuth = () => {
    return useContext(UserContext)
}

export {
    AuthContextProvider,
    UserAuth
}