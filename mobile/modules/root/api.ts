import axios, {AxiosError, AxiosInstance, AxiosResponse} from 'axios';
import {
    clearSession,
    ensureTokensLoaded,
    getAccessToken,
    getRefreshToken,
    setAccessToken,
    setRefreshToken
} from './session.utils';

const BASE_API_URL = process.env.EXPO_PUBLIC_API_URL;

const api: AxiosInstance = axios.create({
    baseURL: BASE_API_URL,
    withCredentials: true,
});

let isRefreshing = false;
let failedQueue: { resolve: (value: any) => void; reject: (reason?: any) => void; config: any }[] = [];

declare module 'axios' {
    export interface AxiosRequestConfig {
        /**
         * Propriedade customizada para indicar se a requisição já foi retentada
         * após a renovação do token.
         */
        _retry?: boolean;
    }
}

/**
 * Processa a fila de requisições pendentes.
 */
const processQueue = (error: AxiosError | null, token: string | null = null) => {
    failedQueue.forEach(prom => {
        if (error) {
            prom.reject(error);
        } else if (token) {
            prom.resolve(api.request(prom.config));
        }
    });
    failedQueue = [];
};

/**
 * INTERCEPTOR DE RESPOSTA
 * Gerencia a renovação do token quando recebe 401 (Unauthorized).
 */
const responseInterceptor = async (error: AxiosError) => {
    const originalRequest = error.config;

    if (error.response?.status === 401 && originalRequest?.url !== `${BASE_API_URL}/auth/refresh`) {
        if (isRefreshing) {
            try {
                return await new Promise((resolve, reject) => {
                    failedQueue.push({resolve, reject, config: originalRequest});
                });
            } catch (err) {
                return await Promise.reject(err);
            }
        }

        isRefreshing = true;
        if (originalRequest) {
            originalRequest._retry = true;
        }

        return new Promise((resolve, reject) => {
            const refreshToken = getRefreshToken();

            if (!refreshToken) {
                clearSession();
                isRefreshing = false;
                return reject(error);
            }

            api.post('/auth/refresh', {refreshToken: refreshToken})
                .then((res: AxiosResponse) => {
                    const {accessToken, refreshToken: newRefreshToken} = res.data;

                    setAccessToken(accessToken);

                    if (newRefreshToken) {
                        setRefreshToken(newRefreshToken);
                    }

                    processQueue(null, accessToken);

                    originalRequest!.headers.Authorization = `Bearer ${accessToken}`;
                    resolve(api.request(originalRequest!));
                })
                .catch((err) => {
                    processQueue(err);
                    clearSession();
                    console.warn(err)
                    reject(err);
                })
                .finally(() => {
                    isRefreshing = false;
                });
        });
    }
    return Promise.reject(error);
};

/**
 * INTERCEPTOR DE REQUISIÇÃO
 * Insere o Access Token em toda requisição, se ele existir.
 */
const requestInterceptor = async (config: any) => {
    await ensureTokensLoaded();

    const token = getAccessToken();

    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
};

api.interceptors.response.use((response) => response, responseInterceptor);
api.interceptors.request.use(requestInterceptor);

export default api;