import axios from "axios"

const BACKEND_URL = import.meta.env.VITE_BACKEND_URL

const api = axios.create({
    baseURL:BACKEND_URL,
    withCredentials: true,
})

export async function sendMessage({ query }) {
    try {
        const response = await api.post(`${BACKEND_URL}/user-message`, { query });
        return response.data.data;
    } catch (error) {
        const message = error.response?.data?.message || "Something went wrong while sending message";
        throw new Error(message);
    }
}

