import { BaseUrl } from "../../constants/constant";

export const DeleteAccount = (event) => {
    event.preventDefault();
    const token = localStorage.getItem("token");
    fetch(BaseUrl + "/deleteUser", {
        headers: {
            "Authorization": `Bearer ${token}`,
            "Content-Type": "application/json"
        },
        method: "DELETE",
    }).then((response) => {
        if (response.ok) {
            localStorage.clear();
            window.location.href = "/register";
        } else {
            alert("Unable to delete account. Try again");
        }
    }).catch(e => {
        console.log("error: ", e)
    });
}