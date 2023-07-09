
import React, { useState, useEffect } from "react";

import { MovieCard } from "../movie-card/movie-card";
import { MovieView } from "../movie-view/movie-view";
import { LoginView } from "../login/login";
import { SignInView } from "../signIn/signIn";
import { BaseUrl } from "../../constants/constant";

export const MainView = () => {
    const storedUser = JSON.parse(localStorage.getItem("user"));
    const storedToken = localStorage.getItem("token");
    const [selectedMovie, setSelectedMovie] = useState(null);
    const [user, setUser] = useState(storedUser ? storedUser : null);
    const [token, setToken] = useState(storedToken ? storedToken : null);
    const [movies, setMovies] = useState([]);

    const LoginSignInView = ({ onLoggedIn }) => {
        return (
            <div style={{ textAlign: "Center" }}>
                <LoginView onLoggedIn={onLoggedIn} />
                <div style={{ border: "solid 2px" }}></div>
                <SignInView />
            </div>
        );
    };

    const handleLogout = () => {
        setUser(null);
        setToken(null);
        localStorage.clear();
        window.location.reload();
    };


    useEffect(() => {
        if (!token) return;

        fetch(BaseUrl + "/movies", {
            headers: { Authorization: `Bearer ${token}` },
        }).then((response) => response.json())
            .then((data) => {
                const movieFromApi = data.map((movie) => ({
                    id: movie._id,
                    title: movie.Title,
                    image: movie.Image,
                    description: movie.Description,
                    director: movie.Director.Name,
                    genre: movie.Genre.Name,
                }));
                setMovies(movieFromApi);
            })
            .catch((error) => {
                console.log("error", error);
            });
    }, [token]);


    if (!user) {
        return (
            <LoginSignInView
                onLoggedIn={(user, token) => {
                    setUser(user);
                    setToken(token);
                }}
            />
        );
    }


    if (selectedMovie) {
        return (
            <MovieView
                selectedMovie={selectedMovie}
                onBackButtonClick={() => setSelectedMovie(null)}
            />
        );
    }

    return (
        <div>
            {movies.map((movie) => (
                <MovieCard
                    key={movie.id}
                    movie={movie}
                    onMovieClick={(newSelectedMovie) => {
                        setSelectedMovie(newSelectedMovie);
                    }}
                />
            ))}
            <button onClick={handleLogout}>Logout</button>
        </div>
    );

};
