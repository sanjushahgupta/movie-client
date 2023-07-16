import { useState, useEffect } from "react";
import { FaSearch } from "react-icons/fa";
import { BaseUrl, token } from "../../constants/constant";
import { Col, Row } from "react-bootstrap"


export const SearchBar = ({ setMovies }) => {
    const [searchInput, setSearchInput] = useState("");

    const handleChange = (value) => {
        setSearchInput(value);
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
            <div
                className="input-wrapper"
                style={{ marginLeft: "8px", borderRadius: "10px" }}
            >
                <input
                    placeholder="search by title"
                    value={searchInput}
                    onChange={(e) => handleChange(e.target.value)}
                />
                <FaSearch id="search-icon" style={{ color: "white" }} />
            </div>
        </>
    );

}
