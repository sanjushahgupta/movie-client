import React from "react"
import "../../css/styles.css"
import { useState } from "react"
import { BaseUrl } from "../../constants/constant"

export const SignInView = () => {
    const [userName, setUserName] = useState("");
    const [password, setPassword] = useState("");
    const [email, setEmail] = useState("");
    const [birth, SetDateOfBirth] = useState("");


    handleSubmit = (event) => {
        event.preventDefault();

        const reqBody = {
            userName: userName,
            password: password,
            email: email,
            birth: birth
        }

        fetch("https://flix-api-1faf.onrender.com/register", {
            method: "POST",
            body: JSON.stringify(reqBody),
            headers: {
                "Content-Type": "application/json"
            }
        }).then((response) => {

            alert("Signup successful", response.status);
            window.location.reload();

        }).catch(e => {
            console.log("error: ", e)
        });
    };


    return (
        <form onSubmit={handleSubmit}>
            <h3>Sign Up</h3>
            <label>
                Username:
                <input
                    type="text"
                    value={userName}
                    onChange={(e) => setUserName(e.target.value)}
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
                />
            </label>
            <label>
                Email:
                <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                />
            </label>
            <label>
                DateOfBirth:
                <input
                    type="date"
                    value={birth}
                    onChange={(e) => SetDateOfBirth(e.target.value)}
                    required
                />
            </label>
            <button type="submit">Submit</button>
        </form>

    )
}
