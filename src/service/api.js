import axios from "axios";

const api = axios.create({
    baseURL: "https://resume-backend-d0z1.onrender.com/api"
});

// Add JWT token to every API request
api.interceptors.request.use(
    (config) => {

        const token =
            localStorage.getItem("token");

        if (token) {

            config.headers.Authorization =
                `Bearer ${token}`;
        }

        return config;
    },

    (error) => {

        return Promise.reject(error);
    }
);

export default api;