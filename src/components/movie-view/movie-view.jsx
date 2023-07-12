import PropTypes from 'prop-types';
import { Card, Button } from 'react-bootstrap';
import { useParams } from 'react-router';


export const MovieView = ({ movies }) => {
    const { movieId } = useParams();
    const movie = movies.find((b) => b.id === movieId);
    return (
        <>
            <Card style={{ maxWidth: "50rem" }}>
                <Card.Img className="img-fluid" src={movie.image} alt="movieImg" />
            </Card>
            <Button>AddToFab</Button>
            <div className='movieDescriptionHeader'><span>Title: </span>{movie.title}</div>
            <div className='movieDescriptionHeader'><span>Director: </span >{movie.director}</div >
            <div className='movieDescriptionHeader'>{movie.directorBio}</div>
            <div className='movieDescriptionHeader'><span>Description: </span > {movie.genreDescription}</div >
            <div className='movieDescriptionHeader'>{movie.description}</div>
        </>
    )
}
