
import React, { useState, useEffect } from "react";

import { MovieCard } from "../movie-card/movie-card";
import { MovieView } from "../movie-view/movie-view";
import { LoginView } from "../login/login";
import { SignInView } from "../signIn/signIn";
import { ProfileView } from "../profile/profile";
import { BaseUrl } from "../../constants/constant";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { Row, Col, Container, Navbar, Button, Image } from "react-bootstrap"
import "../../index.scss"
import { NavigationBar } from "../navigation-bar/navigation-bar";

export const MainView = () => {
    const storedUser = JSON.parse(localStorage.getItem("user"));
    const storedToken = localStorage.getItem("token");
    const [user, setUser] = useState(storedUser ? storedUser : null);
    const [token, setToken] = useState(storedToken ? storedToken : null);
    const [movies, setMovies] = useState([]);

    const handleLogout = () => {
        setUser(null);
        setToken(null);
        localStorage.clear();
        window.location.reload();
    };

    useEffect(() => {
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
                    directorBio: movie.Director.Bio,
                    genre: movie.Genre.Name,
                    genreDescription: movie.Genre.Description
                }));
                setMovies(movieFromApi);
            })
            .catch((error) => {
                console.log("error", error);
            });
    }, [token]);



    return (
        <>
            <NavigationBar
                user={user}
                onLoggedOut={handleLogout} />
            <BrowserRouter>
                <Row className="justify-content-md-center mt-3">
                    <Routes>
                        <Route
                            path="/register"
                            element={
                                <>
                                    {user ? (
                                        <Navigate to="/" />
                                    ) : (
                                        <Col>
                                            <SignInView />
                                        </Col>
                                    )}
                                </>
                            }
                        />
                        <Route
                            path="/login"
                            element={
                                <>
                                    {user ? (
                                        <Navigate to="/" />
                                    ) : (
                                        <Col>
                                            <LoginView onLoggedIn={(user) => setUser(user)} />
                                        </Col>
                                    )}
                                </>
                            }
                        />
                        <Route
                            path="/movies/:movieId"
                            element={
                                <>
                                    {!user ? (
                                        <Navigate to="/login" replace />
                                    ) : movies.length === 0 ? (
                                        <Col>The list is empty!</Col>
                                    ) : (
                                        <Col md={8}>
                                            <MovieView movies={movies} />
                                        </Col>
                                    )}
                                </>
                            }
                        />
                        <Route
                            path="/"
                            element={
                                <>
                                    {!user ? (
                                        <Navigate to="/login" replace />
                                    ) : movies.length === 0 ? (
                                        <Col>The list is empty.</Col>
                                    ) : (
                                        <>
                                            <Row className="justify-content-md-center">
                                                {movies.map((movie) => (
                                                    <Col className="mb-5" key={movie.id} md="auto">
                                                        <MovieCard
                                                            movie={movie} />
                                                    </Col>
                                                ))}
                                            </Row>
                                        </>
                                    )}
                                </>
                            }
                        />
                        <Route
                            path="/profile"
                            element={
                                <>
                                    <Col>
                                        <ProfileView movies={movies} />
                                    </Col>
                                </>
                            }
                        />
                    </Routes>
                </Row>
            </BrowserRouter >
        </>
    );




}