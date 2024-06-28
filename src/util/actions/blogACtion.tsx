import api from "@/src/util/lib/axiosClient";
import { blogInfoSchema } from "@/schema/blogInfo";
import Cookie from "js-cookie";
import Cookies from "js-cookie";

const axios = require("axios");

// Define the createBlog function
export const createBlog = async (newBlog: FormData) => {
  try {
    const accessToken = Cookie.get("Authorization");

    const response = await api.post(
      "http://localhost:3000/blog/create",
      newBlog,
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
          "Content-Type": "multipart/form-data",
        },
      }
    );
    // return response.data;
    if (response?.error) {
      return {
        success: false,
        message: response?.error,
      };
    } else {
      return {
        success: true,
        message: "Blog created successfully",
        newBlog: response.data,
      };
    }
  } catch (error: any) {
    console.error("Error creating blog:", error);
    return {
      success: false,
      message: error.response?.data?.message || "Error creating blog",
    };
  }
};

export const addSectionToBlog = async (data: any) => {
  const accessToken = Cookie.get("Authorization");

  try {
    const response = await api.post(
      "http://localhost:3000/section/create",
      {
        blog_id: data.blog_id,
        caption: data.caption,
      },
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
          "Content-Type": "application/json",
        },
      }
    );
    // return response.data;
    if (response?.error) {
      return {
        success: false,
        message: response.error,
      };
    } else {
      return {
        success: true,
        message: "Section created successfully",
        newBlog: response.data,
      };
    }
  } catch (error: any) {
    console.error("Error creating section:", error);
    return {
      success: false,
      message: error.response?.data?.message || "Error creating section",
    };
  }
};

export const getBlog = async (type: string, page: number, token?: string) => {
  try {
    const headers: HeadersInit = {
      Authorization: token ? `Bearer ${token}` : "",
    };

    const response = await api.get(`/blog?type=${type}&page=${page}`);

    if (!response.data) {
      return {
        success: false,
        message: response.data.message || "Failed to get blog",
      };
    }

    return {
      success: true,
      data: response.data,
    };
  } catch (error: any) {
    return {
      success: false,
      message: error.message || "An error occurred during get blog",
    };
  }
};

export const getBlogDetail = async (id: string) => {
  try {
    const response = await api.get(
      `http://localhost:3000/blog/getbyBlogId?blog_id=${id}`
    );

    if (!response.data) {
      return {
        success: response.data.message || "Failed to get blog detail",
      };
    }

    return {
      success: true,
      data: response.data,
    };
  } catch (error: any) {
    return {
      success: false,
      message: error.message || "An error occurred during get blog detail",
    };
  }
};
