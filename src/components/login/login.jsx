import React from "react"
import { useState } from "react"
import "../../css/styles.css"
import { BaseUrl } from "../../constants/constant"

export const LoginView = ({ onLoggedIn }) => {
    console.log("inside login")
    const [userName, setuserName] = useState("");
    const [password, setPassword] = useState("");

    const submitHandler = (event) => {
        event.preventDefault();
        console.log("inside handle submit")

        const data = {
            userName: userName,
            password: password
        };


        fetch(BaseUrl + "/login", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(data)
        })
            .then((response) => response.json())
            .then((data) => {
                console.log("Login response: ", data);
                if (data.user) {
                    localStorage.setItem("user", JSON.stringify(data.user));
                    localStorage.setItem("token", data.token)
                    onLoggedIn(data.user, data.token);
                } else {
                    alert("User not found");
                }
            })
            .catch((e) => {
                alert("Something went wrong");
            })
    }
    return (
        <form style={{ margin: "20px" }} onSubmit={submitHandler}>
            <h3>LOGIN</h3>
            <label>
                userName:
                <input
                    type="text"
                    value={userName}
                    onChange={(e) => setuserName(e.target.value)}
                    required
                />
            </label>
            <label>
                Password:
                <input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                />
            </label>
            <button type="submit">Submit</button>
        </form>)

}