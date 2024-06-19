import { blogInfoSchema } from "@/schema/blogInfo";
import Cookie from "js-cookie";

const axios = require("axios");

// Define the createBlog function
export const createBlog = async (newBlog: {
  title: string;
  description: string;
  topic: string;
  type: string;
  thumbnail: File;
}) => {
  const { title, topic, type, description, thumbnail } = newBlog;

  // Validate user info
  const result = blogInfoSchema.safeParse({
    title,
    topic,
    type,
    description,
    thumbnail: thumbnail.name,
  });
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
    const accessToken = Cookie.get("Authorization");
    const formData = new FormData();
    formData.append("title", title);
    formData.append("description", description);
    formData.append("topic", topic);
    formData.append("type", type);
    formData.append("thumbnail", thumbnail); // Append the file
    const response = await axios.post(
      "http://localhost:3000/blog/create",
      formData,
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
          "Content-Type": "multipart/form-data",
        },
      }
    );
    return response.data;
  } catch (error: any) {
    console.error("Error creating blog:", error);
    return {
      success: false,
      message: error.response?.data?.message || "Error creating blog",
    };
  }
};
