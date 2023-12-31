import { Navigate } from "react-router-dom"
import { UserAuth } from "../context/AuthContext"

const ProtectedRoute = ({ children }) => {
    const { currentUser } = UserAuth()

    if (!currentUser) {
        return <Navigate to={"/"} />
    }

    return children
}

export default ProtectedRoute