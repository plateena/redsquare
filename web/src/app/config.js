import { Bounce } from "react-toastify";

export const apiConfig = {
    url: 'http://localhost:8000/api/v1',
}

export const toastOptions = {
    position: "top-right",
    autoClose: 5000,
    hideProgressBar: true,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
    theme: "colored",
    transition: Bounce,
};