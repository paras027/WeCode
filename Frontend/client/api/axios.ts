import axios from "axios";
import {toast} from "sonner"
const api = axios.create({
    baseURL: "http://localhost:5000/api/v1",
    withCredentials: true,
});

api.interceptors.response.use(
    (response) => response,

    async (error) => {

        const originalRequest = error.config;

        if (
            error.response?.status === 401 &&
            !originalRequest._retry
        ) {

            originalRequest._retry = true;

            try {
                console.log("refresh token called")
                const val = await axios.post(
                    "http://localhost:5000/api/v1/auth/refresh-token",{},
                    {
                        withCredentials: true,
                    }
                );
                console.log("refresh token changed",val.data.accessToken)
                return api(originalRequest);

            } catch(e) {

                toast.error("Session expired")
            }
        }
        const status = error.response?.status;
        switch(status){
            case 403:
                toast.error("You dont have permission to perform this action")
                break;
            case 404:
                toast.error("Resource not found")
                break;
            case 429:
                toast.error(error.response?.data?.message??"Too many requests. Please try again after some time")
                break;
            case 500:
                toast.error("Something went wrong on our server")
                break;
            
        }


        return Promise.reject(error);
    }
);

export default api;