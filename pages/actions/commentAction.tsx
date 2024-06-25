import Cookies from "js-cookie";

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
  } catch (error: any) {
    return {
      success: false,
      message: error.message || "An error occurred during get comments",
    };
  }
};

export const addComment = async (comment: {
  comment: string;
  blog: string;
}) => {
  try {
    const response = await fetch("http://localhost:3000/comment/create", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + Cookies.get("Authorization"),
      },
      body: JSON.stringify(comment),
    });

    const responseData = await response.json();
    if (!response.ok) {
      return {
        success: false,
        message: responseData.message || "Failed to add comment",
      };
    }

    return {
      success: true,
      data: responseData,
    };
  } catch (error: any) {
    return {
      success: false,
      message: error.message || "An error occurred during add comment",
    };
  }
};
