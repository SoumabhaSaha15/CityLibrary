import axios from "axios";
import Cookies from "js-cookie";
const base = axios.create({
  baseURL: '/api',
  withCredentials: true,
  validateStatus: (_) => true
});

base.interceptors.request.use(
  (config) => {
    const unsafeMethods = ['POST', 'PUT', 'PATCH', 'DELETE'];
    if (unsafeMethods.includes(config.method?.toUpperCase() || '')) {
      const csrfToken = Cookies.get('csrftoken'); // Read the cookie using js-cookie
      if (csrfToken) config.headers['X-CSRFToken'] = csrfToken;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

base.interceptors.response.use(
  (response) => response,
  (error) => {
    const status = error.response ? error.response.status : null;
    if (status === 401 || status === 403) console.warn('Session expired. Redirecting to login.');
    return Promise.reject(error);
  }
);
export default base;