export const BaseUrl = process.env.BASE_URL;
//"https://flix-api-1faf.onrender.com";

export const loggedInUser = JSON.parse(localStorage.getItem("user"));
export const token = localStorage.getItem("token");
