import React from "react"
import { useState } from "react"
import { Form, Button, Card, Row, Image } from "react-bootstrap"
import logo from "../../css/logo.png"
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { PiFilmReelFill } from "react-icons/pi";
import { BiLogIn } from "react-icons/bi";

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
                if (data.user) {
                    localStorage.setItem("user", JSON.stringify(data.user));
                    localStorage.setItem("token", data.token)
                    onLoggedIn(data.user, data.token);
                    window.location.reload();
                } else {
                    toast("User not found. please check your credentials.", {
                        position: "top-center",
                        hideProgressBar: true,
                        closeOnClick: true,
                        autoClose: 1000,
                    });
                }
            })
            .catch((e) => {
                toast("Something went wrong", {
                    position: "top-center",
                    hideProgressBar: true,
                    closeOnClick: true,
                    autoClose: 1000,
                });
            })
    }

    return (
        <>

            <div style={{ display: "grid", justifyContent: "center" }}>

                <Card className="mt-3" style={{ width: "100%", background: "gray", textAlign: "center" }}>
                    <div className="toast-container"><ToastContainer /></div>
                    <Form className="p-5" onSubmit={loginSubmitHandler}>
                        <h2 style={{ color: "#530f0f" }}>Login to Movie<span style={{ color: " black" }}><PiFilmReelFill /></span>Box</h2>
                        <Form.Group controlId="loginUsername">
                            <Form.Control className={"bg-light mt-3"}
                                type="text"
                                size="lg"
                                placeholder="Username"
                                value={userName}
                                onChange={(e) => setuserName(e.target.value)}
                                required
                                minLength="5" />
                        </Form.Group>

                        <Form.Group controlId="loginPassword">
                            <Form.Control className={"bg-light  mt-3"}
                                type="password"
                                size="lg"
                                value={password}
                                placeholder="Password"
                                onChange={(e) => setPassword(e.target.value)}
                                required
                                minLength="6" />
                        </Form.Group>
                        <Button className="mt-2" variant="success" type="submit">Login<BiLogIn /></Button>
                    </Form>
                </Card>

                <h4 style={{ color: "white" }} className="mt-5" >Don't have an account?</h4>
                <Button variant="secondary" href="/register">Register</Button>
            </div >
        </>
    )
}