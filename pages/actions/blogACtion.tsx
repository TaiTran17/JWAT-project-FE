import api from "@/pages/lib/axiosClient";
import { blogInfoSchema } from "@/schema/blogInfo";
import Cookie from "js-cookie";
import Cookies from "js-cookie";

const axios = require("axios");

// Define the createBlog function
export const createBlog = async (newBlog: FormData) => {
  try {
    const response = await api.post(
      "http://localhost:3000/blog/create",
      newBlog,
      {
        headers: {
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
  try {
    const response = await api.post(
      "http://localhost:3000/section/create",
      {
        blog_id: data.blog_id,
        caption: data.caption,
      },
      {
        headers: {
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

    const response = await fetch(
      `http://localhost:3000/blog?type=${type}&page=${page}`,
      {
        method: "GET",
        headers: headers,
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
  } catch (error: any) {
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
  } catch (error: any) {
    return {
      success: false,
      message: error.message || "An error occurred during get blog detail",
    };
  }
};
