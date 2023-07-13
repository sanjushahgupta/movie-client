import React, { useState, useEffect } from "react";
import { BaseUrl } from "../../constants/constant";
import { FavoriteMovies } from "../favouriteMovies/favouriteMovies"

import React, { useState, useEffect } from "react";
import { BaseUrl } from "../../constants/constant";

export const ProfileView = ({ movies }) => {
    const [user, setUser] = useState(null);
    var loggedInUser = JSON.parse(localStorage.getItem('user'))
    var loggedInUsername = loggedInUser.userName;
    useEffect(() => {
        fetch(BaseUrl + "/users", {
            headers: {
                "Content-Type": "application/json"
            },
        }).then((response) => response.json())
            .then((users) => {
                const matchedUser = users.find((user) => user.userName === loggedInUsername);
                setUser(matchedUser);
            })
            .catch((error) => {
                console.log("error", error);
            });
    }, [loggedInUsername]);

    if (!user) {
        return <div>Loading user data</div>;
    }

    return (
        <>
            <div style={{ color: "white" }}>
                <div>Username: {user.userName}</div>
                <div>Email: {user.Email}</div>
                <FavoriteMovies
                    user={user}
                    movies={movies}
                />
            </div>
        </>
    )

}
/*export const ProfileView = () => {
    var loggedInUser = JSON.parse(localStorage.getItem('user'))
    const storedToken = localStorage.getItem("token");
    const [token, setToken] = useState(storedToken ? storedToken : null);
    const [user, setUser] = useState(loggedInUser);
    const [userName, setUserName] = useState(user.userName);
    const [password, setPassword] = useState(null);
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
            headers: {
                "Authorization": `Bearer ${token}`,
                "Content-Type": "application/json"
            },
            method: "PUT",
            body: JSON.stringify(reqBody)
        }).then((response) => {
            if (response.status == 200) {
                alert("Updated successful");

            } else {
                console.log(response)
                alert("Unable to update profile. Please check your credentails and username and email must be unique.");
            }
        }).catch(e => {
            console.log("error: ", e)
        });

    }

    return (
        <>
            <FavoriteMovies />
            <div style={{ color: "white" }}>
                <p >User: {userName} </p>
                <p>Email: {email}</p>
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
}*/