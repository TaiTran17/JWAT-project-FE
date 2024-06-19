import axios from "axios";
import Cookie from "js-cookie";

const api = axios.create({
  baseURL: "http://localhost:3000", // Your API base URL
});

api.interceptors.request.use(
  (config) => {
    const accessToken = Cookie.get("Authorization");
    console.log(accessToken);
    if (accessToken) {
      config.headers["Authorization"] = `Bearer ${accessToken}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

api.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    if (error.response.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;
      const refreshToken = Cookie.get("Refresh");

      if (refreshToken) {
        try {
          const response = await axios.post(
            "http://localhost:3000/auth/refresh",
            { refreshToken }
          );
          const { accessToken } = response.data;
          Cookie.set("Authorization", accessToken);
          Cookie.set("Refresh", refreshToken);
          axios.defaults.headers.common[
            "Authorization"
          ] = `Bearer ${accessToken}`;
          originalRequest.headers["Authorization"] = `Bearer ${accessToken}`;
          return api(originalRequest);
        } catch (err) {
          // Handle token refresh failure, e.g., redirect to login
          console.error("Refresh token is invalid or expired");
          window.location.href = "/login";
        }
      } else {
        // No refresh token, redirect to login
        window.location.href = "/login";
      }
    }
    return Promise.reject(error);
  }
);

export default api;
