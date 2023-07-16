import React, { useState, useEffect } from "react";
import { Col, Button, Row } from "react-bootstrap"
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import { MovieCard } from "../movie-card/movie-card";
import { BaseUrl, token } from "../../constants/constant";
import { LuDelete } from "react-icons/lu";

export const FavoriteMovies = ({ user, movies }) => {
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
        }).then((response) => {
            if (response.status == 201) {
                window.location.reload();
            } else {
                toast("Unable to remove movie from favourite list. Try again", {
                    position: "top-center",
                    closeOnClick: true,
                    autoClose: 1000,
                });
            }
        })
            .catch((error) => {
                console.error("Error:", error);
            });
    };
    return (
        <>
            {
                favMovies.length < 1 && (
                    <>
                        <h3 style={{ textAlign: "center", color: "gray" }}>Favorite Movies list is empty</h3>
                    </>)
            }

            {

                favMovies.length > 0 && (
                    <>
                        <div className="toast-container"><ToastContainer /></div>
                        <h3 style={{ textAlign: "center", color: "white" }}>Favourites Movies</h3>
                        <Row className="justify-content-md-center">
                            {
                                favMovies.map((movie) => (
                                    <Col className="mb-5" key={movie.id} md="auto" style={{ position: 'relative' }}>
                                        <Button style={{
                                            position: 'absolute',
                                            zIndex: '1',
                                        }} onClick={(event) => removeFavHandler(movie.title, event)} variant="danger" size="xs"><LuDelete></LuDelete></Button>
                                        <MovieCard movie={movie} />

                                    </Col>
                                ))}
                        </Row>
                    </>)

            }

        </>
    )
}