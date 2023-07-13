import React, { useState, useEffect } from "react";
import { Col } from "react-bootstrap"
import { MovieCard } from "../movie-card/movie-card";

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

    return (
        <>
            <div>
                <h5>Favourites Movies</h5>
                {
                    favMovies.map((movie) => (
                        <Col className="mt-2" key={movie.id}>
                            <MovieCard movie={movie} />
                        </Col>
                    ))}
            </div>
        </>
    )

}