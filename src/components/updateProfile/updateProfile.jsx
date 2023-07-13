
import React, { useState } from "react";
import { Form, Card, Form, Button } from "react-bootstrap";
import { BaseUrl } from "../../constants/constant";
export const UpdateProfile = ({ Passeduser }) => {
    var loggedInUser = JSON.parse(localStorage.getItem('user'))
    const token = localStorage.getItem("token");
    const [user, setUser] = useState(Passeduser)

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
                    window.location.reload();
                    alert("Account updated");
                } else {
                    alert("Unable to updae account");
                }

            })
            .catch((e) => {
                alert("Something went wrong");
            })
    }


    return (
        <>
            <div style={{ display: "block", marginBottom: "30px", width: "60%", color: "black" }}>
                <Card className="mt-3">
                    < Form className="p-3" onSubmit={updateSubmitHandler} >
                        <h3>Update Profile</h3>
                        <Form.Group controlId="profileUsername">
                            <Form.Label className="text-lg mt-3">
                                Username: </Form.Label>
                            <Form.Control className={"bg-light"}
                                type="text"
                                value={userName}
                                onChange={(e) => setUserName(e.target.value)}
                                required
                                minLength="5"
                                size="lg"
                            />

                        </Form.Group>
                        <Form.Group controlId="profilePassword">
                            <Form.Label className="text-lg mt-3">Password:</Form.Label>
                            <Form.Control className={"bg-light"}
                                type="password"
                                size="lg"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                required
                                minLength="6"
                            />

                        </Form.Group>
                        <Form.Group controlId="profileEmail">
                            <Form.Label className="text-lg mt-3">Email:</Form.Label>
                            <Form.Control className={"bg-light"}
                                type="email"
                                size="lg"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                required
                            />
                        </Form.Group>
                        <Form.Group controlId="profileBirth">
                            <Form.Label className="text-lg mt-3"> DateOfBirth:</Form.Label>
                            <Form.Control className={"bg-light"}
                                type="date"
                                size="lg"
                                value={birth}
                                onChange={(e) => SetDateOfBirth(e.target.value)}
                                required
                            />
                        </Form.Group>
                        <Button className="mt-3" type="submit">Update</Button>
                    </Form >
                </Card>
            </div>
        </>
    )
}
