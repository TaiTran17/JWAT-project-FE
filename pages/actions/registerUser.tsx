import { userInfoSchema } from "@/schema/userInfo";

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
