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
  } catch (error) {
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
      sameSite: "None", // Add SameSite attribute explicitly
    });
    Cookies.set("Refresh", responseData.metadata.refreshToken, {
      secure: true, // Adjust as needed for development or HTTPS
      sameSite: "None", // Add SameSite attribute explicitly
    });

    return {
      success: true,
      data: responseData,
      message: responseData.message || "Login successfull",
    };
  } catch (error) {
    return {
      success: false,
      message: error.message || "An error occurred during sign in",
    };
  }
};

export const getBlog = async (type: string, page: number) => {
  try {
    const response = await fetch(
      `http://localhost:3000/blog?type=${type}&page=${page}`,
      {
        method: "GET",
        headers: {
          Authorization: "Bearer " + Cookies.get("Authorization"),
        },
      }
    );

    const responseData = await response.json();
    if (!response.ok) {
      return {
        success: false,
        message: responseData.message || "Failed to get blog",
      };
    }

    return {
      success: true,
      data: responseData,
    };
  } catch (error) {
    return {
      success: false,
      message: error.message || "An error occurred during get blog",
    };
  }
};

export const getBlogDetail = async (id: string) => {
  try {
    const response = await fetch(
      `http://localhost:3000/blog/getbyBlogId?blog_id=${id}`,
      {
        method: "GET",
        headers: {
          Authorization: "Bearer " + Cookies.get("Authorization"),
        },
      }
    );

    const responseData = await response.json();
    if (!response.ok) {
      return {
        success: false,
        message: responseData.message || "Failed to get blog detail",
      };
    }

    return {
      success: true,
      data: responseData,
    };
  } catch (error) {
    return {
      success: false,
      message: error.message || "An error occurred during get blog detail",
    };
  }
};

export const getSectionByBlogId = async (id: string) => {
  try {
    const response = await fetch(
      `http://localhost:3000/section?blog_id=${id}`,
      {
        method: "GET",
        headers: {
          Authorization: "Bearer " + Cookies.get("Authorization"),
        },
      }
    );

    const responseData = await response.json();
    if (!response.ok) {
      return {
        success: false,
        message: responseData.message || "Failed to get section",
      };
    }

    return {
      success: true,
      data: responseData,
    };
  } catch (error) {
    return {
      success: false,
      message: error.message || "An error occurred during get section",
    };
  }
};

export const getImagesBySectionId = async (id: string) => {
  try {
    const response = await fetch(
      `http://localhost:3000/images?section_id=${id}`,
      {
        method: "GET",
        headers: {
          Authorization: "Bearer " + Cookies.get("Authorization"),
        },
      }
    );

    const responseData = await response.json();
    if (!response.ok) {
      return {
        success: false,
        message: responseData.message || "Failed to get images",
      };
    }

    return {
      success: true,
      data: responseData,
    };
  } catch (error) {
    return {
      success: false,
      message: error.message || "An error occurred during get images",
    };
  }
};

export const getCommentsByBlogId = async (id: string) => {
  try {
    const response = await fetch(
      `http://localhost:3000/comment/getbyblog?blog_id=${id}`,
      {
        method: "GET",
        headers: {
          Authorization: "Bearer " + Cookies.get("Authorization"),
        },
      }
    );

    const responseData = await response.json();
    if (!response.ok) {
      return {
        success: false,
        message: responseData.message || "Failed to get comments",
      };
    }

    return {
      success: true,
      data: responseData,
    };
  } catch (error) {
    return {
      success: false,
      message: error.message || "An error occurred during get comments",
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
  } catch (error) {
    return {
      success: false,
      message: error.message || "An error occurred during get user info",
    };
  }
};

export const noteSection = async (id: string) => {
  try {
    const response = await fetch(
      `http://localhost:3000/note?section_id=${id}`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + Cookies.get("Authorization"),
        },
        body: JSON.stringify({ id }),
      }
    );

    const responseData = await response.json();
    if (!response.ok) {
      return {
        success: false,
        message: responseData.message || "Failed to note section",
      };
    }

    return {
      success: true,
      data: responseData,
    };
  } catch (error) {
    return {
      success: false,
      message: error.message || "An error occurred during note section",
    };
  }
};
