import React, { useState, useEffect } from "react";
import { BaseUrl } from "../../constants/constant";
import { FavoriteMovies } from "../favouriteMovies/favouriteMovies"
import { Row } from "react-bootstrap"
import { UpdateProfile } from "../updateProfile/updateProfile"


export const ProfileView = ({ movies }) => {
    const [user, setUser] = useState(null);
    var loggedInUser = JSON.parse(localStorage.getItem('user'))

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
                <UpdateProfile Passeduser={user} />
                <FavoriteMovies
                    user={user}
                    movies={movies} />
            </Row>
        </>
    )

}
