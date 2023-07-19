import { BaseUrl } from "../../constants/constant";

export const DeleteAccount = (event) => {
    event.preventDefault();
    const toDelete = window.confirm(
        "Are you sure you want to delete your account permanently?"
    )

    if (toDelete) {
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
                alert("Unable to delete account.");
            }
        }).catch(e => {
            alert("Oops! Something went wrong. Please try again later.");
        });
    }

}