
import React from "react";
import { useState, useEffect } from "react";

import { MovieCard } from "../movie-card/movie-card";
import { MovieView } from "../movie-view/movie-view";
import { LoginView } from "../login/login";
import { SignInView } from "../signIn/signIn";
import { BaseUrl } from "../../constants/constant";


export const MainView = () => {

    const [selectedMovie, setSelectedMovie] = useState(null);
    const storedUser = JSON.parse(localStorage.getItem("user"));
    const storedToken = localStorage.getItem("token");
    const [user, setUser] = useState(storedUser ? storedUser : null);
    const [token, setToken] = useState(storedToken ? storedToken : null);
    const [movies, setMovies] = useState([]);


    //if user  value is null -> Login Page
    if (!user) {

        return (
            < div style={{ textAlign: "Center" }}>
                <LoginView onLoggedIn={(user, token) => { setUser(user); setToken(token) }} />
                <div style={{ border: "solid 2px" }}></div>
                < SignInView />
            </div>)
    }

    useEffect(() => {
        if (!token)
            return;

        // https://movie-api-flix-556e5c313136.herokuapp.com/movies



        fetch(BaseUrl + "/movies", {
            headers: { Authorization: `Bearer ${token}` }
        }).then((response => {
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

    }, [token]);

    if (selectedMovie) {
        return <MovieView selectedMovie={selectedMovie}
            onBackButtonClick={() => setSelectedMovie(null)} />
    }

    return (
        <div>
            <button onClick={() => { setUser(null); setToken(null); localStorage.clear(); }}>Logout</button>
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



