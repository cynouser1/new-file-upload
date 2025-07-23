// const API_BASE_URL = "http://localhost:4001"; // change if needed
// const API_BASE_URL = process.env.API_BASE_URL; // change if needed
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL; // change if needed

const getToken = localStorage.getItem("token");

const headers = (authToken) => ({
  "Content-Type": "application/json",
  Authorization: `Bearer ${authToken ? authToken : getToken}`,
  // Authorization: getToken,
});



// Create form to store the form json data of user
export const submitForm = async (formDataToSend) => {
  try {
    console.log("Incoming form data in submitForm", formDataToSend);
    const res = await fetch(`${API_BASE_URL}/api/submit`, {
      method: "POST",
      // headers: headers(authToken),
      // body: JSON.stringify(formData),
      body: formDataToSend,
    });


    return await res.json();
  } catch (err) {
    console.error("Create Form Error:", err);
    return { success: false, message: "Form creation failed" };
  }
};
