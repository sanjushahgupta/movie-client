import React from "react"
import { useState } from "react"
import "../../../css/styles.css"

export const LoginView = ({ onLoggedIn }) => {
    console.log("inside login")
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");

    const submitHandler = (event) => {
        event.preventDefault();
        console.log("inside handle submit")

        const data = {
            username: username,
            password: password
        };


        fetch("https://flix-api-1faf.onrender.com/login", {
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
                Username:
                <input
                    type="text"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
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