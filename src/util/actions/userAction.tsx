import { userInfoSchema } from "@/schema/userInfo";
import Cookies from "js-cookie";
import api from "../lib/axiosClient";

export const registerUser = async (newUser: {
  username: string;
  password: string;
  avatar: File;
}) => {
  const { username, password, avatar } = newUser;

  // Validate user info
  const result = userInfoSchema.safeParse({ username, password });
  if (!result.success) {
    let errorMessage = "";
    result.error.issues.forEach((issue) => {
      errorMessage += `${issue.path[0]}: ${issue.message}. `;
    });

    return {
      error: errorMessage,
    };
  }

  try {
    const formData = new FormData();
    formData.append("username", username);
    formData.append("password", password);
    formData.append("avatar", avatar);

    const response = await api.post("/auth/signup", formData, {});

    if (!response.data) {
      return {
        error: response.data.message || "Failed to sign up",
      };
    }

    return {
      success: true,
      data: response.data,
    };
  } catch (error: any) {
    return {
      error: error.message || "An error occurred during sign up",
    };
  }
};

export const loginUser = async (user: {
  username: string;
  password: string;
}) => {
  const { username, password } = user;

  // Validate user info
  const result = userInfoSchema.safeParse({ username, password });
  if (!result.success) {
    let errorMessage = "";
    result.error.issues.forEach((issue) => {
      errorMessage += `${issue.path[0]}: ${issue.message}. `;
    });

    return {
      error: errorMessage,
    };
  }

  try {
    const response = await api.post(
      "/auth/signin",
      { username, password },
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    if (!response.data) {
      return {
        success: false,
        message: response.data.message || "Failed to sign in",
      };
    }

    console.log(response.data.metadata.accessToken);
    console.log("Refresh", response.data.metadata.refreshToken);

    // Set cookies using js-cookie library
    Cookies.set("Authorization", response.data.metadata.accessToken, {
      secure: true, // Adjust as needed for development or HTTPS
      sameSite: "strict", // Add SameSite attribute explicitly,
      expires: 1 / 24,
    });
    Cookies.set("Refresh", response.data.metadata.refreshToken, {
      secure: true, // Adjust as needed for development or HTTPS
      sameSite: "strict", // Add SameSite attribute explicitly
      expires: 7,
    });

    return {
      success: true,
      data: response.data,
      message: response.data.message || "Login successful",
    };
  } catch (error: any) {
    return {
      success: false,
      message:
        error.response?.data?.message ||
        error.message ||
        "An error occurred during sign in",
    };
  }
};

export const getUserInfo = async (id: string) => {
  try {
    const response = await api.get(`/user?user_id=${id}`);

    if (!response.data) {
      return {
        success: false,
        message: response.data.message || "Failed to get user info",
      };
    }

    return {
      success: true,
      data: response.data,
    };
  } catch (error: any) {
    return {
      success: false,
      message: error.message || "An error occurred during get user info",
    };
  }
};

export const getCurrentUser = async () => {
  try {
    const response = await api.get("/user/get-user-jwt");

    if (!response.data) {
      return {
        success: false,
        message: response.data.message || "Failed to get current user",
      };
    }

    return {
      success: true,
      data: response.data,
    };
  } catch (error: any) {
    return {
      success: false,
      message: error.message || "An error occurred during get current user",
    };
  }
};
