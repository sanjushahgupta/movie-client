import React, { useState } from "react"
import { Form, Button, Card } from "react-bootstrap"
import { ToastContainer, toast } from 'react-toastify';
import { PiFilmReelFill } from "react-icons/pi";
import { RiAccountCircleFill } from "react-icons/ri";
import { BiLogIn } from "react-icons/bi";
import 'react-toastify/dist/ReactToastify.css';

import { BaseUrl } from "../../constants/constant"
import "../../index.scss"

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
                    toast("Login unsuccessful. Please check your credentials.", {
                        position: "top-center",
                        hideProgressBar: true,
                        closeOnClick: true,
                        autoClose: 1000,
                    });
                }
            })
            .catch((e) => {
                toast("Oops! Something went wrong. Please try again later.", {
                    position: "top-center",
                    hideProgressBar: true,
                    closeOnClick: true,
                    autoClose: 1000,
                });
            })
    }

    return (
        <>
            <div className="d-grid justify-content-center">
                <Card className="mt-3 text-center login-card" >
                    <div className="toast-container"><ToastContainer /></div>
                    <Form className="p-5" onSubmit={loginSubmitHandler}>
                        <h2 style={{ color: "#530f0f" }}>Login to Movie<span className="text-black"><PiFilmReelFill /></span>Box</h2>
                        <Form.Group controlId="loginUsername">
                            <Form.Label className="visually-hidden">username</Form.Label>
                            <Form.Control className={"bg-light mt-5"}
                                type="text"
                                size="lg"
                                placeholder="Username"
                                value={userName}
                                onChange={(e) => setuserName(e.target.value)}
                                required
                                minLength="5" />
                        </Form.Group>

                        <Form.Group controlId="loginPassword">
                            <Form.Label className="visually-hidden">password</Form.Label>
                            <Form.Control className={"bg-light  mt-3"}
                                type="password"
                                size="lg"
                                value={password}
                                placeholder="Password"
                                onChange={(e) => setPassword(e.target.value)}
                                required
                                minLength="6" />
                        </Form.Group>
                        <Button className="mt-3" variant="success" size="lg" type="submit">Login<BiLogIn /></Button>
                    </Form>
                </Card>

                <h4 className="mt-5 text-white" >Don't have an account?</h4>
                <Button variant="secondary" href="/register">Register<RiAccountCircleFill /></Button>
            </div >
        </>
    )
}