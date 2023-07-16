import React from "react"
import { useState } from "react"
import { BaseUrl } from "../../constants/constant"
import { Form, Button, Card } from "react-bootstrap"
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { PiFilmReelFill } from "react-icons/pi";
import Spinner from 'react-bootstrap/Spinner';
import "../../index.scss"

export const SignInView = () => {
    const [userName, setUserName] = useState("");
    const [password, setPassword] = useState("");
    const [email, setEmail] = useState("");
    const [birth, SetDateOfBirth] = useState("");

    registerSubmitHandler = (event) => {

        event.preventDefault();
        const reqBody = {
            userName: userName,
            password: password,
            email: email,
            birth: birth
        }

        fetch(BaseUrl + "/register", {
            method: "POST",
            body: JSON.stringify(reqBody),
            headers: {
                "Content-Type": "application/json"
            }
        }).then((response) => {
            if (response.status == 200) {
                window.location.href = "/login";
            } else {
                toast("Sorry, unable to register. Username and email must be unique.", {
                    position: "top-center",
                    hideProgressBar: true,
                    closeOnClick: true,
                    autoClose: 1500,
                });
            }
        }).catch(e => {
            toast("Sorry, unable to register. Try again", {
                position: "top-center",
                hideProgressBar: true,
                closeOnClick: true,
                autoClose: 1000,
            });
        });
    };

    return (
        <>
            <div style={{ display: "grid", justifyContent: "center" }}>
                <Card className="mt-3" style={{ background: "gray", width: "100%", textAlign: "center" }}>
                    <div className="toast-container"><ToastContainer /></div>
                    <Form className="p-5 " onSubmit={registerSubmitHandler}>
                        <h2 style={{ color: "#530f0f" }}>Welcome to Movie<span style={{ color: " black" }}><PiFilmReelFill /></span>Box</h2>
                        <h4>Create new account</h4>
                        <Form.Group controlId="signupUsername">
                            <Form.Control className={"bg-light mt-4"}
                                type="text"
                                value={userName}
                                placeholder="Username"
                                onChange={(e) => setUserName(e.target.value)}
                                required
                                minLength="5"
                                size="lg"
                            />

                        </Form.Group>
                        <Form.Group controlId="signupPassword">
                            <Form.Control className={"bg-light mt-2"}
                                type="password"
                                size="lg"
                                value={password}
                                placeholder="Password"
                                onChange={(e) => setPassword(e.target.value)}
                                required
                                minLength="6"
                            />

                        </Form.Group>
                        <Form.Group controlId="signupEmail mt-2">
                            <Form.Control className={"bg-light mt-2"}
                                type="email"
                                size="lg"
                                placeholder="Email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                required
                            />
                        </Form.Group>
                        <Form.Group controlId="birth">
                            <Form.Control className={"bg-light mt-2"}
                                type="date"
                                size="lg"
                                value={birth}
                                onChange={(e) => SetDateOfBirth(e.target.value)}
                                required
                            />
                        </Form.Group>
                        <Button className="mt-3" variant="success" type="submit">Register</Button>
                    </Form >
                </Card>
            </div >
        </>
    )

}
