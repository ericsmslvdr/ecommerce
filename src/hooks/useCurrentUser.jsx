import { onAuthStateChanged } from "firebase/auth"
import { auth } from "../config/firebase"
import { useState } from "react"

const useCurrentUser = () => {
    const [uid, setUid] = useState(null)
    const [user, setUser] = useState(null)

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, user => {
            if (user) {
                setUser(user.email)
                setUid(user.uid)
                console.log("userrrr");
            }
            else {
                setUser(null)
                setUid(null)
            }
        })

        return () => {
            unsubscribe();
        };
    }, [uid])

    return { uid, user }
}

export default useCurrentUser