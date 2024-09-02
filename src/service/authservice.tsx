import axios from "axios";

export const fetchData = async (url: string) => {
  try {
    const response = await axios.get(url);
    return response.data;
  } catch (error: any) {
    console.error("API GET Error:", error);
    throw new Error(error.message || "Something went wrong with GET request");
  }
};

export const postData = async (url: string, data: any) => {
    debugger
  try {
    const response = await axios.post(url, data);
    return response.data;
  } catch (error: any) {
    console.error("API POST Error:", error);
    throw new Error(error.message || "Something went wrong with POST request");
  }
};

