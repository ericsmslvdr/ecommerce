import { signInWithEmailAndPassword } from "firebase/auth"
import { useNavigate } from "react-router-dom"
import { auth } from "../config/firebase"
import { useState } from "react"

const useAuthentication = () => {
    const navigate = useNavigate()

    const [errorMsg, setErrorMsg] = useState("")
    const [successMsg, setSuccessMsg] = useState("")

    const handleLogin = async (email, password) => {
        try {
            await signInWithEmailAndPassword(auth, email, password)
            setSuccessMsg("Login Successfull. You will now automatically get redirected to Home Page!")
            setEmail("")
            setPassword("")
            setErrorMsg("")
            setTimeout(() => {
                setSuccessMsg("")
                navigate("/")
            }, 3000)
        } catch (error) {
            setErrorMsg(error.message)
            setTimeout(() => {
                setErrorMsg("")
            }, 3000)
        }
    }


    return { errorMsg, successMsg, handleLogin }
}

export default useAuthentication