import PropTypes from 'prop-types';
import { Card, Button } from 'react-bootstrap';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
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
                toast("Movie added to favourite list.", {
                    position: "top-center",
                    closeOnClick: true,
                    hideProgressBar: true,
                    autoClose: 1000,
                });
            } else {
                toast("Unable to add movie to favourite list. Try again", {
                    position: "top-center",
                    closeOnClick: true,
                    hideProgressBar: true,
                    autoClose: 1000,
                });
            }
        }).catch((error) => {
            console.error("Error:", error);
        });
    };

    return (
        <>
            <Card style={{ maxWidth: "50rem" }}>
                <div className="toast-container"><ToastContainer /></div>
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
