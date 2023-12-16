import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from "firebase/auth"
import { useNavigate } from "react-router-dom"
import { auth } from "../config/firebase"
import { useState } from "react"
import { doc, setDoc } from "firebase/firestore"

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

    const handleSignup = async (email, password, fullName) => {
        try {
            const userCredential = await createUserWithEmailAndPassword(auth, email, password)
            const ref = doc(db, 'users', userCredential.user.uid)
            await setDoc(ref, {
                email: email,
                full_name: fullName,
                password: password,
            })
            setSuccessMsg("Signup Successfull. You will now redirect to login page!")
            setFullName("")
            setEmail("")
            setPassword("")
            setTimeout(() => {
                setSuccessMsg("")
                navigate("/login")
            }, 3000)
        } catch (error) {
            setErrorMsg(error.message)
            setTimeout(() => {
                setErrorMsg("")
            }, 3000)
        }
    }

    return { errorMsg, successMsg, handleLogin, handleSignup }
}

export default useAuthentication