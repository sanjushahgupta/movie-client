
import React, { useState } from "react";
import { Form, Card, Form, Button } from "react-bootstrap";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import { BaseUrl } from "../../constants/constant";
import { DeleteAccount } from "../delete-user/deleteUser";

export const UpdateProfile = ({ loggedUser }) => {
    const token = localStorage.getItem("token");
    const [user, setUser] = useState(loggedUser)

    const [userName, setUserName] = useState(user.userName || "");
    const [password, setPassword] = useState(user.password || "");
    const [email, setEmail] = useState(user.Email || "");
    const [birth, SetDateOfBirth] = useState(user.Birth || "");


    const updateSubmitHandler = (event) => {
        event.preventDefault();

        const reqBody = {
            userName: userName,
            password: password,
            email: email,
            birth: birth
        };

        fetch(BaseUrl + "/updateUser", {
            headers: {
                "Authorization": `Bearer ${token}`,
                "Content-Type": "application/json"
            },
            method: "PUT",
            body: JSON.stringify(reqBody)
        }).then((response) => response.json())
            .then((data) => {
                if (data) {
                    localStorage.setItem("user", JSON.stringify(data));
                    toast("Account updated", {
                        position: "top-center",
                        hideProgressBar: false,
                        closeOnClick: true,
                        autoClose: 1000,
                    });

                } else {
                    toast("Unable to update account. Please check your credentials.", {
                        position: "top-center",
                        closeOnClick: true,
                        autoClose: 1000,
                    });
                }
            })
            .catch((e) => {
                toast("Unable to update account. Try again", {
                    position: "top-center",
                    closeOnClick: true,
                    autoClose: 1000,
                });
            })

    }


    return (
        <>
            <div className="d-grid justify-content-start text-black">
                <Card className="mt-3">
                    <div className="toast-container"><ToastContainer /></div>
                    < Form className="p-5" onSubmit={updateSubmitHandler} >
                        <h3>Update your account information</h3>
                        <Form.Group controlId="profileUsername">
                            <Form.Label className="text-lg mt-3">
                                Username</Form.Label>
                            <Form.Control className="bg-light"
                                type="text"
                                value={userName}
                                onChange={(e) => setUserName(e.target.value)}
                                required
                                minLength="5"
                                size="lg"
                            />
                        </Form.Group>

                        <Form.Group controlId="profilePassword">
                            <Form.Label className="text-lg mt-3">Password</Form.Label>
                            <Form.Control className="bg-light"
                                type="password"
                                size="lg"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                required
                                minLength="6"
                            />
                        </Form.Group>

                        <Form.Group controlId="profileBirth">
                            <Form.Label className="text-lg mt-3"> DateOfBirth</Form.Label>
                            <Form.Control className="bg-light"
                                type="date"
                                size="lg"
                                value={birth}
                                onChange={(e) => SetDateOfBirth(e.target.value)}
                                required
                            />
                        </Form.Group>

                        <Form.Group controlId="profileEmail">
                            <Form.Label className="text-lg mt-3">Email</Form.Label>
                            <Form.Control className="bg-light"
                                type="email"
                                size="lg"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                required
                            />
                        </Form.Group>

                        <Button className="mt-2" variant="warning" type="submit">Update Account</Button>
                        <div><Button className="mt-5" variant="danger" onClick={DeleteAccount}>Delete Account</Button></div>

                    </Form >
                </Card>
            </div >
        </>
    )
}
