import Cookies from "js-cookie";
import api from "../lib/axiosClient";

export const getCommentsByBlogId = async (id: string) => {
  try {
    const response = await api.get(`/comment/getbyblog?blog_id=${id}`);

    if (!response.data) {
      return {
        success: false,
        message: response.data.message || "Failed to get comments",
      };
    }

    return {
      success: true,
      data: response.data,
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
    const response = await api.post("/comment/create", comment, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (!response.data) {
      return {
        success: false,
        message: response.data.message || "Failed to add comment",
      };
    }

    return {
      success: true,
      data: response.data,
    };
  } catch (error: any) {
    return {
      success: false,
      message: error.message || "An error occurred during add comment",
    };
  }
};
