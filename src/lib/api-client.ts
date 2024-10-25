import Axios, { InternalAxiosRequestConfig } from 'axios';
import { env } from '../config/env';
import { useNotifications } from '../notigications/notifications-store';

function authRequestInterceptor(config: InternalAxiosRequestConfig) {
  if (config.headers) {
    config.headers.Accept = 'application/json'
  }

  config.withCredentials = false; 

  return config
}

export const api = Axios.create({
  baseURL:env.API_URL,
})

api.interceptors.request.use(authRequestInterceptor)

api.interceptors.response.use (
  (respone) => {
    return respone.data
  },

  (error) => {
    const message = error.respone?.data ?.message || error.message
    useNotifications.getState().addNotification({
      type: 'error',
      title: 'Error',
      message,  // Hiển thị thông báo lỗi trong UI
    });

    if (error.response?.status === 401) {
      const searchParams = new URLSearchParams();
      const redirectTo = searchParams.get('redirectTo');
      window.location.href = `/auth/login?redirectTo=${redirectTo}`;
    }

    return Promise.reject(error);
  }
)