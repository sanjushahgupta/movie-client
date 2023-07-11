
import PropTypes from 'prop-types';

export const MovieCard = ({ movie, onMovieClick }) => {

    return <div className="movieCard" onClick={() => {
        onMovieClick(movie);
    }}>
        <div>{movie.title}</div>
        <img src={movie.image} height="100"></img>

    </div >;

}

MovieCard.propTypes = {
    //(shape({...}) means that it’s an object)
    movie: PropTypes.shape({
        title: PropTypes.string,
    }).isRequired,
    onMovieClick: PropTypes.func.isRequired
}
