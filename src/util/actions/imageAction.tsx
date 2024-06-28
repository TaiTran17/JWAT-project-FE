import Cookies from "js-cookie";
import api from "../lib/axiosClient";

export const getImagesBySectionId = async (id: string) => {
  try {
    const response = await api.get(`/images?section_id=${id}`);

    if (!response.data) {
      return {
        success: false,
        message: response.data.message || "Failed to get images",
      };
    }

    return {
      success: true,
      data: response.data.metadata,
    };
  } catch (error: any) {
    return {
      success: false,
      message: error.message || "An error occurred during get images",
    };
  }
};
