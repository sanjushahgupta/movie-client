
import PropTypes from 'prop-types';
import { Card, CardImg } from 'react-bootstrap';
import "../../css/styles.css"

export const MovieCard = ({ movie, onMovieClick }) => {

    return <>
        <Card style={{ width: '15rem', height: '18rem' }} onClick={() => {
            onMovieClick(movie);
        }}>
            <CardImg src={movie.image} width={150} height={180}></CardImg>
            <Card.Body>
                <Card.Title>{movie.title}</Card.Title>
            </Card.Body>
        </Card>

    </>
}

MovieCard.propTypes = {
    //(shape({...}) means that it’s an object)
    movie: PropTypes.shape({
        title: PropTypes.string,
    }).isRequired,
    onMovieClick: PropTypes.func.isRequired
}
