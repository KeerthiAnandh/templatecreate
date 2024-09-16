export const fetchData = async (url: string) => {
  try {
    const response = await fetch(url);
    if (!response.ok) {
      // If the response status is not in the 200-299 range, throw an error
      throw new Error(`HTTP error! Status: ${response.status}`);
    }
    const data = await response.json();
    return data;
  } catch (error: any) {
    console.error("API GET Error:", error);
    throw new Error(error.message || "Something went wrong with GET request");
  }
};

export const postData = async (url: string, data: any) => {
  try {
    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });

    if (!response.ok) {
      // If the response status is not in the 200-299 range, throw an error
      const errorData = await response.json(); // Extracting error message from the response
      throw new Error(errorData.message || `HTTP error! Status: ${response.status}`);
    }

    const responseData = await response.json();
    return responseData;
  } catch (error: any) {
    console.error("API POST Error:", error);
    throw new Error(error.message || "Something went wrong with POST request");
  }
};
