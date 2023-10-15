import { authService } from "./authService";

const apiUrl = process.env.REACT_APP_API_URL;

const httpClient = async (url, userToken, options = {}) => {
  try {
    const response = await fetch(`${apiUrl}${url}`, {
      ...options,
      headers: {
        ...options.headers,
        ...authService.setAuthHeader(userToken).headers,
      },
    });

    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    
    //   return response.json();
    const contentType = response.headers.get("Content-Type");
    if (contentType && contentType.includes("application/json")) {
        return response.json();
    } else {
      throw new Error("Response is not in JSON format");
    }
  } catch (error) {
    console.error("Error in httpClient:", error);
    throw error;
  }
};

export default httpClient;
