import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from "firebase/auth"
import { useNavigate } from "react-router-dom"
import { auth, db } from "../config/firebase"
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
            setErrorMsg("")
            setTimeout(() => {
                setSuccessMsg("")
                navigate("/")
            }, 3000)
            return { status: "success" }
        } catch (error) {
            console.log(error);
            switch (error.code) {
                case "auth/too-many-requests":
                    setErrorMsg("Access to this account has been temporarily disabled due to many failed login attempts. You can immediately restore it by resetting your password or you can try again later.")
                    break
                case "auth/wrong-password":
                    setErrorMsg("Wrong password. Try again.")
                    break
                case "auth/user-not-found":
                    setErrorMsg("Account not found. Please create account first!")
                    break
                default:
                    break
            }
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
            console.log("asdasdasd");
            setSuccessMsg("Signup Successful. You will now redirect to login page!")
            setTimeout(() => {
                setSuccessMsg("")
                navigate("/login")
            }, 3000)
            return { status: "success" }
        } catch (error) {
            console.log(error.code);
            switch (error.code) {
                case "auth/weak-password":
                    setErrorMsg("Password should be at least 6 characters.")
                    break;
                case "auth/email-already-in-use":
                    setErrorMsg("This email is already in use. Please use another email.")
                    break;
                default:
                    break;
            }
            setTimeout(() => {
                setErrorMsg("")
            }, 3000)
        }
    }

    return { errorMsg, successMsg, handleLogin, handleSignup }
}

export default useAuthentication