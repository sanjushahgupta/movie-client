import React from "react"
import { useState } from "react"
import { Form, Button, Card, Image, Nav } from "react-bootstrap"
import { BaseUrl } from "../../constants/constant"

export const LoginView = ({ onLoggedIn }) => {
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
        <>

            <div style={{ display: "grid", justifyContent: "center" }}>
                <Card className="mt-3">
                    <Form className="p-5" onSubmit={loginSubmitHandler}>
                        <h3>Login</h3>
                        <Form.Group controlId="loginUsername">
                            <Form.Label className="text-lg mt-3">Username:</Form.Label>
                            <Form.Control className={"bg-light"}
                                type="text"
                                size="lg"
                                value={userName}
                                onChange={(e) => setuserName(e.target.value)}
                                required
                                minLength="5" />
                        </Form.Group>

                        <Form.Group controlId="loginPassword">
                            <Form.Label className="text-lg mt-3">Password:</Form.Label>
                            <Form.Control className={"bg-light"}
                                type="password"
                                size="xs"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                required
                                minLength="6" />
                        </Form.Group>
                        <Button className="mt-2" variant="success" type="submit">Submit</Button>
                    </Form>
                </Card>

                <h4 style={{ color: "white" }} className="mt-3" >Don't have an account?</h4>
                <Button variant="secondary" size="sm" href="/register">Register</Button>
            </div>
        </>)

}