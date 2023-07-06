
import React from "react";
import { useState, useEffect } from "react";

import { MovieCard } from "./movie-card";
import { MovieView } from "./movie-view";


export const MainView = () => {
    const [movies, setMovies] = useState([]);

    const [selectedMovie, setSelectedMovie] = useState(null);

    useEffect(() => {
        fetch("https://movie-api-flix-556e5c313136.herokuapp.com/movies").
            then((response => {
                response.json()
                    .then((data => {
                        const movieFromApi = data.map((movie) => {
                            return {
                                id: movie._id,
                                title: movie.Title,
                                image: movie.Image,
                                description: movie.Description,
                                director: movie.Director.Name,
                                genre: movie.Genre.Name
                            }
                        })
                        setMovies(movieFromApi)
                    }))
            })).catch(e => {
                console.log("error", e);
            })

    }, []);

    if (selectedMovie) {
        return <MovieView selectedMovie={selectedMovie}
            onBackButtonClick={() => setSelectedMovie(null)} />
    }
    return (
        <div>

            {
                movies.map((movie => (
                    <MovieCard
                        key={movie.id}
                        movie={movie}
                        onMovieClick={(newSelectedMovie) => {
                            setSelectedMovie(newSelectedMovie);
                        }}
                    />
                )))
            }

        </div>
    )
}



