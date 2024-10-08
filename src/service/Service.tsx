const API_URL = "http://e-commerce-gen.com/v1/e-commerces";


export const createStrapiCollection = async (formData: any) => {
  try {
    const response = await fetch(API_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ data: formData }),
    });

    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    const result = await response.json();
    console.log("Created new eCommerce data:", result);
    return result;
  } catch (error) {
    console.error("Error creating eCommerce data:", error);
    throw error; 
  }
};

// export const getkeerthna = async (formData: any) => {
//   try {
//     const response = await fetch(API_URL, {
//       method: "POST",
//       headers: {
//         "Content-Type": "application/json",
//       },
//       body: JSON.stringify({ data: formData }),
//     });

//     if (!response.ok) {
//       throw new Error(`HTTP error! Status: ${response.status}`);
//     }

//     const result = await response.json();
//     console.log("Created new eCommerce data:", result);
//     return result;
//   } catch (error) {
//     console.error("Error creating eCommerce data:", error);
//     throw error; 
//   }
// };


