/*
 * @Author: wangtong wangtong@chukong-inc.com
 * @Date: 2025-10-10 15:39:12
 * @LastEditors: wangtong wangtong@chukong-inc.com
 * @LastEditTime: 2025-10-13 16:10:32
 * @FilePath: /next_project/my-next-app/src/services/http.ts
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
import axios, {
  AxiosError,
  AxiosInstance,
  AxiosRequestConfig,
} from 'axios';

const baseURL =
  process.env.NEXT_PUBLIC_API_BASE_URL ?? '';

const http: AxiosInstance = axios.create({
  baseURL,
  timeout: 10000,
  withCredentials: true,
});


// 请求拦截器：在浏览器环境自动附加 Authorization 令牌
http.interceptors.request.use(
  (config) => {
    if (typeof window !== 'undefined') {
      const token = localStorage.getItem('token');
      if (token) {
        config.headers = config.headers ?? {};
        config.headers.Authorization = `Bearer ${token}`;
      }
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// 响应拦截器：统一返回 data，并标准化错误对象
http.interceptors.response.use(
  (response) => response.data,
  (error: AxiosError) => {
    const status = error.response?.status;
    const message = error.message;
    const data = error.response?.data as { code: number; message: string,data:unknown };
    return Promise.reject({ status, message, data });
  }
);

type RequestConfig<D = unknown> = AxiosRequestConfig<D>;

const request = {
  get<T = unknown>(url: string, config?: RequestConfig) {
    return http.get<unknown, T>(url, config);
  },
  post<T = unknown, D = unknown>(url: string, data?: D, config?: RequestConfig<D>) {
    return http.post<unknown, T, D>(url, data, config);
  },
  put<T = unknown, D = unknown>(url: string, data?: D, config?: RequestConfig<D>) {
    return http.put<unknown, T, D>(url, data, config);
  },
  patch<T = unknown, D = unknown>(url: string, data?: D, config?: RequestConfig<D>) {
    return http.patch<unknown, T, D>(url, data, config);
  },
  delete<T = unknown>(url: string, config?: RequestConfig) {
    return http.delete<unknown, T>(url, config);
  },
  // 如需更高级的控制，可直接使用实例
  instance: http,
};

export default request;