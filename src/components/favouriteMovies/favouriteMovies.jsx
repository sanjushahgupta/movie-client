import React, { useState, useEffect } from "react";
import { Col, Button, Row } from "react-bootstrap"
import { MovieCard } from "../movie-card/movie-card";
import { BaseUrl } from "../../constants/constant";

export const FavoriteMovies = ({ user, movies }) => {
    const token = localStorage.getItem("token");
    const [favMovies, setFavMovies] = useState([])
    useEffect(() => {
        if (user && user.favoriteMovies) {
            const favoriteMovies = movies.filter(movie => user.favoriteMovies.includes(movie.id));
            console.log(favoriteMovies)
            setFavMovies(favoriteMovies);
        }
    }, [movies, user])
    if (!user) {
        return <div>Loading user data</div>;
    }

    const removeFavHandler = (movieTitle, event) => {
        event.preventDefault();
        fetch(BaseUrl + `/deletefab/${encodeURIComponent(movieTitle)}`, {
            method: "DELETE",
            headers: {
                "Authorization": `Bearer ${token}`,
                "Content-Type": "application/json"
            }
        })
            .then((response) => {
                if (response.status == 201) {
                    window.location.reload();
                } else {
                    alert("Unable to remove movie from favorite list");
                }
            })
            .catch((error) => {
                console.error("Error:", error);
            });
    };
    return (
        <>
            <h3 style={{ textAlign: "center" }}>Favourites Movies</h3>
            <Row className="justify-content-md-center">
                {
                    favMovies.map((movie) => (
                        <Col className="mb-5" key={movie.id} md="auto">
                            <MovieCard movie={movie} />
                            <Button onClick={(event) => removeFavHandler(movie.title, event)} variant="danger" size="xs">Remove</Button>
                        </Col>
                    ))}
            </Row>
        </>
    )
}