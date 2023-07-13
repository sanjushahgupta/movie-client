
import React, { useState, useEffect } from "react";

import { MovieCard } from "../movie-card/movie-card";
import { MovieView } from "../movie-view/movie-view";
import { LoginView } from "../login/login";
import { SignInView } from "../signIn/signIn";
import { BaseUrl } from "../../constants/constant";
import { Row, Col, Container, Navbar, Button, Image } from "react-bootstrap"
import "../../index.scss"
import cover from "../../css/cover.png"



export const MainView = () => {
    const storedUser = JSON.parse(localStorage.getItem("user"));
    const storedToken = localStorage.getItem("token");
    const [selectedMovie, setSelectedMovie] = useState(null);
    const [user, setUser] = useState(storedUser ? storedUser : null);
    const [token, setToken] = useState(storedToken ? storedToken : null);
    const [movies, setMovies] = useState([]);



    const LoginSignInView = ({ onLoggedIn }) => {
        return (
            <>
                <div className="wrapper">
                    <Image src={cover} className="mt-3" height="80" />
                    <Row className="justify-content-center" >
                        <Col> <SignInView /></Col>
                        <Col><LoginView onLoggedIn={onLoggedIn} /></Col>
                    </Row>
                </div>
            </>
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
            <> <Navbar fluid className="color-nav mb-4" expand="lg">
                <Container fluid className='justify-content-start'>
                    <Button variant="warning" size="sm" onClick={() => setSelectedMovie(null)}>Back</Button>
                    <Navbar.Text className="text-nav">Movie</Navbar.Text>
                </Container>
            </Navbar>
                <Row className="justify-content-md-center">
                    <Col md={8}>
                        <MovieView
                            selectedMovie={selectedMovie}
                        />
                    </Col>
                </Row>
            </>
        );
    }

    return (
        <>
            <Navbar className="color-nav mb-4" expand="lg">
                <Container fluid>
                    <Navbar.Text className="text-nav">Movie</Navbar.Text>
                    <Button variant="danger" size="sm" onClick={handleLogout}>Logout</Button>
                </Container>
            </Navbar>
            <Row className="justify-content-md-center">
                {movies.map((movie) => (

                    <Col className="mb-5" key={movie.id} md="auto">
                        <MovieCard
                            movie={movie}
                            onMovieClick={(newSelectedMovie) => {
                                setSelectedMovie(newSelectedMovie);
                            }}
                        />
                    </Col>
                ))}
            </Row>
        </>
    );

};
