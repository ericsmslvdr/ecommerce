import { toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css'

const useToast = () => {
    const triggerToast = (message) => {
        toast.success(message, {
            position: "bottom-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "light",
        });
    }

    return { triggerToast }
}

export default useToast