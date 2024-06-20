import Cookies from "js-cookie";

export const getSectionByBlogId = async (id: string) => {
  try {
    const response = await fetch(
      `http://localhost:3000/section?blog_id=${id}`,
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
        message: responseData.message || "Failed to get section",
      };
    }

    return {
      success: true,
      data: responseData,
    };
  } catch (error: any) {
    return {
      success: false,
      message: error.message || "An error occurred during get section",
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
