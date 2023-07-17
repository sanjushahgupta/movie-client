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
    const [loading, setLoading] = useState(false);

    const registerSubmitHandler = (event) => {

        event.preventDefault();
        const reqBody = {
            userName: userName,
            password: password,
            email: email,
            birth: birth
        }
        setLoading(true);
        fetch(BaseUrl + "/register", {
            method: "POST",
            body: JSON.stringify(reqBody),
            headers: {
                "Content-Type": "application/json"
            }
        }).then((response) => {
            setLoading(false);
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
            setLoading(false);
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
            <div className="d-grid justify-content-center">
                <Card className="mt-3 text-center login-card" >
                    <div className="toast-container"><ToastContainer /></div>
                    <Form className="p-5 " onSubmit={registerSubmitHandler}>
                        <h2 style={{ color: "#530f0f" }}>Welcome to Movie<span className="text-black"><PiFilmReelFill /></span>Box</h2>
                        <h4>Create new account</h4>
                        <Form.Group controlId="signupUsername">
                            {loading && <Spinner className="text-center" animation="border" variant="light" />}
                            <Form.Label className="visually-hidden">username</Form.Label>
                            <Form.Control className={"bg-light mt-5"}
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
                            <Form.Label className="visually-hidden">password</Form.Label>
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
                            <Form.Label className="visually-hidden">email</Form.Label>
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
                            <Form.Label className="visually-hidden">birth</Form.Label>
                            <Form.Control className={"bg-light mt-2"}
                                type="date"
                                size="lg"
                                value={birth}
                                onChange={(e) => SetDateOfBirth(e.target.value)}
                                required
                            />
                        </Form.Group>
                        <Button className="mt-3" variant="success" type="submit" size="lg">Register</Button>
                    </Form >
                </Card>
            </div >
        </>
    )

}
