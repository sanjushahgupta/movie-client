import React from "react"
import "../../css/styles.css"
import { useState } from "react"
import { BaseUrl } from "../../constants/constant"
import { Form, Button } from "react-bootstrap"

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
                alert("Signup successful");
                window.location.reload();
            } else {
                alert("Unable to register. Please check your credentials.");
            }
        }).catch(e => {
            console.log("error: ", e)
        });
    };


    return (
        <Form className="m-5" onSubmit={registerSubmitHandler}>
            <h3>Sign In</h3>
            <Form.Group controlId="signupUsername">
                <Form.Label>
                    Username: </Form.Label>
                <Form.Control
                    type="text"
                    value={userName}
                    onChange={(e) => setUserName(e.target.value)}
                    required
                    minLength="5"
                />

            </Form.Group>
            <Form.Group controlId="signupPassword">
                <Form.Label>Password:</Form.Label>
                <Form.Control
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                    minLength="6"
                />

            </Form.Group>
            <Form.Group ControlId="signupEmail">
                <Form.Label>Email:</Form.Label>
                <Form.Control
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                />
            </Form.Group>
            <Form.Group ControlId="birth">
                <Form.Label> DateOfBirth:</Form.Label>
                <Form.Control
                    type="date"
                    value={birth}
                    onChange={(e) => SetDateOfBirth(e.target.value)}
                    required
                />
            </Form.Group>
            <Button variant="warning" className="mt-2" type="submit">Submit</Button>
        </Form >

    )

}
