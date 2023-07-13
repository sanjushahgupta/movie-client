import PropTypes from 'prop-types';
import { Card, Button } from 'react-bootstrap';
import { useParams } from 'react-router';
import { BaseUrl, loggedInUser, token } from "../../constants/constant";

export const MovieView = ({ movies }) => {
    const { movieId } = useParams();
    const loggedInUsername = loggedInUser.userName;
    const movie = movies.find((b) => b.id === movieId);
    const movieTitle = movie.title

    const requestBody = {
        movieTitle: movieTitle,
        userName: loggedInUsername
    };

    const addFavHandler = (event) => {
        event.preventDefault();
        fetch(BaseUrl + `/addfab/${encodeURIComponent(movieTitle)}`, {
            method: "POST",
            headers: {
                "Authorization": `Bearer ${token}`,
                "Content-Type": "application/json"
            },
            body: JSON.stringify(requestBody)
        }).then((response) => {
            if (response.status == 201) {
                alert("Movie added successfully to favourite list.");
            } else {
                alert("Unable to add movie to favourite list.");
            }
        }).catch((error) => {
            console.error("Error:", error);
        });
    };

    return (
        <>
            <Card style={{ maxWidth: "50rem" }}>
                <Card.Img className="img-fluid" src={movie.image} alt="logoImg" />
            </Card>

            <Button className='m-2' variant='warning' onClick={addFavHandler}>Add To Favourite</Button>
            <div className='movieDescriptionHeader'><span>Title: </span>{movie.title}</div>
            <div className='movieDescriptionHeader'><span>Director: </span>{movie.director}</div>
            <div className='movieDescriptionHeader'>{movie.directorBio}</div>
            <div className='movieDescriptionHeader'><span>Description: </span>{movie.genreDescription}</div>
            <div className='movieDescriptionHeader'>{movie.description}</div>
        </>
    );
};

MovieView.propTypes = {
    movies: PropTypes.array.isRequired,
};
