import React, { useState, useEffect } from "react";
import { Col } from "react-bootstrap"
import Spinner from 'react-bootstrap/Spinner';

import { BaseUrl, loggedInUser } from "../../constants/constant";
import { FavoriteMovies } from "../favourite-movies/favouriteMovies"
import { UpdateProfile } from "../update-profile/updateProfile"

export const ProfileView = ({ movies }) => {
    const [user, setUser] = useState(null);

    useEffect(() => {
        fetch(BaseUrl + "/users", {
            headers: {
                "Content-Type": "application/json"
            },
        }).then((response) => response.json())
            .then((users) => {
                const matchedUser = users.find((user) => user.userName === loggedInUser.userName);
                setUser(matchedUser);
            })
            .catch((error) => {
                console.log("error", error);
            });
    }, []);


    if (!user) {
        return <Spinner animation="border" variant="light" />
    }
    return (
        <>
            <Col className="justify-content-md-center">
                <FavoriteMovies
                    user={user}
                    movies={movies} />
                <UpdateProfile loggedUser={user} />
            </Col>
        </>
    )

}
