import axios from "axios";
import SummeryApi, { baseURL } from "../common/SummeryApi";

export const googleAuth = (code) => Axios.get(`/auth/google?code=${code}`);
const Axios = axios.create({
    baseURL: baseURL,
    withCredentials: true
});

// ✅ Request Interceptor → har request ke header me accessToken daalna
Axios.interceptors.request.use(
    async (config) => {
        const accessToken = localStorage.getItem("accesstoken");
        if (accessToken) {
            config.headers.Authorization = `Bearer ${accessToken}`;
        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

// ✅ Response Interceptor → 401 error pe refresh token use karna
Axios.interceptors.response.use(
    (response) => {
        return response;
    },
    async (error) => {
        let originRequest = error.config;

        if (error.response?.status === 401 && !originRequest.retry) {
            originRequest.retry = true;
            const refreshToken = localStorage.getItem("refreshToken");

            if (refreshToken) {
                const newAccessToken = await refreshAccessToken(refreshToken);
                if (newAccessToken) {
                    originRequest.headers.Authorization = `Bearer ${newAccessToken}`;
                    return Axios(originRequest);
                }
            }
        }
        return Promise.reject(error);
    }
);

const refreshAccessToken = async (refreshToken) => {
    try {
        const response = await Axios({
            ...SummeryApi.refreshToken,
            headers: {
                Authorization: `Bearer ${refreshToken}`,
            },
        });
        const accessToken = response.data.data.accessToken;
        localStorage.setItem("accesstoken", accessToken);
        return accessToken;
    } catch (error) {
        console.log(error);
    }
};

export default Axios;
