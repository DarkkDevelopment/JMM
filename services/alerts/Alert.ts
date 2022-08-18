import { toast, ToastPosition } from "react-toastify";
const defaultOptions = {
    autoClose: 5000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: false,
    draggable: true,
    progress: undefined,
}
export class Alert {

    static Error(message: string, position: ToastPosition = 'bottom-center') {
        toast.error(message, {
            position,
            ...defaultOptions,
        });
    }
    static Success(message: string, position: ToastPosition = 'bottom-center') {
        toast.success(message, {
            position,
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: false,
            draggable: true,
            progress: undefined,
        });
    }
}