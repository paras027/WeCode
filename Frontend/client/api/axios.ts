import axios from "axios";

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

                console.log(e)
            }
        }

        return Promise.reject(error);
    }
);

export default api;