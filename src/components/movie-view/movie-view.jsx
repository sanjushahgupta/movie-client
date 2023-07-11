import PropTypes from 'prop-types';

export const MovieView = ({ selectedMovie, onBackButtonClick }) => {
    return (<div>
        <div><img src={selectedMovie.image} /></div>
        <div>
            <div>Title: {selectedMovie.title}</div>
            <div>Description: {selectedMovie.description}</div>
            <div>Genre: {selectedMovie.genre}</div>
            <div>Director: {selectedMovie.director}</div>
            <button onClick={onBackButtonClick}>Back</button>
        </div>
    </div>
    )
}

MovieView.propTypes = {
    selectedMovie: PropTypes.shape({
        title: PropTypes.string,
        description: PropTypes.string,
        image: PropTypes.string
    }).isRequired,
    onBackButtonClick: PropTypes.func.isRequired
}