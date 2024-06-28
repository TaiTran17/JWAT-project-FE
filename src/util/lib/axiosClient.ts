import axios from "axios";
import Cookie from "js-cookie";

const api = axios.create({
  baseURL: "http://localhost:3000", // Your API base URL
});

// Request Interceptor
api.interceptors.request.use(
  (config) => {
    const accessToken = Cookie.get("Authorization");

    if (accessToken) {
      config.headers["Authorization"] = `Bearer ${accessToken}`;
    }

    return config;
  },
  (error) => {
    console.error("Request Interceptor Error:", error);
    return Promise.reject(error);
  }
);

// Response Interceptor
api.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    // Check if the error is due to an unauthorized response (401 status code)
    if (
      error.response &&
      error.response.status === 401 &&
      !originalRequest._retry
    ) {
      originalRequest._retry = true;
      const currentRefreshToken = Cookie.get("Refresh");

      if (currentRefreshToken) {
        try {
          const response = await axios.post(
            "http://localhost:3000/auth/refresh",
            {},
            {
              headers: {
                Authorization: `Bearer ${currentRefreshToken}`,
              },
            }
          );

          const { accessToken, refreshToken } = response.data.metadata;

          // Set new tokens in cookies
          Cookie.set("Authorization", accessToken);
          Cookie.set("Refresh", refreshToken);

          // Set new tokens in cookies
          Cookie.set("Authorization", accessToken);
          Cookie.set("Refresh", refreshToken);

          // Update Authorization header for the new request
          originalRequest.headers["Authorization"] = `Bearer ${accessToken}`;

          return api(originalRequest); // Retry the original request with new token
        } catch (err) {
          console.error("Refresh token is invalid or expired:", err);
          return Promise.reject(err); // Reject promise to handle error outside interceptor
        }
      } else {
        console.log("No refresh token available, redirecting to login.");
        return Promise.reject(error); // Reject promise to handle error outside interceptor
      }
    }

    // For other errors, return the original error
    return Promise.reject(error);
  }
);

export default api;
