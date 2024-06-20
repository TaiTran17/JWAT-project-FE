import { userInfoSchema } from "@/schema/userInfo";
import Cookies from "js-cookie";

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

    console.log("Check user", formData);

    const response = await fetch("http://localhost:3000/auth/signup", {
      method: "POST",
      body: formData,
    });

    if (!response.ok) {
      const errorData = await response.json();
      return {
        error: errorData.message || "Failed to sign up",
      };
    }

    const responseData = await response.json();
    return {
      success: true,
      data: responseData,
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
    const response = await fetch("http://localhost:3000/auth/signin", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ username, password }),
    });

    const responseData = await response.json();
    if (!response.ok) {
      return {
        success: false,
        message: responseData.message || "Failed to sign in",
      };
    }

    console.log(responseData.metadata.accessToken);
    console.log("Refresh", responseData.metadata.refreshToken);

    // Set cookies using js-cookie library
    Cookies.set("Authorization", responseData.metadata.accessToken, {
      secure: true, // Adjust as needed for development or HTTPS
      sameSite: "strict", // Add SameSite attribute explicitly,
      expires: 1 / 24,
    });
    Cookies.set("Refresh", responseData.metadata.refreshToken, {
      secure: true, // Adjust as needed for development or HTTPS
      sameSite: "strict", // Add SameSite attribute explicitly
      expires: 7,
    });

    return {
      success: true,
      data: responseData,
      message: responseData.message || "Login successfull",
    };
  } catch (error: any) {
    return {
      success: false,
      message: error.message || "An error occurred during sign in",
    };
  }
};

export const getUserInfo = async (id: string) => {
  try {
    const response = await fetch(`http://localhost:3000/user?user_id=${id}`, {
      method: "GET",
      headers: {
        Authorization: "Bearer " + Cookies.get("Authorization"),
      },
    });

    const responseData = await response.json();
    if (!response.ok) {
      return {
        success: false,
        message: responseData.message || "Failed to get user info",
      };
    }

    return {
      success: true,
      data: responseData,
    };
  } catch (error: any) {
    return {
      success: false,
      message: error.message || "An error occurred during get user info",
    };
  }
};
