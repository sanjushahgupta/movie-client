import React from "react"
import { useState } from "react"
import "../../css/styles.css"
import { BaseUrl } from "../../constants/constant"

export const LoginView = ({ onLoggedIn }) => {
    console.log("inside loginIn")

    const [userName, setuserName] = useState("");
    const [password, setPassword] = useState("");

    const loginSubmitHandler = (event) => {
        event.preventDefault();

        const reqBody = {
            userName: userName,
            password: password
        };


        fetch(BaseUrl + "/login", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(reqBody)
        }).then((response) => response.json())
            .then((data) => {
                console.log("Login response: ", data);

                if (data.user) {
                    localStorage.setItem("user", JSON.stringify(data.user));
                    localStorage.setItem("token", data.token)
                    onLoggedIn(data.user, data.token);
                    window.location.reload();
                } else {
                    alert("User not found");
                }

            })
            .catch((e) => {
                alert("Something went wrong");
            })
    }

    return (
        <form style={{ margin: "20px" }} onSubmit={loginSubmitHandler}>
            <h3>LOGIN</h3>
            <label>
                userName:
                <input
                    type="text"
                    value={userName}
                    onChange={(e) => setuserName(e.target.value)}
                    required
                    minLength="5"
                />
            </label>
            <label>
                Password:
                <input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                    minLength="6"
                />
            </label>
            <button type="submit">Submit</button>
        </form>)

}