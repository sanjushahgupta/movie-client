import React, { useState, useEffect } from "react";
import { Col, Button, Row } from "react-bootstrap"
import { ToastContainer, toast } from 'react-toastify';
import { LuDelete } from "react-icons/lu";
import 'react-toastify/dist/ReactToastify.css';

import { MovieCard } from "../movie-card/movie-card";
import { BaseUrl, token } from "../../constants/constant";

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
        }).catch((error) => {
            toast("Oops! Something went wrong. Please try again later.", {
                position: "top-center",
                closeOnClick: true,
                autoClose: 1000,
            });
        });
    };


    return (
        <>
            {
                favMovies.length < 1 && (
                    <>
                        <h6 className="text-center text-muted">Your favorite movie list is empty.</h6>
                    </>)
            }
            {
                favMovies.length > 0 && (
                    <>
                        <div className="toast-container"><ToastContainer /></div>
                        <h3 className="text-center text-muted">Favourites Movies</h3>
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