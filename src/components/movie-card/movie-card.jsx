
import PropTypes from 'prop-types';
import { Card, CardImg } from 'react-bootstrap';
import { Link } from "react-router-dom";

export const MovieCard = ({ movie }) => {
    return <>
        <Link className='text-decoration-none  text-black' to={`/movies/${encodeURIComponent(movie.id)}`}>
            <Card className='movieCard'>
                <CardImg src={movie.image} width={150} height={180} alt="ImgMovie"></CardImg>
                <Card.Body>
                    <Card.Title>{movie.title}</Card.Title>
                </Card.Body>
            </Card>
        </Link>
    </>
}

MovieCard.propTypes = {
    movie: PropTypes.shape({
        title: PropTypes.string,
    }).isRequired,

}
