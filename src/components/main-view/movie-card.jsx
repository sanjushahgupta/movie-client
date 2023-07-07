
import PropTypes from 'prop-types';

export const MovieCard = ({ movie, onMovieClick }) => {

    return <div style={{ backgroundColor: "black", color: "white", width: '220px', margin: "10px", textAlign: "center" }} onClick={() => {
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
