import React, { useState, useEffect } from "react";
import { Row } from "react-bootstrap"

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
        return <div>Loading user data</div>;
    }

    return (
        <>
            <Row className="justify-content-md-center">
                <UpdateProfile loggedUser={user} />
                <FavoriteMovies
                    user={user}
                    movies={movies} />
            </Row>
        </>
    )

}
