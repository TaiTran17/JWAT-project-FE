import api from "@/pages/lib/axiosClient";
import axios from "axios";

import Cookie from "js-cookie";

export const getSectionByBlogId = async (blog_id: string) => {
  try {
    const response = await api.get(
      `http://localhost:3000/section?blog_id=${blog_id}`
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
        sections: response.data.metadata,
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

export const deleteSectionAction = async (sectionId: string) => {
  try {
    const response = await api.delete(`http://localhost:3000/section/delete`, {
      params: { section_id: sectionId },
    });

    if (response?.error) {
      return {
        success: false,
        message: response.error,
      };
    } else {
      return {
        success: true,
        message: "Blog delete successfully",
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

export const addImageSection = async (formData: FormData, id: string) => {
  try {
    const response = await api.post(
      `http://localhost:3000/images/upload?blog_id=${id}`,
      formData,
      {
        headers: {
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

export const deleteImageSection = async (id: string) => {
  try {
    const response = await api.patch(
      `http://localhost:3000/images/delete?image_id=${id}`,
      {},
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    // Handle success
    return {
      success: true,
      message: "Delete images successfully",
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

export const getFileUpload = async (sectionId: string) => {
  try {
    const response = await api.get(
      `http://localhost:3000/images?section_id=${sectionId}`
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
        files: response.data.metadata,
      };
    }
  } catch (error: any) {
    console.error("Error getting images:", error);
    return {
      success: false,
      message: error.response?.data?.message || "Error getting images",
    };
  }
};

export const getNotedSections = async (page: number) => {
  try {
    const response = await fetch(`http://localhost:3000/note?page=${page}`, {
      method: "GET",
      headers: {
        Authorization: "Bearer " + Cookie.get("Authorization"),
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
          Authorization: "Bearer " + Cookie.get("Authorization"),
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
          Authorization: "Bearer " + Cookie.get("Authorization"),
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
