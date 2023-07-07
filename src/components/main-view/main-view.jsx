
import React from "react";
import { useState, useEffect } from "react";

import { MovieCard } from "./movie-card";
import { MovieView } from "./movie-view";
import { LoginView } from "./login/login";
import { SignInView } from "./signIn/signIn";


export const MainView = () => {

    const [selectedMovie, setSelectedMovie] = useState(null);
    // const storedUser = JSON.parse(localStorage.getItem("user"));
    //const storedToken = localStorage.getItem("token");
    // const [user, setUser] = useState(storedUser ? storedUser : null);
    // const [token, setToken] = useState(storedToken ? storedToken : null);
    const [movies, setMovies] = useState([]);

    //if user  value is null -> Login Page
    /*if (!user) {

        return (
            < div style={{ textAlign: "Center" }}>
                <LoginView onLoggedIn={(user, token) => { setUser(user); setToken(token) }} />
                or
                < SignInView />
            </div>)
    }*/

    useEffect(() => {
        /*if (!token)
            return;*/

        //https://movie-api-flix-556e5c313136.herokuapp.com/movies



        fetch("https://flix-api-1faf.onrender.com/movies").then((response => {
            //to parse json data into object nested then is used
                response.json().then((data => {
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

        </div >
    )

}



