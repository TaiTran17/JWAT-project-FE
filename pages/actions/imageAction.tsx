import Cookies from "js-cookie";

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
  } catch (error: any) {
    return {
      success: false,
      message: error.message || "An error occurred during get images",
    };
  }
};
