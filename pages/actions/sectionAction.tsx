const axios = require("axios");
import Cookies from "js-cookie";

export const getSectionByBlogId = async (id: string) => {
  try {
    const response = await axios.get(
      `http://localhost:3000/section?blog_id=${id}`,
      {
        headers: {
          Authorization: "Bearer " + Cookies.get("Authorization"),
        },
      }
    );

    console.log("Check response", response);
    if (response?.error) {
      return {
        success: false,
        message: response.error,
      };
    } else {
      return {
        success: true,
        message: "Blog created successfully",
        sections: response.data,
      };
    }
  } catch (error: any) {
    return {
      success: false,
      message:
        error.message ||
        error.message ||
        "An error occurred during get section",
    };
  }
};

export const addSection = async (blog_id: string, caption: string) => {
  try {
    const response = await axios.post(
      "http://localhost:3000/section/create",
      {
        blog_id: blog_id,
        caption: caption,
      },
      {
        headers: {
          Authorization: "Bearer " + Cookies.get("Authorization"),
          "Content-Type": "application/json", // Changed to application/json
        },
      }
    );

    // Handle success
    return {
      success: true,
      message: "Images uploaded successfully",
      data: response.data, // Assuming response.data contains relevant data
    };
  } catch (error: any) {
    // Handle error
    console.error("Error uploading images:", error);
    return {
      success: false,
      message: error.response?.data?.message || "Failed to upload images",
    };
  }
};

export const addImageSection = async (formData: FormData, id: string) => {
  try {
    const response = await axios.post(
      `http://localhost:3000/images/upload?blog_id=${id}`,
      formData,
      {
        headers: {
          Authorization: "Bearer " + Cookies.get("Authorization"),
          "Content-Type": "multipart/form-data",
        },
      }
    );

    // Handle success
    return {
      success: true,
      message: "Images uploaded successfully",
      data: response.data, // Assuming response.data contains relevant data
    };
  } catch (error: any) {
    // Handle error
    console.error("Error uploading images:", error);
    return {
      success: false,
      message: error.response?.data?.message || "Failed to upload images",
    };
  }
};

export const deleteBlogAction = async (sectionId: string) => {
  try {
    console.log("Check section id", sectionId);
    const response = await axios.delete(
      `http://localhost:3000/section/delete`,
      {
        params: { section_id: sectionId },
        headers: {
          Authorization: `Bearer ${Cookies.get("Authorization")}`,
        },
      }
    );

    if (response?.error) {
      return {
        success: false,
        message: response.error,
      };
    } else {
      return {
        success: true,
        message: "Blog delete successfully",
        sections: response.data,
      };
    }
  } catch (error: any) {
    return {
      success: false,
      message:
        error.message ||
        error.message ||
        "An error occurred during delete section",
    };
  }
};

export const getNotedSections = async (page: number) => {
  try {
    const response = await fetch(`http://localhost:3000/note?page=${page}`, {
      method: "GET",
      headers: {
        Authorization: "Bearer " + Cookies.get("Authorization"),
      },
    });

    const responseData = await response.json();

    const sections = responseData.map((item: any) => item.section);
    console.log(sections);

    if (!response.ok) {
      return {
        success: false,
        message: responseData.message || "Failed to get noted sections",
      };
    }

    return {
      success: true,
      data: sections,
    };
  } catch (error: any) {
    return {
      success: false,
      message: error.message || "An error occurred during get noted sections",
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
  } catch (error: any) {
    return {
      success: false,
      message: error.message || "An error occurred during note section",
    };
  }
};

export const removeNote = async (id: string) => {
  try {
    const response = await fetch(
      `http://localhost:3000/note/delete?section_id=${id}`,
      {
        method: "PATCH",
        headers: {
          Authorization: "Bearer " + Cookies.get("Authorization"),
        },
      }
    );

    const responseData = await response.json();
    if (!response.ok) {
      return {
        success: false,
        message: responseData.message || "Failed to remove note",
      };
    }

    return {
      success: true,
      data: responseData,
    };
  } catch (error: any) {
    return {
      success: false,
      message: error.message || "An error occurred during remove note",
    };
  }
};
