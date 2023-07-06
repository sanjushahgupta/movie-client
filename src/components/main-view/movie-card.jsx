
import React, { useState } from "react";
import PropTypes from 'prop-types';

export const MovieCard = ({ movie, onMovieClick }) => {

    return <div onClick={() => {
        onMovieClick(movie);
    }}>{movie.title}</div>;

}

MovieCard.propTypes = {
    //(shape({...}) means that it’s an object)
    movie: PropTypes.shape({
        title: PropTypes.string,
    }).isRequired,
    onMovieClick: PropTypes.func.isRequired
}
