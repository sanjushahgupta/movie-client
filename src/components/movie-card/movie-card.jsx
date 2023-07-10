
import PropTypes from 'prop-types';
import { Container, Navbar } from 'react-bootstrap';
import "../../css/styles.css"

export const MovieCard = ({ movie, onMovieClick }) => {

    return <>
        <Navbar className="color-nav" expand="lg">
            <Container>
                <Navbar.Text className="text-nav">Movie</Navbar.Text>
            </Container>
        </Navbar>

        <div className="movieCard" onClick={() => {
            onMovieClick(movie);
        }}>
            <div>{movie.title}</div>
            <img src={movie.image} height="100"></img>
        </div>;

    </>
}

MovieCard.propTypes = {
    //(shape({...}) means that it’s an object)
    movie: PropTypes.shape({
        title: PropTypes.string,
    }).isRequired,
    onMovieClick: PropTypes.func.isRequired
}
