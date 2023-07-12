import React, { useState, useEffect } from "react";
import { BaseUrl } from "../../constants/constant";
import { Form, Button, Card } from "react-bootstrap"

export const ProfileView = ({ }) => {
    var loggedInUser = JSON.parse(localStorage.getItem('user'))
    const storedToken = localStorage.getItem("token");
    const [user, setUser] = useState(loggedInUser);
    const [userName, setUserName] = useState(user.userName);
    const [password, setPassword] = useState("12345678");
    const [email, setEmail] = useState(user.email);
    const [birth, SetDateOfBirth] = useState(user.birth);


    const profileSubmitHandler = (event) => {
        event.preventDefault();
        const reqBody = {
            userName: userName,
            password: password,
            email: email,
            birth: birth
        };

        fetch(BaseUrl + "/updateUser", {
            headers: { Authorization: `Bearer ${storedToken}` },
            method: "PUT",
            body: JSON.stringify(reqBody)
        }).then((response) => {
            if (response.status == 200) {
                alert("Updated successful");
                window.location.reload();
            } else {
                alert("Unable to register. Please check your credentials.");
                window.location.reload();
            }
        }).catch(e => {
            console.log("error: ", e)
        });

    }
    /*  useEffect(() => {
          fetch(BaseUrl + "/users").then((response) => response.json())
              .then((data) => {
                  if (data.userName == loggedInUser.userName) {
  
                      setUser(data)
                  }
              })
              .catch((error) => {
                  console.log("error", error);
              });
      },);
      console.log("data is", user)
      const profileSubmitHandler = () => {
  
      }*/
    return (
        <>
            <div style={{ color: "white" }}>
                <p >User: {userName} </p>
                <p>Email: {email}</p>
                <p>favoriteMovies: {user.favoriteMovies}</p>
            </div>
            <div style={{ display: "grid", justifyContent: "center" }}>
                <Card className="mt-3">
                    < Form className="p-3" onSubmit={profileSubmitHandler} >
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

