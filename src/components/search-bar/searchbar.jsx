import { useState, useEffect } from "react";
import { BaseUrl, token } from "../../constants/constant";
import { Col, Form } from "react-bootstrap"
import "../../index.scss"


export const SearchBar = ({ setMovies }) => {
    const [searchInput, setSearchInput] = useState("");

    const handleChange = (value) => {
        setSearchInput(value.charAt(0).toUpperCase() + value.slice(1).toLowerCase());
    };

    useEffect(() => {
        fetch(BaseUrl + `/movies/${encodeURIComponent(searchInput)}`, {
            headers: { Authorization: `Bearer ${token}` },
        })
            .then((response) => response.json())
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
    }, [searchInput]);


    return (
        <>

            <Col sm={3} style={{ textAlign: "left" }}>
                <Form>
                    <Form.Control
                        type="search"
                        value={searchInput}
                        onChange={(e) => handleChange(e.target.value)}
                        placeholder="Search by movie title 🔍"
                        className="rounded-pill bg-gray mb-5 border-0  text-center focus-white"
                        aria-label="Search"
                    />
                </Form>
            </Col>

        </>
    );

}
